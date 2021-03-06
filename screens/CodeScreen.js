import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Appearance, useColorScheme, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { domain } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';




const CodeScreen = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [code, setCode] = useState('');
    const [verify, setVerify] = useState(true);

    // const Click = (num) => {
    //     if (num === 'del') {
    //         if (code.length > 0) {
    //             setCode(code.slice(0, -1));
    //         }
    //     } else {
    //         if (code.length < 4) {
    //             console.log('kdd')
    //             setCode(code + num);
    //             console.log(code)
    //         }
    //     }
    // };

    const Click2 = (num) => {
        setCode(num)
    }

    useEffect(() => {
        if (code.length === 4) {
            (async () => {
                try {
                    const res = await axios.post(domain + "/set_code", { 'number': route.params.number, 'code': code })
                    await AsyncStorage.setItem("token", res.data.token);
                    await AsyncStorage.setItem("phone", route.params.login);
                    await AsyncStorage.setItem("phone_number", route.params.number);
                    if (res.data.doc.last_name != null) {
                        await AsyncStorage.setItem("last_name", res.data.doc.last_name);
                    }
                    if (res.data.doc.first_name != null) {
                        await AsyncStorage.setItem("first_name", res.data.doc.first_name);
                        await AsyncStorage.setItem("first_join", "true");
                    }
                    if (res.data.qr.qr != null) {
                        await AsyncStorage.setItem("qr", res.data.qr.qr);
                    }
                    // if (res.data.doc.how_get != null) {
                    //     await AsyncStorage.setItem("how_get", res.data.doc.how_get);
                    // }
                    // if (res.data.doc.type_doc != null) {
                    //     await AsyncStorage.setItem("type_doc", res.data.doc.type_doc);
                    // }
                    // if (res.data.doc.avatar != null) {
                    //     await AsyncStorage.setItem("avatar", res.data.doc.first_scan);
                    // }
                    // if (res.data.doc.series_number != null) {
                    //     await AsyncStorage.setItem("number_doc", res.data.doc.series_number);
                    // }

                    // if (res.data.doc.birthday != null) {
                    //     await AsyncStorage.setItem("birthday", new Date(res.data.doc.birthday).getTime().toString());
                    // }
                    // if (res.data.doc.date_get != null) {
                    //     await AsyncStorage.setItem("date_get", new Date(res.data.doc.date_get).getTime().toString());
                    // }
                    const pin = await AsyncStorage.getItem('pin');
                    const biometric = await AsyncStorage.getItem("biometric");
                    if (pin == null) {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "changepin", params: { from: "code" } }]
                            }));
                        return 0;
                    }
                    if (biometric == null) {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "biometric" }]
                            }));
                        return 0;
                    }
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "pin" }]
                        }));
                    return 0;
                }
                catch (err) {
                    console.warn(err);
                    setVerify(false);
                    return 0;
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
            <View style={{ alignItems: 'center' }}>
                <Text style={[styles.title, themeTextStyle]}>?????? ???? ??????</Text>
                <Text style={[styles.subtext, themeSubTextStyle]} >?????????????? ?????? ???? ??????????????????,</Text>
                <Text style={[styles.subsubtext, themeSubTextStyle]} >?????????????????????????? ???? ??????????</Text>
                <Text style={[styles.subsubtext, themeSubTextStyle]} >{route.params.login}</Text>
            </View>
            <View style={{ justifyContent: 'center', marginTop: '10%' }}>
                <TextInput keyboardType='number-pad' maxLength={4} textContentType='oneTimeCode' autoFocus style={[styles.inputText, verify ? themeTextStyle : { color: "#9B0000" }]}
                    onChangeText={(code) => Click2(code)}
                />
            </View>
            {/* <View style={{
                bottom: 20,
                // position: 'absolute',
                alignItems: 'center'
            }}>
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
            </View> */}
        </SafeAreaView>
    )
}

export default CodeScreen

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