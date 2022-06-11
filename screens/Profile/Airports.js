import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useLayoutEffect, useState, useCallback } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Appearance, useColorScheme, TouchableOpacity, RefreshControl, ImageBackground } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';
import {domain, domain_domain} from "../../domain"
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';

import { StatusBar } from 'expo-status-bar';
import Loading from '../Loading';
import { SearchBar } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';


function Airport({ navigation }) {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [selectAirport, setSelectAirport] = useState(0);
    const [airport, setAirport] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerShadowVisible: false,
            title: "Выбрать аэропорт",
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
        })
        AsyncStorage.getItem("token")
            .then(token => {
                axios.get(domain + "/get_airport", { headers: { "Authorization": "Token " + token } })
                    .then(res => {
                        setAirport(res.data);
                        // AsyncStorage.getItem("close_airport_iata")
                        // .then(iata => {
                        //     if (iata != null){
                        //         setSelectAirport(res.data.filter(obj => obj.iata == iata)[0]);
                        //     }
                        // })
                    })
            });

    }, [navigation])

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(domain + "/get_airport", { headers: { "Authorization": "Token " + token } })
        setAirport(res.data);
        setRefreshing(false);
    }, []);



    const customSelectAirport = async (obj) => {
        setSelectAirport(obj);
        await AsyncStorage.setItem("close_airport_iata", obj.iata);
        await AsyncStorage.setItem("close_airport", obj.name);
        navigation.navigate("terminals");
    }


    if (airport.length == 0) {
        return (
            <View style={{ width: "100%", height: "100%" }} >
                <Loading title={"Загрузка"} />
            </View>
        )
    }

    const filterAirport = (obj) => {
        if (search.length === 0) {
            return true;
        }
        return obj.name.toLowerCase().startsWith(search.toLowerCase());
    }


    return (
        <View style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <SearchBar
                placeholder="Найти аэропорт"
                onChangeText={setSearch}
                value={search}
                containerStyle={{ backgroundColor: null, padding: '3%' }}
                inputContainerStyle={themeContainerSelectStyle}
                platform='ios'
            />
            <ScrollView style={{ height: '100%' }}>
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                <View style={styles.radiobutton_container}>
                    {airport.filter(filterAirport).map((obj) => {
                        return (
                            <TouchableOpacity key={obj.iata} activeOpacity={0.5} onPress={() => customSelectAirport(obj)}>
                                <View style={{
                                    height: 100, marginBottom: "5%", shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4,
                                    elevation: 1,
                                }}>
                                    <ImageBackground source={{ uri: domain_domain + obj.image }} style={{ flex: 1 }} imageStyle={{ borderRadius: 16, }}>
                                        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row', flex: 1, borderRadius: 16 }}>
                                            <View style={{ justifyContent: 'flex-end', flex: 1, bottom: 12, left: 12 }}>
                                                {/* {selectAirport == obj.id && <Text style={[styles.subtext, { color: '#F2F2F3' }]} >Вы здесь</Text>} */}
                                                <Text style={[styles.title, { color: '#F2F2F3' }]}>{obj.name}</Text>
                                            </View>
                                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start', flex: 1, top: 12, right: 12 }}>
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={0}
                                                    isSelected={selectAirport === obj}
                                                    onPress={() => customSelectAirport(obj)}
                                                    buttonInnerColor='#F5CB57'
                                                    buttonOuterColor={colorScheme === 'light' ? '#23232A07' : '#F2F2F31F'}
                                                    buttonSize={24}
                                                    buttonOuterSize={31}
                                                    buttonStyle={{ backgroundColor: colorScheme === 'light' ? '#e8e8e9' : '#F2F2F31F' }}

                                                /></View>
                                        </View>
                                    </ImageBackground>

                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>











            {/* <ScrollView contentContainerStyle={[styles.container_select, themeContainerSelectStyle]}>
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                <View style={styles.holder}>
                    <Text style={[styles.text_holder, themeSubTextStyle]} >Выберите аэропорт</Text>
                </View>
                <View style={styles.radiobutton_container}>
                    <RadioForm
                        formHorizontal={false}
                        animation={true}
                        initial={0}
                    >
                        {airport.map((obj) => {
                            return (<RadioButton labelHorizontal={true} style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: "2%" }} key={obj.iata}>
                                <View style={{}}>
                                    <Text style={[styles.title, themeTextStyle]}>{obj.name}</Text>
                                </View>
                                <View style={styles.selected} >
                                    {selectAirport == obj.id && <Text style={[styles.we_this, themeSubTextStyle]} >Вы здесь</Text>}
                                    <RadioButtonInput
                                        obj={{}}
                                        index={0}
                                        isSelected={selectAirport === obj.iata}
                                        onPress={() => customSelectAirport(obj.iata)}
                                        buttonInnerColor='#F5CB57'
                                        buttonOuterColor={colorScheme === 'light' ? '#23232A07' : '#F2F2F31F'}
                                        buttonSize={24}
                                        buttonOuterSize={31}
                                        buttonStyle={{ backgroundColor: colorScheme === 'light' ? '#e8e8e9' : '#F2F2F31F' }}

                                    />
                                </View>
                            </RadioButton>)
                        })}
                    </RadioForm>
                </View>
            </ScrollView> */}
        </View>
    )
}

export default Airport

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
    },
    container_select: {
        borderRadius: 12,
        padding: "3%",
    },
    text_holder: {
        fontSize: 14,
        fontFamily: "Inter_500Medium",

    },
    title: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold"
    },
    radiobutton_container: {
        width: "100%",
        marginTop: "4%"
    },
    selected: {
        flexDirection: "row",
        alignItems: 'center'
    },
    we_this: {
        fontSize: 12,
        marginRight: 5,
        fontFamily: "Inter_500Medium"
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
