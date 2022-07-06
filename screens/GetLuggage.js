import {
    Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView,
    TouchableOpacity, TouchableWithoutFeedback, Keyboard,
    KeyboardAvoidingView, Image, Switch, TextInput, Alert, ScrollView
} from 'react-native'
import React, { useLayoutEffect, useState, useRef, useMemo, useCallback } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { domain } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBalance, initialTransaction, collectMoa, RCCSendMSG, getQrCode } from '../moa';

const AcceptLuggageMileonAir = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeLineStyle = colorScheme === 'light' ? styles.lightLine : styles.darkLine;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [isEnabled, setIsEnabled] = useState(false);
    const [mile, setMile] = useState("")
    const [qr, setQR] = useState(null);
    const [balance, setBalance] = useState("");
    const [bad, setBad] = useState(false);


    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['30%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        if (parseInt(mile) < 40 && parseInt(mile) != 0) {
            Alert.alert("Предупреждение", "Минимально возжозмоное списание миль: 40");
            setBad(true);
            return 0;
        }
        console.log('handleSheetChanges', index);
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Забрать багаж",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        });
        (async () => {
            const qr = await AsyncStorage.getItem("qr");
            if (qr != null) {
                setQR(qr);
                setBalance(await getBalance(qr));
            }
        })();
    }, [navigation])

    const setSale = (text) => {
        if (parseInt(text) > parseInt(balance)) {
            if (parseInt(balance) < parseInt(route.params.total_price) - 1) {
                setMile(balance.toString());
                Alert.alert("Предупреждение", "На Вашем счету нет столько миль");
                return 0;
            } else {
                setMile((parseInt(route.params.total_price) - 1).toString());
                Alert.alert("Предупреждение", "Максимальное списание баллов: " + (parseInt(route.params.total_price) - 1).toString())
                return 0;
            }
        }
        if (parseInt(text) > parseInt(route.params.total_price) - 1) {
            setMile((parseInt(route.params.total_price) - 1).toString());
            Alert.alert("Предупреждение", "Максимальное списание баллов: " + (parseInt(route.params.total_price) - 1).toString())
            return 0;
        }
        setMile(text);
    }

    const toggleSwitch = () => {
        if (qr == null) {
            Alert.alert("Внимание", "Вы еще не подключились к MILEONAIR",
                [
                    { text: "Отмена", style: 'destructive' },
                    {
                        text: "Подключить",
                        onPress: async () => {
                            const token = await AsyncStorage.getItem("token");
                            const number = await AsyncStorage.getItem("phone_number");
                            const qr = await getQrCode(number);
                            await axios.post(domain + "/add_mile_on_air", { "qr": qr }, { headers: { "Authorization": "Token " + token } });
                            await AsyncStorage.setItem("qr", qr);
                            setQR(qr);
                            setBalance(await getBalance(qr));
                            setIsEnabled(true);
                        },

                    }
                ]);
        } else {
            setMile("");
            setIsEnabled(!isEnabled)
        }

    }
    const collectMOA = async (ret) => {
        let date = new Date().toISOString().split("T");
        const transaction_uuid = await AsyncStorage.getItem("transaction_uuid");
        const res = await collectMoa({
            transaction_uuid: transaction_uuid,
            receipt: {
                fn_number: "214356612",
                date: `${date[0]} ${date[1].split(".")[0]}`,
                organization_name: ret.partner.name,
                organization_inn: ret.partner.inn,
                point_name: `${ret.ls.airport} Терминал ${ret.ls.terminal}`,
                kkt_number: "0000123",
                operator: "Хабибулина И.А.",
                type: 0,
                amount: route.params.total_price * 100,
                products: [
                    {
                        id: ret.lg.id.toString(),
                        "name": "Услуга продления хранения багажа",
                        "quantity": route.params.len_day,
                        "price": route.params.price_per_day * 100,
                        "amount": route.params.total_price * 100
                    },
                ],
                url: ""
            }
        })
        console.log(res);
    }

    const Payment = async () => {
        const token = await AsyncStorage.getItem("token");
        const luggageId = await AsyncStorage.getItem("take_luggage");
        const res = await axios.post(domain + "/take_luggage/" + luggageId,
            {
                price_for_storage: route.params.total_price,
                day_len: route.params.len_day,
                sale_day_storage: parseInt(mile)
            },
            {
                headers: {
                    "Authorization": "Token " + token
                }
            })
        if (mile == "" || parseInt(mile) == 0) {
            if (qr != null) {
                const init = await initialTransaction(qr);
                await AsyncStorage.setItem("transaction_uuid", init.transaction_uuid);
                await collectMOA(res.data)
            } else {
                await AsyncStorage.removeItem("transaction_uuid");
            }
        }
        else if (parseInt(mile) >= 40) {
            const init = await initialTransaction(qr);
            await AsyncStorage.setItem("transaction_uuid", init.transaction_uuid);
            const rcc = await RCCSendMSG({
                transaction_uuid: init.transaction_uuid,
                mile_count: parseInt(mile),
                organization_name: res.data.partner.name,
                point_name: `${res.data.ls.airport} Терминал ${res.data.ls.terminal}`
            });
            if (rcc.responseCode == 0) {
                navigation.navigate("moa_code_extension", { ...route.params, sale: parseInt(mile) });
                return 0;
            }
        }
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "qr_code_take" }] }))
    }


    return (
        <SafeAreaView style={[{ flex: 1 }, themeContainerStyle]}>
            <StatusBar />
            {/* <ScrollView> */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                        <View style={[styles.container, themeContainerStyle]}>
                            <View style={{flex:1, justifyContent:'flex-end'}}>
                            <View style={[styles.container_price, themeContainerSelectStyle]} >
                                <View style={styles.price_line}>
                                    <Text style={[styles.price_line_text, themeSubTextStyle]} >Хранение багажа</Text>
                                    <Text style={[styles.price_line_price, themeTextStyle]} >{route.params.total_price} ₽</Text>
                                </View>
                                <View style={[styles.line, themeLineStyle]} ></View>
                                <View style={styles.price_line}>
                                    <Text style={[styles.price_line_text, themeSubTextStyle]} >Списание миль</Text>
                                    <Text style={[styles.price_line_price, themeTextStyle]} >-{mile == "" ? "0" : mile} миль</Text>
                                </View>
                                <View style={[styles.line, themeLineStyle]} ></View>
                                <View style={styles.price_line}>
                                    <Text style={[styles.price_line_text, themeSubTextStyle]} >Итоговая стоимость</Text>
                                    <Text style={[styles.price_line_price, themeTextStyle]} >{mile == "" ? route.params.total_price : route.params.total_price - parseInt(mile)} ₽</Text>
                                </View>
                            </View></View>

                            <View style={{ flex: 1, marginTop:'5%' }}>
                                <View style={{ height: 150 }}>
                                    <View style={styles.container_mileonair} >
                                        <View  >
                                            <Text style={[styles.value, themeTextStyle]} >Оплатить милями MILEONAIR</Text>
                                            <Text style={[styles.label_mile, themeSubTextStyle]} >{qr != null ? balance + " миль" : "Не подключено"}</Text>
                                        </View>
                                        <Switch
                                            trackColor={{ false: "#23232A14", true: "#23232A14" }}
                                            thumbColor={isEnabled ? "#F5CB57" : "#F2F2F3"}
                                            ios_backgroundColor="#23232A14"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}
                                        />
                                    </View>
                                    {isEnabled &&
                                        <View style={[{ borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }, themeContainerSelectStyle]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ alignItems: 'center', alignContent: 'center', paddingHorizontal: 20, paddingVertical: 6 }}>
                                                    <Icon
                                                        name="airplane"
                                                        type="ionicon"
                                                        color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                                    />
                                                    <Text style={themeSubTextStyle} >миль</Text>
                                                </View>
                                                <View style={[{ width: 1, backgroundColor: '#fff' }, themeContainerStyle]}></View>
                                            </View>

                                            <View style={{ flex:1,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                                                <TextInput
                                                    value={mile}
                                                    placeholder="40"
                                                    onChangeText={setSale}
                                                    style={[styles.text_input, themeTextStyle, { width: 120,}]}
                                                    keyboardType="number-pad"
                                                    maxLength={route.params.total_price.toString().length}
                                                />
                                                <Text style={[{ textAlign: 'right', fontSize: 12, fontFamily: "Inter_400Regular" }, bad ? { color: "#FF3956" } : themeSubTextStyle]} >Мининимальное {"\n"}списание 40 миль</Text>
                                            </View>
                                        </View>
                                    }
                                </View>


                                <View style={styles.type_pay} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <Image
                                            source={require("../assets/images/visa.png")}
                                            width={50}
                                            height={50}
                                            style={styles.card_img}
                                        />
                                        <View style={{ marginLeft: '5%' }} >
                                            <Text style={[styles.text_type, themeTextStyle]} >Способ оплаты</Text>
                                            <Text style={[styles.subtext, themeSubTextStyle]} >Visa **** 1679</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <Text style={[styles.subtext, themeSubTextStyle]} >Изменить</Text>
                                        <Icon
                                            name="chevron-forward-outline"
                                            type="ionicon"
                                            color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{ flex: 0, justifyContent: 'flex-end' }}>
                                <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={handlePresentModalPress} >
                                    <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Оплатить</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            {/* </ScrollView> */}

            <BottomSheetModalProvider>
                <View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={0}
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

                            <TouchableOpacity activeOpacity={.9} style={styles.btn_bottomsheet} onPress={Payment} >
                                <Text style={{ fontFamily: 'Inter_700Bold', color: '#000', fontSize: 14 }}>Сохранить чеки</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}

export default AcceptLuggageMileonAir

const styles = StyleSheet.create({
    title: {
        // color: "#0C0C0D",
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center'
    },
    subtext: {
        // color: "#0C0C0D7A",
    },
    container: {
        flex: 1,
        padding: '4%',
        // justifyContent: 'flex-end',
        // marginBottom: "10%",
    },
    container_price: {
        // flex: 1,
        // justifyContent:'flex-end',
        // width: "100%",
        borderRadius: 16,
        // marginTop: "20%",
        // backgroundColor: "#23232A14" 
    },
    price_line: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: "7%",
        alignItems: 'center'
    },
    line: {
        height: 2
    },
    text_input: {
        fontSize: 32,
        fontFamily: 'Inter_800ExtraBold',
        // textAlign:'left'
        // color: "#0C0C0D7A",
    },
    price_line_text: {
        // color: "#0C0C0D",
        fontSize: 16,
        fontFamily: "Inter_500Medium"
    },
    price_line_price: {
        // color: "#0C0C0D",
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold"
    },
    btn: {
        // position: 'absolute',
        backgroundColor: '#F5CB57',
        // width: '100%',
        borderRadius: 12,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 17,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16,
        // bottom: "5%",
        elevation: 12,
    },
    type_pay: {
        flexDirection: 'row',
        // width: "85%",
        justifyContent: 'space-between',
        marginBottom: "5%"
    },
    card_img: {
        width: 50,
        height: 50,
        // backgroundColor: "#fff",
        borderRadius: 50
    },
    text_type: {
        // color: "#0C0C0D",
        fontFamily: "Inter_700Bold",
        fontSize: 16,
    },
    container_mileonair: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    value: {
        // color: "#0C0C0D",
        fontSize: 14,
        fontFamily: "Inter_500Medium"
    },
    label_mile: {
        // color: "#0C0C0D7A",
        marginTop: "1%"
    },

    ///bottom sheet
    row_center_between: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginTop: '2%',
        width: '100%',
    },
    text_description: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
    },
    text: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
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

    /////



    lightContainer: {
        color: "#0C0C0D7A",
    },
    darkContainer: {
        backgroundColor: '#17171C',
    },
    lightLine: {
        backgroundColor: "#F9F9FA",
    },
    darkLine: {
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
    lightContainerSelect: {
        backgroundColor: "#23232A14"
    },
    darkContainerSelect: {
        backgroundColor: "#F2F2F31F"
    },
})