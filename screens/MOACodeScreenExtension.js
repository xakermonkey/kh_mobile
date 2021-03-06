import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Appearance, useColorScheme, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { domain } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { RCCFreezy, RCCDiscard } from '../moa';




const MOACodeScreenExtension = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [code, setCode] = useState('');
    const [verify, setVerify] = useState(true);
    const [phone, setPhone] = useState("");

    useLayoutEffect(() => {
        (async () => {
            setPhone(await AsyncStorage.getItem("phone"));
        })();
    }, [navigation]);

    const Click = (num) => {
        if (num === 'del') {
            if (code.length > 0) {
                setCode(code.slice(0, -1));
            }
        } else {
            if (code.length < 4) {
                setCode(code + num);
            }
        }
    };


    const PaymentMOA = async (ret) => {
        let date = new Date().toISOString().split("T");
        const transaction_uuid = await AsyncStorage.getItem("transaction_uuid");
        const res = await RCCDiscard({
            transaction_uuid: transaction_uuid,
            confirmation_code: code,
            receipt: {
                fn_number: "214356612",
                date: `${date[0]} ${date[1].split(".")[0]}`,
                organization_name: ret.partner.name,
                organization_inn: ret.partner.inn,
                point_name: `${ret.ls.airport} ???????????????? ${ret.ls.terminal}`,
                kkt_number: "0000123",
                operator: "???????????????????? ??.??.",
                type: 0,
                amount: (route.params.total_price - route.params.sale) * 100,
                products: [
                    {
                        id: ret.lg.id.toString(),
                        "name": "???????????? ?????????????????? ???????????????? ????????????",
                        "quantity": route.params.len_day,
                        "price": (route.params.price_per_day - (route.params.sale / route.params.len_day).toFixed(2)) * 100,
                        "amount": (route.params.total_price - route.params.sale) * 100,
                    },
                ],
                url: ""
            }
        })
        console.log(res);
    }

    useEffect(() => {
        if (code.length === 4) {
            (async () => {
                const transiction_uuid = await AsyncStorage.getItem("transaction_uuid");
                let res = await RCCFreezy({
                    transaction_uuid: transiction_uuid,
                    confirmation_code: code
                });
                if (res.responseCode == 0) {
                    const token = await AsyncStorage.getItem("token");
                    const luggageId = await AsyncStorage.getItem("take_luggage");
                    const data = await axios.get(domain + "/get_luggage", {
                        params: {
                            pk: luggageId,
                            full: true
                        },
                        headers: {
                            "Authorization": "Token " + token
                        }
                    });
                    await PaymentMOA(data.data);
                    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "qr_code_take" }] }))
                } else {
                    setVerify(false);
                }
            })();
        }
        else if (code.length < 4 && !verify) {
            setVerify(true);
        }
    }, [code])


    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <View style={{ flex: 0, alignItems: 'center' }}>
                <Text style={[styles.title, themeTextStyle]}>?????? ???? ??????</Text>
                <Text style={[styles.subtext, themeSubTextStyle]} >?????????????? ?????? ???? ??????????????????,</Text>
                <Text style={[styles.subsubtext, themeSubTextStyle]} >?????????????????????????? ???? ??????????</Text>
                <Text style={[styles.subsubtext, themeSubTextStyle]} >{phone}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TextInput textContentType='oneTimeCode' autoFocus style={[styles.inputText, verify ? themeTextStyle : { color: "#9B0000" }]} showSoftInputOnFocus={false} value={code} />
            </View>
            <View style={{
                bottom: 20,
                // position: 'absolute',
                alignItems: 'center'
            }}>
                {/* <TouchableOpacity activeOpacity={0.9}>
                    <View style={[{ width: 110, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: '3%' }, themeContainerSelectStyle]}><Text style={[{ fontSize: 14, fontFamily: 'Inter_600SemiBold' }, themeTextStyle]}>2222</Text><Text style={[{ fontSize: 12, fontFamily: 'Inter_500Medium' }, themeSubTextStyle]}>????????????????????????</Text></View>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => navigation.navigate('license')}>
                    <Text style={[{ fontFamily: 'Inter_700Bold', fontSize: 14, textAlign: 'center' }, themeSubTextStyle]} >?????????????????? ?????? ????????????????</Text>
                </TouchableOpacity>
                <View style={styles.keyboard}>
                    <View style={styles.row} >
                        <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('1')}  ><Text style={[styles.num, themeTextStyle]} >1</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('2')}><Text style={[styles.num, themeTextStyle]}>2</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('3')}><Text style={[styles.num, themeTextStyle]}>3</Text></TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('4')}><Text style={[styles.num, themeTextStyle]}>4</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('5')}><Text style={[styles.num, themeTextStyle]}>5</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('6')}><Text style={[styles.num, themeTextStyle]}>6</Text></TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('7')}><Text style={[styles.num, themeTextStyle]}>7</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('8')}><Text style={[styles.num, themeTextStyle]}>8</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('9')}><Text style={[styles.num, themeTextStyle]}>9</Text></TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn, themeContainerStyle]} ><Text></Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('0')}><Text style={[styles.num, themeTextStyle]}>0</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, themeContainerStyle]} activeOpacity={0.5} onPress={() => Click('del')}><Ionicons name="backspace-outline" size={28} color={colorScheme === 'light' ? '#F5CB57' : '#F2F2F3'} /></TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MOACodeScreenExtension

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        marginTop: 24,
        fontSize: 24,
        fontFamily: "Inter_800ExtraBold",
    },
    subtext: {
        marginTop: 8,
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 24,
    },
    subsubtext: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 24,
    },
    inputText: {
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        // marginTop: '25%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 24,
        width: 300
    },
    btn: {
        width: 72,
        height: 72,
        borderRadius: 72,
        alignItems: 'center',
        justifyContent: 'center'
    },
    num: {
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold",
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
        backgroundColor: "#F5CB57"
    },
    darkContainerSelect: {
        backgroundColor: "#F2F2F31F"
    },



})