import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect } from 'react'
import { Appearance, useColorScheme, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Text } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'



const LicenseScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTitle: () => {
                return (<View style={{ alignItems: 'center' }} >
                    <Text style={[styles.title, themeTextStyle]}>Персональные данные</Text>
                    <Text style={[styles.subtext, themeSubTextStyle]} >правила обработки</Text>
                </View>)
            }
        })
    })


    useLayoutEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem("token");
            const pin = await AsyncStorage.getItem("pin");
            if (token != null) {
                if (pin != null) {
                    navigation.replace("pin");
                } else {
                    navigation.replace("changepin")
                }
            }
        })();
    })
    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <StatusBar />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.textContainer}>
                <View style={{ alignItems: 'center', marginTop:26 }}>

                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeSubTextStyle]}>1.</Text>
                    <Text style={[styles.li, themeSubTextStyle]}>
                        Настоящие Правила обработки персональных данных (далее — Правила) имеют своей целью закрепление механизмов обеспечения прав субъекта на сохранение конфиденциальности информации о фактах, событиях и обстоятельствах его жизни, определяют основные требования к порядку сбора, систематизации, накопления, хранения, уточнения (обновления, изменения), использования, распространения (в том числе передачи), блокирования уничтожения (далее — обработки) персональных данных (далее — ПД), а также права и обязанности работников управления энергетики и тарифов Липецкой области (далее Организация) в области обработки их
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeSubTextStyle]}>1.</Text>
                    <Text style={[styles.li, themeSubTextStyle]}>
                        Настоящие Правила обработки персональных данных (далее — Правила) имеют своей целью закрепление механизмов обеспечения прав субъекта на сохранение конфиденциальности информации о фактах, событиях и обстоятельствах его жизни, определяют основные требования к порядку сбора, систематизации, накопления, хранения, уточнения (обновления, изменения), использования, распространения (в том числе передачи), блокирования уничтожения (далее — обработки) персональных данных (далее — ПД), а также права и обязанности работников управления энергетики и тарифов Липецкой области (далее Организация) в области обработки их
                    </Text>
                </View>
            </ScrollView>
            {/* <Button title="Я согласен с правилами" titleStyle={{fontFamily: 'Inter_700Bold',fontSize: 14,color: '#000',}} containerStyle={styles.btn} buttonStyle={styles.innertBtn} onPress={() => navigation.navigate('login')} /> */}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        // marginTop:26,
    },
    title: {
        fontSize: 18,
        fontFamily: "Inter_800ExtraBold",
    },
    subtext: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        marginBottom: 26
    },
    textContainer: {
        width: '85%',
    },
    abzath: {
        flexDirection: 'row',
        marginBottom: 8
    },
    numeric: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 22,
        marginRight: 3
    },
    li: {
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        lineHeight: 22
    },
    btn: {
        width: '90%',
        borderRadius: 12,
    },
    innertBtn: {
        backgroundColor: '#F5CB57',
        paddingVertical: 14
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

export default LicenseScreen
