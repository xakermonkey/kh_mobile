import { Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { domain } from '../domain';
import { CommonActions } from '@react-navigation/native';
import { RCCDiscard, collectMoa } from '../moa';
import { Inter_500Medium, Inter_800ExtraBold } from '@expo-google-fonts/inter';

const AcceptLuggage = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [loading, setLoading] = useState(false);
    const [badRequst, setBadRequst] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Сдать багаж",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        })
    }, [navigation])


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
                amount: (ret.lg.price_storage - ret.lg.sale_storage) * 100,
                products: [
                    {
                        id: ret.lg.id.toString(),
                        "name": "Услуга хранения багажа",
                        "quantity": 1.0,
                        "price": (ret.lg.price_storage - ret.lg.sale_storage) * 100,
                        "amount": (ret.lg.price_storage - ret.lg.sale_storage) * 100
                    },
                ],
                url: ""
            }
        })
    }


    const PayLuggage = async () => {
        setLoading(true);
        navigation.setOptions({
            headerBackVisible: false,
            gestureEnabled: false
        });
        const token = await AsyncStorage.getItem("token");
        const data = new FormData();
        data.append("ls", parseInt(await AsyncStorage.getItem("luggage_ls")));
        data.append("kind", parseInt(await AsyncStorage.getItem("luggage_kind")));
        if (route.params.sale == "") {
            data.append("sale", 0);
        } else {
            data.append("sale", parseInt(route.params.sale));
        }
        const keys = (await AsyncStorage.getAllKeys()).filter((obj) => obj.startsWith("luggage_file"));
        for (let i = 0; i < keys.length; i++) {
            let uri = await AsyncStorage.getItem(keys[i]);
            let shir = uri.split(".")
            shir = shir[shir.length - 1]
            data.append(`file${i + 1}`, {
                uri: uri,
                type: 'image/' + shir,
                name: `img${i + 1}.${shir}`
            });
        }
        try {
            const res = await fetch(domain + "/add_luggage", {
                method: "POST",
                body: data,
                headers: {
                    "Authorization": "Token " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
            const ret = await res.json();
            if (ret.status == true) {
                await AsyncStorage.setItem("lastLuggage", ret.lg.id.toString());
                await AsyncStorage.removeItem("luggage_ls");
                await AsyncStorage.removeItem("luggage_kind");
                for (let i = 0; i < keys.length; i++) {
                    await AsyncStorage.removeItem(keys[i]);
                }
                if (route.params.sale != "" && parseInt(route.params.sale) != 0) {
                    let date = new Date().toISOString().split("T");
                    const code = await AsyncStorage.getItem("confirmation_code");
                    const transaction_uuid = await AsyncStorage.getItem("transaction_uuid");
                    const res = await RCCDiscard({
                        transaction_uuid: transaction_uuid,
                        confirmation_code: code,
                        receipt: {
                            fn_number: "214356612",
                            date: `${date[0]} ${date[1].split(".")[0]}`,
                            organization_name: ret.partner.name,
                            organization_inn: ret.partner.inn,
                            point_name: `${ret.ls.airport} Терминал ${ret.ls.terminal}`,
                            kkt_number: "0000123",
                            operator: "Хабибулина И.А.",
                            type: 0,
                            amount: (ret.lg.price_storage - ret.lg.sale_storage) * 100,
                            products: [
                                {
                                    id: ret.lg.id.toString(),
                                    "name": "Услуга хранения багажа",
                                    "quantity": 1.0,
                                    "price": (ret.lg.price_storage - ret.lg.sale_storage) * 100,
                                    "amount": (ret.lg.price_storage - ret.lg.sale_storage) * 100
                                },
                            ],
                            url: ""
                        }
                    })
                } else {
                    await collectMOA(ret);
                }
                setLoading(false);
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "qr_code" }]
                    }));
            }
        }
        catch (err) {
            setLoading(false);
            setBadRequst(true);
            // navigation.goBack();
        }

    }

    if (badRequst) {
        return (
            <SafeAreaView style={[{ flex: 1 }, themeContainerStyle]} >
                <View style={{ justifyContent: 'flex-end', flex: 1}} >
                    <Image style={{ height: 200, alignSelf: 'center' }} resizeMode="contain" source={colorScheme === 'light' ? require("../assets/images/Lounge.png") : require("../assets/images/Lounge_white.png")} />
                    <Text style={[styles.subtext_notfounde, themeTextStyle]} >Что-то пошло не так...</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', flex: 1, padding: "3%" }} >
                <TouchableOpacity activeOpacity={.9} style={[styles.btn, {marginBottom: "3%"}]} onPress={() => { setBadRequst(false); PayLuggage(); }} >
                    <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Попробовать снова</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.9} style={[styles.btn, themeContainerSelectStyle]} onPress={() => navigation.goBack()} >
                    <Text style={[{ fontFamily: 'Inter_700Bold'}, themeTextStyle]}>Назад</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }


    return (
        <View style={[{ flex: 1 }, themeContainerStyle]}>
            <StatusBar />
            {loading && <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1, backgroundColor: "rgba(0,0,0,0.5)", height: "100%", width: "100%" }}>
                <Image width="100%" height="100%" source={require("../assets/images/payload.gif")} />
                <Text style={[{ textAlign: 'center', fontSize: 18, fontFamily: 'Inter_800ExtraBold', marginTop: '10%' }, themeTextStyle]} >Идет обработка заказа</Text>
            </View>}
            <SafeAreaView style={[styles.container, themeContainerStyle]}  >
                <View style={[styles.container, themeContainerStyle]}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={[styles.container_price, themeContainerSelectStyle]} >
                            <View style={styles.price_line}>
                                <Text style={[styles.price_line_text, themeTextStyle]} >Хранение багажа</Text>
                                <Text style={[styles.price_line_price, themeTextStyle]} >{route.params.price} ₽</Text>
                            </View>
                            <View style={styles.price_line}>
                                <Text style={[styles.price_line_text, themeTextStyle]} >Списание миль</Text>
                                <Text style={[styles.price_line_price, themeTextStyle]} >-{route.params.sale == "" ? 0 : route.params.sale} миль</Text>
                            </View>
                            <View style={[styles.line, themeContainerStyle]} ></View>
                            <View style={styles.price_line}>
                                <Text style={[styles.price_line_text, themeTextStyle]} >Итоговая стоимость</Text>
                                <Text style={[styles.price_line_price, themeTextStyle]} >{route.params.sale == "" ? route.params.price : parseInt(route.params.price) - parseInt(route.params.sale)} ₽</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
                        <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={PayLuggage} >
                            <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Оплатить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default AcceptLuggage

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
        // backgroundColor: "#F9F9FA",
        flex: 1,
        padding: '5%'
        // width: "100%",
        // alignItems: "center"
    },
    container_price: {
        // width: "85%",
        borderRadius: 16,
        // justifyContent: 'flex-end'
        // marginTop: "50%",
        // backgroundColor: "#23232A14"
    },
    price_line: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: "7%",
        alignItems: 'center'
    },
    line: {
        // backgroundColor: "#F9F9FA",
        width: "100%",
        height: 2
    },
    price_line_text: {
        // color: "#0C0C0D",
        fontSize: 16,
        fontFamily: "Inter_400Regular"
    },
    price_line_price: {
        // color: "#0C0C0D",
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold"
    },
    subtext_notfounde: {
        marginTop: '5%',
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
        // padding:'10%'
    },
    btn: {
        // position: 'absolute',
        backgroundColor: '#F5CB57',
        // width: '90%',
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
        fontSize: 16
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
    lightContainerSelect: {
        backgroundColor: "#23232A14"
    },
    darkContainerSelect: {
        backgroundColor: "#F2F2F31F"
    },
})