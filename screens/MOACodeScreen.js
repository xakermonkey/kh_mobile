import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Appearance, useColorScheme, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { domain } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { RCCFreezy } from '../moa';




const MOACodeScreen = ({ navigation, route }) => {
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

    useEffect(() => {
        if (code.length === 4) {
            (async () => {
                const transiction_uuid = await AsyncStorage.getItem("transaction_uuid");
                console.log(transiction_uuid);
                const res = await RCCFreezy({
                    transaction_uuid: transiction_uuid,
                    confirmation_code: code
                });
                console.log(res);
                if (res.responseCode == 0) {
                    await AsyncStorage.setItem("confirmation_code", code);
                    navigation.navigate("accept_luggage", { "price": route.params.price, "sale": route.params.sale })
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
                <Text style={[styles.title, themeTextStyle]}>Код из СМС</Text>
                <Text style={[styles.subtext, themeSubTextStyle]} >Введите код из сообщения,</Text>
                <Text style={[styles.subsubtext, themeSubTextStyle]} >отправленного на номер</Text>
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
                <TouchableOpacity activeOpacity={0.9}>
                    <View style={[{ width: 110, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: '3%' }, themeContainerSelectStyle]}><Text style={[{ fontSize: 14, fontFamily: 'Inter_600SemiBold' }, themeTextStyle]}>2222</Text><Text style={[{ fontSize: 12, fontFamily: 'Inter_500Medium' }, themeSubTextStyle]}>из сообщения</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('license')}>
                    <Text style={[{ fontFamily: 'Inter_700Bold', fontSize: 14, textAlign: 'center' }, themeSubTextStyle]} >Отправить код повторно</Text>
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

export default MOACodeScreen

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