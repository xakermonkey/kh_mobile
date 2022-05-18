import { Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const LicenseLuggage = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;


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


    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <StatusBar />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.textContainer}>
                <Text style={[styles.title, themeTextStyle]}>Правила сдачи и хранения багажа</Text>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>1.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Настоящие Правила обработки персональных данных (далее — Правила) имеют своей целью закрепление механизмов обеспечения прав субъекта на сохранение конфиденциальности информации о фактах, событиях и обстоятельствах его жизни, определяют основные требования к порядку сбора, систематизации, накопления, хранения, уточнения (обновления, изменения), использования, распространения (в том числе передачи), блокирования уничтожения (далее — обработки) персональных данных (далее — ПД), а также права и обязанности работников управления энергетики и тарифов Липецкой области (далее Организация) в области обработки их
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>2.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Настоящие Правила обработки персональных данных (далее — Правила) имеют своей целью закрепление механизмов обеспечения прав субъекта на сохранение конфиденциальности информации о фактах, событиях и обстоятельствах его жизни, определяют основные требования к порядку сбора, систематизации, накопления, хранения, уточнения (обновления, изменения), использования, распространения (в том числе передачи), блокирования уничтожения (далее — обработки) персональных данных (далее — ПД), а также права и обязанности работников управления энергетики и тарифов Липецкой области (далее Организация) в области обработки их
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.container_btn} >
                <Button title="Я согласен с правилами" titleStyle={{fontFamily: 'Inter_700Bold',fontSize: 14,color: '#000',}} containerStyle={styles.btn} buttonStyle={styles.innertBtn} onPress={() => navigation.navigate('add_luggage')} />
                <Button title="Отмена" titleStyle={[styles.text_secondary, themeTextStyle]} containerStyle={styles.secondary_btn} buttonStyle={[styles.secondary, themeContainerSelectStyle]}  onPress={() => navigation.back()}/>
            </View>
        </SafeAreaView>
    )
}

export default LicenseLuggage

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontFamily: "Inter_800ExtraBold",
        marginTop: "10%",
        paddingLeft: "5%",
    },
    subtext: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        marginBottom: 26
    },
    textContainer: {
        width: '85%',
        paddingLeft: "5%"
    },
    abzath: {
        flexDirection: 'row',
        marginTop: 8
    },
    numeric: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 22,
        marginRight: 3
    },
    li: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 22
    },
    container_btn: {
        width: "100%",
        position: 'absolute',
        bottom: '5%',
        alignItems: 'center'
    },
    btn: {
        width: '90%',
        borderRadius: 12,
    },
    secondary_btn: {
        marginTop: "2%",
        width: '90%',
        borderRadius: 12,
    },
    secondary:{
        paddingVertical: 14,
    },
    text_secondary:{
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
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
        backgroundColor: "#DFDFE1"
    },
    darkContainerSelect: {
        backgroundColor: "#3C3C42"
    },
})