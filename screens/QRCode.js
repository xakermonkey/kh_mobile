import { Appearance, useColorScheme, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain } from '../domain';
import QRCode from 'react-native-qrcode-svg';
import { CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
const QRCodeScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;
    const themeButtonStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [type, setType] = useState("send");
    const [id, setID] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Готово!",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        });
        (async () => {
            const token = await AsyncStorage.getItem("token");
            const luggageId = await AsyncStorage.getItem("lastLuggage");
            setID(luggageId);
            axios.get(domain + '/send_luggage/' + luggageId, { headers: { "Authorization": "Token " + token } });

        })();
    }, [navigation])


    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}  >
            <StatusBar />
            <View style={[styles.container, themeContainerStyle]} >
                <View style={{ flex: 1, alignItems:'center' }} >
                    <QRCode size={225} style={{}} solor={colorScheme === 'light' ? "black" : "white"} value={`?type=${type}&id=${id}`} />
                    {/* <Image style={{marginTop:'20%'}} source={colorScheme === 'light' ? require("../assets/images/qr_black.png") : require("../assets/images/qr_white.png")} /> */}
                    <Text style={[styles.qr_text, themeTextStyle]}>QR-код</Text>
                    <Text style={[styles.subtext, themeSubTextStyle]}>Покажите QR код сотруднику камеры хранения, чтобы забрать багаж</Text>
                </View>

                <TouchableOpacity activeOpacity={.9} style={[styles.btn]} onPress={() => navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "select_terminal" }]
                    }))} >
                    <Text style={[{ fontFamily: 'Inter_700Bold' }]}>Перейти к заказам</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default QRCodeScreen

const styles = StyleSheet.create({
    subtext: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        textAlign: 'center',
        lineHeight: 25
    },
    container: {
        flex: 1,
        padding: '5%',
        // alignItems: "center"
    },
    qr_text: {
        marginTop: '20%',
        fontSize: 28,
        fontFamily: "Inter_800ExtraBold"
    },
    btn: {
        // position: 'absolute',
        // width: '100%',
        backgroundColor: '#F5CB57',
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
        // bottom: '5%',
        elevation: 12,
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
    lightButton: {
        backgroundColor: "#F2F2F31F"
    },
    darkButton: {
        backgroundColor: "#3333FF"
    },
})