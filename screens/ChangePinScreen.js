import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Appearance, useColorScheme, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';

const ChangePinScreen = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;
    const themeKeyboardStyle = colorScheme === 'light' ? styles.darkPin : styles.lightPin;
    const themeDot = colorScheme === 'light' ? styles.darkDot : styles.lightDot;

    const [firstPin, setFirstPin] = useState('');
    const [secondPin, setSecondPin] = useState('');
    const [bFirst, setFirst] = useState(false);
    const [bad, setBad] = useState(false);

    useEffect(() => {
        if (firstPin.length === 4) {
            setFirst(true);
        } else {
            setFirst(false);
        }
        if (firstPin.length === 4 && secondPin.length === 4 && firstPin == secondPin) {
            AsyncStorage.setItem("pin", firstPin).then(() => {
                if (route.params.from == "code"){
                    navigation.replace('biometric');
                }else{
                    navigation.replace("profile");
                }
            })
        } else if (firstPin.length === 4 && secondPin.length == 4 && firstPin != secondPin) {
            setBad(true);
        }
        if (firstPin.length < 4 || secondPin.length < 4){
            setBad(false);
        }
    }, [firstPin, secondPin])

    const Click = (num) => {
        if (num === 'del') {
            if (firstPin.length <= 4 && secondPin.length === 0) {
                setFirstPin(firstPin.slice(0, -1));
            } else {
                setSecondPin(secondPin.slice(0, -1));
            }
        } else {
            if (firstPin.length < 4) {
                setFirstPin(firstPin + num);
            } else if (secondPin.length < 4) {
                setSecondPin(secondPin + num);
            }
        }
    }

    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <StatusBar />
            <View style={{ flex: 0, alignItems:'center' }}>
            <Text style={[styles.title, themeTextStyle]}>Установите ПИН-код</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>для входа</Text>
</View>

<View style={{flex:1, width:150, alignItems:'center', justifyContent:'center'}}>
            <View style={[styles.row_circle, bFirst ? { marginTop: '16%' } : { marginTop: '25%' }]} >
                <View style={[styles.circle, firstPin.length < 1 ? themeDot : themeKeyboardStyle]} ></View>
                <View style={[styles.circle, firstPin.length < 2 ? themeDot : themeKeyboardStyle]} ></View>
                <View style={[styles.circle, firstPin.length < 3 ? themeDot : themeKeyboardStyle]} ></View>
                <View style={[styles.circle, firstPin.length < 4 ? themeDot : themeKeyboardStyle]} ></View>
            </View>
            {bFirst && <Text style={[{ fontFamily: 'Inter_400Regular', fontSize: 12, marginVertical: "5%", textAlign: 'center' }, themeTextStyle]} >Повторите ПИН-код</Text>}
            {bFirst &&
                <View style={styles.row_circle_second} >
                    <View style={[styles.circle, bad ? {backgroundColor: '#FF3956'} : secondPin.length < 1 ? themeDot : themeKeyboardStyle]} ></View>
                    <View style={[styles.circle, bad ? {backgroundColor: '#FF3956'} : secondPin.length < 2 ? themeDot : themeKeyboardStyle]} ></View>
                    <View style={[styles.circle, bad ? {backgroundColor: '#FF3956'} : secondPin.length < 3 ? themeDot : themeKeyboardStyle]} ></View>
                    <View style={[styles.circle, bad ? {backgroundColor: '#FF3956'} : secondPin.length < 4 ? themeDot : themeKeyboardStyle]} ></View>
                </View>
            }
            { bad && <Text style={[{ color: '#FF3956', fontFamily: 'Inter_400Regular', fontSize: 12, textAlign: 'center' }]} >ПИН-коды не совпадают</Text>}
            </View>
<View style={{
    bottom: 20,
    // position: 'absolute',
    alignItems: 'center'
}}>
    <TouchableOpacity onPress={() => navigation.navigate('license')}>
        <Text style={[{ fontFamily: 'Inter_700Bold', fontSize: 14, textAlign: 'center' }, themeSubTextStyle]} >Забыли пароль?</Text>
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
        </SafeAreaView >
    )
}

export default ChangePinScreen

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
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 24,
    },
    keyboard: {
        // width: '85%',
        // marginTop: '10%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 24,
        width: 300
    },
    row_circle: {
        // flex:1,
        flexDirection: 'row',
        width: 130,
        justifyContent: 'space-between',
        // marginTop: '25%'
    },
    row_circle_second: {
        // flex:1,
        flexDirection: 'row',
        width: 130,
        justifyContent: 'space-between',
        marginBottom: '5%'
    },
    circle: {
        height: 20,
        width: 20,

        borderRadius: 20
    },
    repeat: {
        fontSize: 14,
        fontFamily: "Inter_700Bold",
        marginTop: '25%'
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
    lightPin: {
        backgroundColor: '#F2F2F3',
    },
    darkPin: {
        backgroundColor: '#0C0C0D7A',
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
    lightDot: {
        backgroundColor: "#F2F2F31F"
    },
    darkDot: {
        backgroundColor: "#E8E8E9"
    },
})
