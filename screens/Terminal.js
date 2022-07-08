import { Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain, domain_domain } from '../domain';

const Terminal = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const dateAlert = async () => {
        // const full_doc = await AsyncStorage.getItem("full_document");
        // const last_name = await AsyncStorage.getItem("last_name");
        // const first_name = await AsyncStorage.getItem("first_name");
        // const patronymic = await AsyncStorage.getItem("patronymic");
        // const birthday = await AsyncStorage.getItem("birthday");
        // const how_get = await AsyncStorage.getItem("how_get");
        // const date_get = await AsyncStorage.getItem("date_get");
        // const type_doc = await AsyncStorage.getItem("type_doc");
        // const photo = await AsyncStorage.getItem("avatar");
        // let text = "При сдаче багажа необходимо подтверждение личности. Вы можете ускорить процесс оформления, заполнив данные самостоятельно:\n";
        // text += last_name == null ? "Фамилия\n" : ""
        // text += first_name == null ? "Имя\n" : ""
        // text += patronymic == null ? "Отчество\n" : ""
        // text += birthday == null ?  "Дата рождения\n" : ""
        // text +=how_get == null ? "Кем выдан\n" : ""
        // text +=date_get == null ? "Дата выдачи\n" : ""
        // text +=type_doc == null ? "Тип документа\n" : ""
        // text +=photo == null ? "Фотография" : ""
        // // console.log(text);
        // if (full_doc == null) {
        //     Alert.alert(
        //         "Заполнить данные о себе",
        //         text,
        //         [
        //             {
        //                 text: "Заполнить",
        //                 onPress: () => {
        //                     navigation.navigate('last_name');
        //                 },
        //                 style: "cancel"
        //             },
        //             { text: "Пропустить", onPress: () => navigation.navigate('license_luggage') }
        //         ]
        //     );
        //     return 0;
        // }else{
            navigation.navigate('license_luggage');
            return 0;
        // }

    }

    const [title, setTitle] = useState("");
    const [terminal, setTerminal] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                        <Image
                            source={colorScheme === 'light' ? require("../assets/images/profile.png") : require("../assets/images/profile_white.png")}
                            style={{
                                width: 35, height: 35,
                            }}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )
            }
        }),
            (async () => {
                const airport = await AsyncStorage.getItem("airport");
                const title = await AsyncStorage.getItem("terminal");
                setTitle(title);
                navigation.setOptions({
                    headerTitle: () => {
                    return (<View style={{ alignItems: 'center' }} >
                        <Text style={[styles.title, themeTextStyle]} >{title}</Text>
                        <Text style={[styles.subtext, themeSubTextStyle]} >{airport}</Text>
                    </View>)
                }})
                const id = await AsyncStorage.getItem("terminal_id")
                const token = await AsyncStorage.getItem("token");
                const res = await axios.get(domain + `/get_terminal/${id}`, { headers: { "Authorization": "Token " + token } });
                // console.warn(res.data);
                setTerminal(res.data);

            })();
    }, [navigation])


    if (terminal == null) {
        return (<View>
            <ActivityIndicator />
        </View>)
    }


    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <View style={[styles.container_price, themeContainerSelectStyle]} >
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeTextStyle]} >Хранение багажа</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >{terminal.price_storage} ₽</Text>
                </View>
                <View style={[styles.line, themeContainerStyle]} ></View>
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeTextStyle]} >Продление хранения</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >{terminal.extension_storage} ₽</Text>
                </View>
            </View>
            <View style={[styles.container_location, themeContainerSelectStyle]}>
                <Text style={[styles.subtext, themeSubTextStyle]} >Местоположение</Text>
                <Text style={[styles.title, { marginTop: "3%" }, themeTextStyle]} >{title}.{"\n"}{terminal.location}</Text>
                <Image
                    source={{ "uri": domain_domain + terminal.image }}
                    style={styles.map}
                    width="100%"
                    height={240}
                />
            </View>
            <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={dateAlert} >
                <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Сдать багаж</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Terminal

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center'
    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    container_price: {
        width: "85%",
        borderRadius: 12,
        marginTop: "4%",
    },
    price_line: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: "7%",
        alignItems: 'center'
    },
    line: {
        width: "100%",
        height: 2
    },
    price_line_text: {
        color: "#0C0C0D",
        fontSize: 16,
        fontFamily: "Inter_400Regular"
    },
    price_line_price: {
        fontSize: 20,
        fontFamily: "Inter_600SemiBold"
    },
    container_location: {
        width: "98%",
        borderRadius: 12,
        marginTop: "4%",
        alignItems: 'center',
        padding: "4%",
    },
    map: {
        // marginTop: "%",
        borderRadius: 12
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