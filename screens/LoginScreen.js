import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Appearance, useColorScheme, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 


const LoginScreen = ({navigation}) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [number, setNumber] = useState('+7');


    const Click = (num) => {
        if (num === 'del') {
            if (number.length > 2) {
                setNumber(number.slice(0, -1));
            }
        } else {
            setNumber(number + num);
        }
    };

    useEffect(() => {
        if (number.length === 12) {
            navigation.navigate('code', { 'login': number })
        }
    }, [number])


    return (
       <SafeAreaView style={[styles.container, themeContainerStyle]} >
            <StatusBar/>
           <Text style={[styles.title, themeTextStyle]}>Вход</Text>
           <Text style={[styles.subtext, themeSubTextStyle]} >Введите номер телефона, </Text>
           <Text style={[styles.subsubtext, themeSubTextStyle]} >чтобы войти в существующий аккаунт </Text>
           <Text style={[styles.subsubtext, themeSubTextStyle]} >или создать новый</Text>
            <TextInput autoFocus style={[styles.inputText, themeTextStyle]} showSoftInputOnFocus={false} value={number} />
            <View style={styles.keyboard}>
                <View style={styles.row} >
                    <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={()=> Click('1')}  ><Text style={[styles.num, themeTextStyle]} >1</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={()=> Click('2')}><Text style={[styles.num, themeTextStyle]}>2</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={()=> Click('3')}><Text style={[styles.num, themeTextStyle]}>3</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={()=> Click('4')}><Text style={[styles.num, themeTextStyle]}>4</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={()=> Click('5')}><Text style={[styles.num, themeTextStyle]}>5</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={()=> Click('6')}><Text style={[styles.num, themeTextStyle]}>6</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={()=> Click('7')}><Text style={[styles.num, themeTextStyle]}>7</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={()=> Click('8')}><Text style={[styles.num, themeTextStyle]}>8</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={()=> Click('9')}><Text style={[styles.num, themeTextStyle]}>9</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.btn, themeContainerStyle]} ><Text></Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={()=> Click('0')}><Text style={[styles.num, themeTextStyle]}>0</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, themeContainerStyle]} activeOpacity={0.5} onPress={()=> Click('del')}><Ionicons name="backspace-outline" size={28} color={colorScheme === 'light' ? '#F5CB57' : '#F2F2F3'} /></TouchableOpacity>
                </View>
            </View>
       </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
    },
    title:{
        marginTop: 24,
        fontSize: 24,
        fontFamily: "Inter_800ExtraBold",
    },
    subtext:{
        marginTop: 8,
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 24,
    },
    subsubtext:{
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 24,
    },
    inputText:{
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        marginTop: '25%'
    },
    keyboard:{
        width: '85%',
        marginTop: '25%'
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 24
    },
    btn:{
        width: 72,
        height: 72,
        borderRadius: 72,
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    num:{
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
