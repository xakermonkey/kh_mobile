import { StyleSheet, Text, View, TouchableOpacity, Appearance, Image, useColorScheme } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { domain } from '../domain';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectTerminal = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [terminals, setTerminals] = useState([]);
    const [airport, setAirport] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackVisible: false,
            headerBackTitleVisible: false,
            headerTitle: () => {
                return (<View style={{ alignItems: 'center' }} >
                    <Text style={[styles.title_header, themeTextStyle]} >{airport}</Text>
                    <Text style={[styles.subtext, themeSubTextStyle]} >Вы здесь</Text>
                </View>)
            },
            headerRight: () => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TouchableOpacity style={{ marginRight: 5 }} activeOpacity={0.5} onPress={() => navigation.navigate('profile')} >
                            <Image
                                source={require("../assets/images/profile.png")}
                                style={{ width: 24, height: 30 }}
                            />
                        </TouchableOpacity>
                    </View>)
            }
        });
        (async () => {
            setAirport(await AsyncStorage.getItem("airport"));
            const iata = await AsyncStorage.getItem("airport_iata");
            const token = await AsyncStorage.getItem('token');
            const res = await axios.get(domain + "/get_terminals", { params: { "iata": iata }, headers: { "Authorization": "Token " + token } })
            setTerminals(res.data)
        })();
    }, [navigation, colorScheme, airport])



    const customSelectTerinal = async (item) => {
        await AsyncStorage.setItem("terminal_id", item.id.toString());
        await AsyncStorage.setItem("terminal", `Терминал ${item.terminal}, ${item.floor} этаж`);
        if (item.luggage == 0) {
            navigation.navigate('terminal');
        } else {
            navigation.navigate("orders");
        }

    }



    return (
        <View style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <View style={styles.subtitle}><Text style={[styles.subtext, themeSubTextStyle]}></Text></View>
            <View style={[styles.container_select, themeContainerSelectStyle]}>
                <View><Text style={[styles.text_holder, themeTextStyle]} >Камеры хранения</Text></View>
                <View style={styles.radiobutton_container}>
                    {terminals.map((obj) => {
                        return (
                            <TouchableOpacity key={obj.id} activeOpacity={0.5} onPress={() => customSelectTerinal(obj)} >
                                <View style={styles.terminal_line}>
                                    <View style={styles.name_terminal}>
                                        <Text style={[styles.title, themeTextStyle]} >Терминал {obj.terminal}, {obj.floor} этаж</Text>
                                        <Text style={[styles.subtext, themeSubTextStyle]} >{obj.location}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {obj.luggage != 0 && <Text style={[styles.subtext, themeSubTextStyle]} >{obj.luggage} заказа</Text>}
                                        <Icon
                                            name="chevron-forward-outline"
                                            type="ionicon"
                                            color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </View >
    )
}

export default SelectTerminal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
    },
    container_select: {
        borderRadius: 12,
        padding: "4%",
    },
    text_holder: {
        fontSize: 14,
        fontFamily: "Inter_500Medium",
    },
    title: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold"
    },
    title_header: {
        fontSize: 16,
        fontFamily: "Inter_800ExtraBold"
    },
    subtext: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold"
    },
    radiobutton_container: {
    },
    terminal_line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '4%'
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