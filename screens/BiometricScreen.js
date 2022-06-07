import React, { useEffect, useState } from 'react';
import { Appearance, useColorScheme, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';




const BiometricScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeBtn = colorScheme === 'light' ? styles.lightBtn : styles.darkBtn;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [textBtn, settextBtn] = useState('')


    useEffect(() => {
        LocalAuthentication.supportedAuthenticationTypesAsync().then((type) =>{
            if (type.indexOf(1) != -1) {
                setTitle('Использовать отпечаток пальца');
                settextBtn('Использовать Touch ID');
                if (colorScheme === 'light') {
                    setImage(require('../assets/images/fingerprint.png'));
                } else {
                    setImage(require('../assets/images/fingerprint_white.png'));
                }
            } else if (type.indexOf(2) != -1) {
                setTitle('Использовать сканирование лица');
                settextBtn('Использовать Face ID');
                if (colorScheme === 'light') {
                    setImage(require('../assets/images/face.png'));
                } else {
                    setImage(require('../assets/images/face_white.png'));
                }
            }
        })
    })

    const Biomentric = (press) => {
        AsyncStorage.setItem("biometric", press.toString()).then(() => {
            navigation.replace('last_name');
        })
    }

    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <StatusBar/>
            <Image style={styles.img} source={image} />
            {/* <View style={[styles.circle, themeContainerSelectStyle]} ></View> */}
            <Text style={[styles.title, themeTextStyle]} >{title}</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>для быстрого входа в приложение</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>без ввода ПИН-кода?</Text>
            <Button title={textBtn} onPress={() => Biomentric(true)} titleStyle={styles.text_primary} containerStyle={styles.primary_btn} buttonStyle={styles.primary} />
            <Button title="Пропустить" onPress={() => Biomentric(false)} titleStyle={[styles.text_secondary, themeBtn]} containerStyle={styles.secondary_btn} buttonStyle={[styles.secondary, themeContainerSelectStyle]} />
        </SafeAreaView>
    )
};

export default BiometricScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
    },
    img:{
        position: 'absolute',
        top: '25%'
    },
    circle:{
        position: 'absolute',
        top: '35%',
        width: 128,
        height: 128,
        borderRadius: 128,
    },
    title:{
        fontFamily: "Inter_800ExtraBold",
        fontSize: 24,
        width: '75%',
        textAlign: 'center',
        marginBottom: 8
    },
    subtext:{
        fontSize: 16,
        fontFamily: "Inter_500Medium",
    },
    primary_btn:{
        width: '90%',
        borderRadius: 12,
        marginTop: '25%',
        marginBottom: 12
    },
    primary:{
        backgroundColor: '#F5CB57',
        paddingVertical: 15
    },
    secondary_btn:{
        width: '90%',
        borderRadius: 12,
        marginBottom: 10,
    },
    secondary:{
        paddingVertical: 15,
    },
    text_primary:{
        fontSize: 14,
        fontFamily: "Inter_700Bold",
        color:"#000000",
    },
    text_secondary:{
        fontSize: 14,
        fontFamily: "Inter_700Bold"
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
    lightBtn: {
        color: "#FFFFFF",
    },
    darkBtn: {
        color: '#F2F2F3',
    },
    lightSubText: {
        color: "#0C0C0D7A",
    },
    darkSubText: {
        color: '#F2F2F37A',
    },
    lightContainerSelect: {
        backgroundColor: "#0C0C0D"
    },
    darkContainerSelect: {
        backgroundColor: "#F2F2F31F"
    },

})
