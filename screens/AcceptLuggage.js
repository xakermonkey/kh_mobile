import { Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const AcceptLuggage = ({ navigation }) => {
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
        <SafeAreaView style={[styles.container, themeContainerStyle]}  >
            <StatusBar/>
            <View style={[styles.container_price, themeContainerSelectStyle]} >
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeTextStyle]} >Хранение багажа</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >500 ₽</Text>
                </View>
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeTextStyle]} >Списание миль</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >-250 миль</Text>
                </View>
                <View style={[styles.line, themeContainerStyle]} ></View>
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeTextStyle]} >Итоговая стоимость</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >250 ₽</Text>
                </View>
            </View>
            <View style={styles.type_pay} >
                <View style={{flexDirection: 'row', alignItems: 'center'}} >
                    <Image
                    source={require("../assets/images/visa.png")}
                    width={50}
                    height={50}
                    style={styles.card_img}
                    />
                    <View style={{ marginLeft: '5%'}} >
                        <Text style={[styles.text_type, themeTextStyle]} >Способ оплаты</Text>
                        <Text style={[styles.subtext, themeSubTextStyle]} >Visa **** 1679</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}} >
                    <Text style={[styles.subtext, themeSubTextStyle]} >Изменить</Text>
                    <Icon
                        name="chevron-forward-outline"
                        type="ionicon"
                        color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                        />
                </View>
            </View>
            <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={() => navigation.navigate('qr_code')} >
                <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Перейти к оплате</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AcceptLuggage

const styles = StyleSheet.create({
    title: {
        // color: "#0C0C0D",
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center'
    },
    subtext: {
        // color: "#0C0C0D7A",
    },
    container: {
        // backgroundColor: "#F9F9FA",
        flex: 1,
        width: "100%",
        alignItems: "center"
    },
    container_price: {
        width: "85%",
        borderRadius: 12,
        marginTop: "50%",
        // backgroundColor: "#23232A14"
    },
    price_line: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: "7%",
        alignItems: 'center'
    },
    line: {
        // backgroundColor: "#F9F9FA",
        width: "100%",
        height: 2
    },
    price_line_text: {
        // color: "#0C0C0D",
        fontSize: 16,
        fontFamily: "Inter_400Regular"
    },
    price_line_price: {
        // color: "#0C0C0D",
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold"
    },
    btn: {
        position: 'absolute',
        backgroundColor: '#F5CB57',
        width: '90%',
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
        bottom: "5%",
        elevation: 12,
    },
    type_pay: {
        flexDirection: 'row',
        width: "85%",
        justifyContent: 'space-between',
        marginTop: "50%"
    },
    card_img: {
        width: 50,
        height: 50,
        // backgroundColor: "#fff",
        borderRadius: 50
    },
    text_type: {
        // color: "#0C0C0D",
        fontFamily: "Inter_700Bold",
        fontSize: 16
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