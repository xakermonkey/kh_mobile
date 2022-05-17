import { Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Switch, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const AcceptLuggageMileonAir = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [isEnabled, setIsEnabled] = useState(false);
    const [mile, setMile] = useState("")


    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
    }

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
        <View style={[styles.container, themeContainerStyle]}  >
            <StatusBar />
            <View style={[styles.container_price, themeContainerSelectStyle]} >
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeSubTextStyle]} >Хранение багажа</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >500 ₽</Text>
                </View>
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeSubTextStyle]} >Списание миль</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >-250 миль</Text>
                </View>
                <View style={[styles.line, themeContainerStyle]} ></View>
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeSubTextStyle]} >Итоговая стоимость</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >250 ₽</Text>
                </View>
            </View>

            <View style={{ height: 150, width: '100%', marginTop: '20%' }}>
                <View style={styles.container_mileonair} >
                    <View  >
                        <Text style={[styles.value, themeTextStyle]} >Оплатить милями MILEONAIR</Text>
                        <Text style={[styles.label_mile, themeSubTextStyle]} >3 600 миль</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#23232A14", true: "#23232A14" }}
                        thumbColor={isEnabled ? "#F5CB57" : "#F2F2F3"}
                        ios_backgroundColor="#23232A14"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                {isEnabled &&
                    <View style={[{ borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }, themeContainerSelectStyle]}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignItems: 'center', alignContent: 'center', paddingHorizontal: 20, paddingVertical: 6 }}>
                                <Icon
                                    name="airplane"
                                    type="ionicon"
                                    color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                />
                                <Text style={themeSubTextStyle} >миль</Text>
                            </View>
                            <View style={[{ width: 2 }, themeContainerStyle]}></View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingHorizontal: 20 }}>
                            <TextInput
                                value={mile}
                                placeholder="40"
                                style={[styles.text_input, themeTextStyle]}
                                keyboardType="number-pad"
                            />
                            <Text style={[{ textAlign: 'right', fontSize: 12, fontFamily: "Inter_400Regular" }, themeSubTextStyle]} >Мининимальное {"\n"}списание 40 миль</Text>
                        </View>
                    </View>
                }
            </View>


            <View style={styles.type_pay} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Image
                        source={require("../assets/images/visa.png")}
                        width={50}
                        height={50}
                        style={styles.card_img}
                    />
                    <View style={{ marginLeft: '5%' }} >
                        <Text style={[styles.text_type, themeTextStyle]} >Способ оплаты</Text>
                        <Text style={[styles.subtext, themeSubTextStyle]} >Visa **** 1679</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Text style={[styles.subtext, themeSubTextStyle]} >Изменить</Text>
                    <Icon
                        name="chevron-forward-outline"
                        type="ionicon"
                        color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                    />
                </View>
            </View>




            <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={() => navigation.navigate('accept_luggage')} >
                <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Оплатить</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AcceptLuggageMileonAir

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
        padding: '4%',
        // width: "100%",
        alignItems: "center"
    },
    container_price: {
        width: "100%",
        borderRadius: 12,
        marginTop: "20%",
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
        // width: "100%",
        height: 2
    },
    text_input: {
        fontSize: 32,
        fontFamily: 'Inter_800ExtraBold',
        // color: "#0C0C0D7A",
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
        width: '100%',
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
        width: "100%",
        justifyContent: 'space-between',
        marginTop: "20%"
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
        fontSize: 16,
    },
    container_mileonair: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    value: {
        // color: "#0C0C0D",
        fontSize: 14,
        fontFamily: "Inter_500Medium"
    },
    label_mile: {
        // color: "#0C0C0D7A",
        marginTop: "1%"
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