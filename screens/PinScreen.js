import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Appearance, useColorScheme, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication';
import { CommonActions } from '@react-navigation/native';

const PinScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;
    const themeKeyboardStyle = colorScheme === 'light' ? styles.darkPin : styles.lightPin;
    const themeDot = colorScheme === 'light' ? styles.darkDot : styles.lightDot;


    const [pin, setPin] = useState("");
    const [bad, setBad] = useState(false);
    const [biometric, setBiomentric] = useState(false);


    useLayoutEffect(() => {
        (async () => {
            const biometric = await AsyncStorage.getItem("biometric");
            if (biometric == "true") {
                setBiomentric(true);
                try {
                    const result = await LocalAuthentication.authenticateAsync();
                    if (result.success == true) {
                        const doc = await AsyncStorage.getItem("first_join");
                        if (doc == "true") {
                            const airport = await AsyncStorage.getItem("airport");
                            if (airport != null) {
                                navigation.replace("select_terminal", { "title": airport });
                                return 0;
                            } else {
                                navigation.replace("select_airport");
                                return 0;
                            }
                        } else {
                            const patr = await AsyncStorage.getItem("patronymic");
                            if (patr != null) {
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [{ name: "select_airport" }]
                                    }));
                            } else {
                                navigation.replace('last_name');
                            }
                            return 0;
                        }
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        })();
    }, [navigation])


    const clickBiomentric = async () => {
        if (biometric) {
            try {
                const result = await LocalAuthentication.authenticateAsync();
                if (result.success == true) {
                    const doc = await AsyncStorage.getItem("first_join");
                    if (doc == "true") {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "select_terminal" }]
                            }));
                    } else {
                        const patr = await AsyncStorage.getItem("patronymic");
                        if (patr != null) {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: "select_terminal" }]
                                }));
                        } else {
                            navigation.replace('last_name');
                        }
                        return 0;
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    const Click = (num) => {
        if (num === 'del') {
            if (pin.length > 0) {
                setPin(pin.slice(0, -1));
            }
        } else {
            if (pin.length < 4) {
                setPin(pin + num);
            }
        }
    }

    useEffect(() => {
        if (pin.length == 4) {
            (async () => {
                const verify = await AsyncStorage.getItem("pin");
                if (pin == verify) {

                    const doc = await AsyncStorage.getItem("first_join");
                    if (doc == "true") {
                        const airport = await AsyncStorage.getItem("airport");
                        if (airport != null) {
                            navigation.replace("select_terminal", { "title": airport });
                            return 0;
                        } else {
                            navigation.replace("select_terminal");
                            return 0;
                        }
                    } else {
                        const patr = await AsyncStorage.getItem("patronymic");
                        if (patr != null) {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: "select_terminal" }]
                                }));
                        } else {
                            navigation.replace('last_name');
                        }
                        return 0;
                    }
                } else {
                    setBad(true);
                    return 0;
                }
            })();
        } else {
            setBad(false);
        }
    })


    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <StatusBar />
            <Text style={[styles.title, themeTextStyle]}>Введите ПИН-код</Text>
            <Text style={[styles.subtext, themeTextStyle]}>для входа</Text>
            <View style={[styles.row_circle, { marginTop: '25%' }]} >
                <View style={[styles.circle, bad ? { backgroundColor: '#FF3956' } : pin.length < 1 ? themeDot : themeKeyboardStyle]} ></View>
                <View style={[styles.circle, bad ? { backgroundColor: '#FF3956' } : pin.length < 2 ? themeDot : themeKeyboardStyle]} ></View>
                <View style={[styles.circle, bad ? { backgroundColor: '#FF3956' } : pin.length < 3 ? themeDot : themeKeyboardStyle]} ></View>
                <View style={[styles.circle, bad ? { backgroundColor: '#FF3956' } : pin.length < 4 ? themeDot : themeKeyboardStyle]} ></View>
            </View>
            {bad && <Text style={[{ color: '#FF3956', fontFamily: 'Inter_400Regular', fontSize: 12, textAlign: 'center', marginTop: 20 }]} >Неверный ПИН-код</Text>}
            <View style={{
                bottom: 48,
                position: 'absolute',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('license')}>
                    <Text style={[{ color: '#000', fontFamily: 'Inter_700Bold', fontSize: 14, textAlign: 'center' }, themeSubTextStyle]} >Забыли пароль?</Text>
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
                        <TouchableOpacity onPress={clickBiomentric} style={[styles.btn, themeContainerStyle]} >{biometric && <Ionicons name="finger-print-outline" size={28} color={colorScheme === 'light' ? '#F5CB57' : '#F2F2F3'} />}</TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('0')}><Text style={[styles.num, themeTextStyle]}>0</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, themeContainerStyle]} activeOpacity={0.5} onPress={() => Click('del')}><Ionicons name="backspace-outline" size={28} color={colorScheme === 'light' ? '#F5CB57' : '#F2F2F3'} /></TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PinScreen

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
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-between',
        marginTop: '25%'
    },
    row_circle_second: {
        flexDirection: 'row',
        marginTop: 12,
        width: '30%',
        justifyContent: 'space-between',
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
