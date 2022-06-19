import { Appearance, useColorScheme, StyleSheet, Text, View, TouchableOpacity, Image, Switch, FlatList, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useRef, useMemo, useCallback } from 'react'
import { Icon } from 'react-native-elements'; import { StatusBar } from 'expo-status-bar';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Orders from '../Orders';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain, domain_domain } from '../../domain';





const ClosedOrders = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeBtnSubText = colorScheme === 'light' ? styles.lightBtnSubText : styles.darkBtnSubText;
    const themeBtnSubText2 = colorScheme === 'light' ? styles.lightBtnSubText2 : styles.darkBtnSubText2;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;
    const themeButtonStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;
    const themeBtn = colorScheme === 'light' ? styles.lightBtn : styles.darkBtn;

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['30%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current.snapToIndex(0);
    }, []);

    const CustomBackDrop = (props) => {
        return (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                opacity='0.9'
                closeOnPress={true}
                enableTouchThrough={true}
                pressBehavior='close'
            />
        );
    };

    const [orders, setOrders] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [terminal, setTerminal] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            // headerRight: () => {
            //     return (
            //         <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            //             <TouchableOpacity style={{ marginRight: 5 }} activeOpacity={0.5} onPress={() => navigation.navigate('profile')} >
            //                 <Image
            //                     source={require("../../assets/images/profile.png")}
            //                     style={{ width: 24, height: 30 }}
            //                 />
            //             </TouchableOpacity>
            //         </View>)
            // }
        });
        (async () => {
            const term = await AsyncStorage.getItem("close_terminal_name");
            setTerminal(term);
            const air = await AsyncStorage.getItem("close_airport");
            navigation.setOptions({
                headerTitle: () => {
                    return (<View style={{ alignItems: 'center' }} >
                        <Text style={[styles.title, themeTextStyle]} >{term}</Text>
                        <Text style={[styles.subtext, themeSubTextStyle]} >{air}</Text>
                    </View>)
                },
            })
            const id = await AsyncStorage.getItem("close_terminal");
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(domain + `/get_close_orders/${id}`, { headers: { "Authorization": "Token " + token } })
            setOrders(res.data)
        })();
    }, [navigation])



    const EmptyComponent = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', height:500 }}>
                <Image source={colorScheme === 'light' ? require('../../assets/images/NoOrders.png') : require('../../assets/images/NoOrders_white.png')} style={{ width: 128, height: 172 }} />
                <Text style={[styles.text, { textAlign: 'center', marginTop: '20%' }, themeTextStyle]} >Заказов нет</Text>
            </View>
        )
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const id = await AsyncStorage.getItem("close_terminal")
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(domain + `/get_close_orders/${id}`, { headers: { "Authorization": "Token " + token } });
        setOrders(res.data);
        setRefreshing(false);
    }, []);

    const renderCard = ({ item }) => {
        console.log(item);
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
                        <Text style={[styles.description, themeSubTextStyle]} >Возвращен</Text>
                        <Text style={[styles.text_description, themeTextStyle]} >{item.date_take}</Text>
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
                    <TouchableOpacity activeOpacity={.9} style={[styles.btn_check, themeContainerSelectStyle]} onPress={handlePresentModalPress} >
                        <Text style={[{ fontFamily: 'Inter_700Bold', fontSize: 14 }, themeTextStyle]}>Чеки</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    return (
        <View style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <FlatList
                style={{ width: "100%" }}
                data={orders}
                keyExtractor={item => item.id}
                renderItem={renderCard}
                ListEmptyComponent={<EmptyComponent />}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            <BottomSheet
                ref={bottomSheetModalRef}
                index={-1}
                backdropComponent={CustomBackDrop}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
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
            </BottomSheet>
        </View>
    )
}

export default ClosedOrders

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
        alignItems: 'center'
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