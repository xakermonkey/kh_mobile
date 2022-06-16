import { Appearance, useColorScheme, StyleSheet, Text, View, TouchableOpacity, Image, Switch, Alert, FlatList, ScrollView, RefreshControl } from 'react-native'
import React, { useLayoutEffect, useState, useRef, useMemo, useCallback } from 'react'
import { Icon } from 'react-native-elements'; import { StatusBar } from 'expo-status-bar';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain, domain_domain } from '../domain';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { CommonActions } from '@react-navigation/native';




const Orders = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeBtnSubText = colorScheme === 'light' ? styles.lightBtnSubText : styles.darkBtnSubText;
    const themeBtnSubText2 = colorScheme === 'light' ? styles.lightBtnSubText2 : styles.darkBtnSubText2;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;
    const themeButtonStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;
    const themeBtn = colorScheme === 'light' ? styles.lightBtn : styles.darkBtn;


    const [orders, setOrders] = useState();
    const [terminal, setTerminal] = useState("");
    const [selectOrder, setSelectOrder] = useState();
    const [totalPrice, settotalPrice] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['30%', '30%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                        <Image
                            source={colorScheme === 'light' ? require("../assets/images/kh_logo.png") : require("../assets/images/kh_logo_white.png")}
                            style={{
                                width: 100, height: 40
                            }}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )
            }
        });
        (async () => {
            const airport = await AsyncStorage.getItem("airport");
            const title = await AsyncStorage.getItem("terminal");
            setTerminal(title);
            navigation.setOptions({
                headerTitle: () => {
                    return (<View style={{ alignItems: 'center' }} >
                        <Text style={[styles.title, themeTextStyle]} >{title}</Text>
                        <Text style={[styles.subtext, themeSubTextStyle]} >{airport}</Text>
                    </View>)
                }
            })
            const id = await AsyncStorage.getItem("terminal_id")
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(domain + `/get_orders/${id}`, { headers: { "Authorization": "Token " + token } });
            setOrders(res.data);
        })();
    }, [navigation])

    const dateAlert = async () => {
        // const full_doc = await AsyncStorage.getItem("full_document");
        // const last_name = await AsyncStorage.getItem("last_name");
        // const first_name = await AsyncStorage.getItem("first_name");
        // const patronymic = await AsyncStorage.getItem("patronymic");
        // const birthday = await AsyncStorage.getItem("birthday");
        // const how_get = await AsyncStorage.getItem("how_get");
        // const date_get = await AsyncStorage.getItem("date_get");
        // const type_doc = await AsyncStorage.getItem("type_doc");
        // const photo = await AsyncStorage.getItem("avatar");
        // let text = "При сдаче багажа необходимо подтверждение личности. Вы можете ускорить процесс оформления, заполнив данные самостоятельно:\n";
        // text += last_name == null ? "Фамилия\n" : ""
        // text += first_name == null ? "Имя\n" : ""
        // text += patronymic == null ? "Отчество\n" : ""
        // text += birthday == null ? "Дата рождения\n" : ""
        // text += how_get == null ? "Кем выдан\n" : ""
        // text += date_get == null ? "Дата выдачи\n" : ""
        // text += type_doc == null ? "Тип документа\n" : ""
        // text += photo == null ? "Фотография" : ""
        // // console.warn(text);
        // if (full_doc == null) {
        //     Alert.alert(
        //         "Заполнить данные о себе",
        //         text,
        //         [
        //             {
        //                 text: "Заполнить",
        //                 onPress: () => {
        //                     navigation.navigate('last_name');
        //                 },
        //                 style: "cancel"
        //             },
        //             { text: "Пропустить", onPress: () => navigation.navigate('license_luggage') }
        //         ]
        //     );
        //     return 0;
        // } else {
        navigation.navigate('license_luggage');
        // return 0;
        // }

    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const id = await AsyncStorage.getItem("terminal_id")
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(domain + `/get_orders/${id}`, { headers: { "Authorization": "Token " + token } });
        setOrders(res.data);
        setRefreshing(false);
    }, []);

    const takeItems = async () => {
        await AsyncStorage.setItem("take_luggage", selectOrder.id.toString());
        if (totalPrice > 0) {
            navigation.navigate('accept_luggage_mileonair', { "total_price": totalPrice, len_day: selectOrder.len_day });
        } else {
            const token = await AsyncStorage.getItem("token");
            await axios.post(domain + "/take_luggage/" + selectOrder.id,
                {
                    price_for_storage: 0,
                    day_len: 0,
                    sale_day_storage: 0
                },
                {
                    headers: {
                        "Authorization": "Token " + token
                    }
                })
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "qr_code_take" }]
                }));
        }

    }


    const renderCard = ({ item }) => {

        const clickCheckBox = () => {
            if (selectOrder == item) {
                setSelectOrder(null);
                settotalPrice(0);
            } else {
                setSelectOrder(item)
                settotalPrice(item.len_day * item.price_per_day);
            }
        }


        return (
            <View style={[styles.container_location, themeContainerSelectStyle]}>
                <ScrollView contentContainerStyle={styles.row_center} horizontal={true}>
                    {item.photo.map((obj, ind) => {
                        return (<Image key={ind} height={60} width={60} resizeMode="contain" source={{ uri: domain_domain + obj.photo }} style={styles.img} />)
                    })}
                </ScrollView>
                <View style={{ marginTop: '4%' }}>
                    <View style={styles.row_center_between}>
                        <Text style={[styles.description, themeSubTextStyle]} >Багаж</Text>
                        <Text style={[styles.text_description, themeTextStyle]} >{item.kind_luggage}</Text>
                    </View>
                    <View style={styles.row_center_between}>
                        <Text style={[styles.description, themeSubTextStyle]} >Камера хранения</Text>
                        <Text style={[styles.text_description, themeTextStyle]} >{terminal}</Text>
                    </View>
                    <View style={styles.row_center_between}>
                        <Text style={[styles.description, themeSubTextStyle]} >Принят</Text>
                        <Text style={[styles.text_description, themeTextStyle]} >{item.date_send}</Text>
                    </View>
                    <View style={styles.row_center_between}>
                        <Text style={[styles.description, themeSubTextStyle]} >Стоимость</Text>
                        <Text style={[styles.text_description, themeTextStyle]} >{item.len_day > 0 ? item.len_day * item.price_per_day + " ₽" : "доплата не требуется"} </Text>
                    </View>
                    {item.len_day > 0 &&
                        <View style={styles.row_center_between}>
                            <Text style={[styles.description, themeSubTextStyle]} >Хранение </Text>
                            <Text style={[styles.text_description, themeTextStyle]} >{item.len_day} дня</Text>
                        </View>
                    }
                    {item.len_day > 0 &&
                        <View style={styles.row_center_between}>
                            <Text style={[styles.description, themeSubTextStyle]} >Продление хранения </Text>
                            <Text style={[styles.text_description, themeTextStyle]} >{item.price_per_day} ₽</Text>
                        </View>
                    }

                </View>
                <View style={[styles.row_center_between, { marginTop: '4%' }]}>
                    <View style={styles.row_center}>
                        <RadioButton labelHorizontal={true} style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: "2%" }}>
                            <RadioButtonInput
                                obj={item}
                                index={item.id}
                                isSelected={selectOrder == item}
                                onPress={clickCheckBox}
                                buttonInnerColor='#F5CB57'
                                buttonOuterColor="#F2F2F31F"
                                buttonSize={24}
                                buttonOuterSize={31}
                                buttonStyle={themeContainerSelectStyle}

                            />
                            <View style={{}}>
                                <Text style={[styles.text_select, themeSubTextStyle]} >{selectOrder != item ? "Выбрать для возврата" : "Выбрано"}</Text>
                            </View>
                        </RadioButton>
                        {/* <BouncyCheckbox
                            size={24}
                            fillColor='#F5CB57'
                            onPress={clickCheckBox}
                            unfillColor={colorScheme === 'light' ? '#23232A14' : '#F2F2F31F'}
                            iconStyle={{
                                borderWidth: 0
                            }}
                            disableText={false}
                            checkIconImageSource={null}
                        /> */}
                        {/* <Text style={[styles.text_select, themeSubTextStyle]} >{selectOrder.indexOf(item.id) == -1 ? "Выбрать для возврата" : "Выбрано"}</Text> */}
                    </View>
                    <TouchableOpacity activeOpacity={.9} style={[styles.btn_check, themeContainerSelectStyle]} onPress={handlePresentModalPress} >
                        <Text style={[{ fontFamily: 'Inter_700Bold', fontSize: 14 }, themeTextStyle]}>Чеки</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    const EmptyComponent = () => {
        return (
            <View style={{ alignContent: 'center', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
                <Image source={require('../assets/images/NoOrders.png')} style={{ width: 128, height: 172 }} />
                <Text style={[styles.text, { textAlign: 'center', marginTop: '20%' }, themeTextStyle]} >Заказов нет</Text>
            </View>
        )
    }


    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={[styles.container, themeContainerStyle]} >

            <StatusBar />
            {/* <View style={styles.row_center_between}>
                <Text style={[styles.text, themeTextStyle]} >Показать закрытые заказы</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#23232A14' }}
                    thumbColor={isEnabled ? '#F5CB57' : '#f4f3f4'}
                    ios_backgroundColor="#23232A14"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View> */}
            <FlatList
                style={{ width: "100%" }}
                data={orders}
                keyExtractor={item => item.id}
                renderItem={renderCard}
                onRefresh={onRefresh}
                refreshing={refreshing}
                ListEmptyComponent={<EmptyComponent />}
                ListFooterComponent={<View style={{ height: 100}}></View>}
            />
            {selectOrder == null ?
                <View style={{ position: 'absolute', bottom: '5%', width: '100%' }}>
                    <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={dateAlert} >
                        <Text style={{ fontFamily: 'Inter_700Bold', color: '#000', paddingVertical: '2%', fontSize: 14 }}>Сдать багаж</Text>
                    </TouchableOpacity>
                </View> :
                <View style={{ position: 'absolute', bottom: '5%', width: '100%' }}>
                    <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={takeItems} >
                        <Text style={{ fontFamily: 'Inter_700Bold', color: '#000', fontSize: 14 }}>Забрать сейчас</Text>
                        <Text style={styles.subtext_btn}>{totalPrice > 0 ? `Товар на сумму ${totalPrice} ₽` : "Доплата не требуется"}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity activeOpacity={.9} style={[styles.btn_2, themeBtn]} onPress={() => navigation.navigate('deliver_home')} >
                        <Text style={[{ fontFamily: 'Inter_700Bold', fontSize: 14 }, themeBtnSubText]}>Доставить домой</Text>
                        <Text style={[styles.subtext_btn, themeBtnSubText2]}>{totalPrice > 0 ? `1 единицы на сумму ${totalPrice} ₽ + доставка` : "Оплата доставки"}</Text>
                    </TouchableOpacity> */}
                </View>
            }

            <BottomSheetModalProvider>
                <View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        backgroundStyle={{ backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C' }}
                    >
                        <Text style={[styles.text, { textAlign: 'center' }, themeTextStyle]} >Чеки за оплату</Text>

                        <View style={{ padding: '5%' }}>
                            <View style={[styles.row_center_between, { marginBottom: '5%' }]}>
                                <Text style={[styles.text, themeTextStyle]} >Чек за хранение</Text>
                                <Text style={[styles.text_description, { color: '#0C0C0D7A' }, themeSubTextStyle]} >21 сентября 2022</Text>
                            </View>
                            <View style={[styles.row_center_between, { marginBottom: '5%' }]}>
                                <Text style={[styles.text, themeTextStyle]} >Чек за хранение</Text>
                                <Text style={[styles.text_description, { color: '#0C0C0D7A' }, themeSubTextStyle]} >21 сентября 2022</Text>
                            </View>

                            <TouchableOpacity activeOpacity={.9} style={styles.btn_bottomsheet} onPress={() => navigation.navigate('license_luggage')} >
                                <Text style={{ fontFamily: 'Inter_700Bold', color: '#000', fontSize: 14 }}>Сохранить чеки</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    row_center_between: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginTop: '2%',
        width: '100%',
    },
    row_center: {
        flexDirection: 'row', alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center'
    },
    text: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
    },
    subtext: {
    },
    subtext_btn: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
        color: "#0C0C0D7A",
    },
    description: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
    },
    text_description: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
    },
    text_select: {
        fontSize: 12,
        fontFamily: "Inter_400Regular",
        marginLeft: 3
    },

    container: {
        flex: 1,
        padding: '3%',
        alignItems: 'center',
    },
    container_location: {
        width: '100%',
        padding: '4%',
        borderRadius: 16,
        marginTop: "5%",
    },
    btn: {
        backgroundColor: '#F5CB57',
        borderRadius: 12,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16,
        elevation: 12,
    },
    btn_2: {
        marginTop: 12,
        borderRadius: 12,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16,
        elevation: 12,
    },

    btn_bottomsheet: {
        backgroundColor: '#F5CB57',
        borderRadius: 12,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16,
        elevation: 12,
    },

    btn_check: {
        borderRadius: 12,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
        paddingHorizontal: '4%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16,
        elevation: 12,
    },

    img: {
        marginRight: 8,
        height: 60,
        width: 60
    },



    lightContainer: {
        color: "#0C0C0D7A",
    },
    darkContainer: {
        backgroundColor: '#17171C',
    },
    lightText: {
        color: "#0C0C0D",
    },
    darkText: {
        color: '#F2F2F3',
    },
    lightSubText: {
        color: "#0C0C0D7A",
    },
    darkSubText: {
        color: '#F2F2F37A',
    },
    lightBtnSubText: {
        color: "#fff",
    },
    darkBtnSubText: {
        color: '#F2F2F37A',
    },
    lightBtnSubText2: {
        color: "#FFFFFF7A",
    },
    darkBtnSubText2: {
        color: '#F2F2F37A',
    },
    lightContainerSelect: {
        backgroundColor: "#23232A14"
    },
    darkContainerSelect: {
        backgroundColor: "#F2F2F31F"
    },
    lightBtn: {
        backgroundColor: "#0C0C0D"
    },
    darkBtn: {
        backgroundColor: "#F2F2F31F"
    },
    lightButton: {
        backgroundColor: "#F2F2F31F"
    },
    darkButton: {
        backgroundColor: "#F5CB57"
    },
})