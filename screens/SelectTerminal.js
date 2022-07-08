import { StyleSheet, Text, View, TouchableOpacity, Appearance, Image, useColorScheme, RefreshControl, Dimensions, ImageBackground } from 'react-native'
import React, { useLayoutEffect, useState, useCallback, useRef, useEffect } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { domain, domain_domain } from '../domain';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Loading from './Loading';
import { LinearGradient } from 'expo-linear-gradient';
import { nameOrders } from '../morf';

const SelectTerminal = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [terminals, setTerminals] = useState(null);
    const [airport, setAirport] = useState(null);
    const [iata, setIATA] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [airportPhoto, setAirportPhoto] = useState(null);


    const getAirport = async (location, airorts) => {
        let min_length = 10000;
        let air = null;
        for (let i = 0; i < airorts.length; i++) {
            if (Math.sqrt(Math.pow(location.coords.latitude - airorts[i].lat, 2) + Math.pow(location.coords.longitude - airorts[i].lon, 2)) < min_length) {
                air = airorts[i];
                min_length = Math.sqrt(Math.pow(location.coords.latitude - airorts[i].lat, 2) + Math.pow(location.coords.longitude - airorts[i].lon, 2));
            }
        }
        setIATA(iata);
        setAirportPhoto(air.image);
        await AsyncStorage.setItem("airport", air.name);
        await AsyncStorage.setItem("airport_photo", air.image);
        return air;
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackVisible: false,
            headerBackTitleVisible: false,
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
        });
        (async () => {
            const airport_iata = await AsyncStorage.getItem("airport_iata");
            const token = await AsyncStorage.getItem('token');
            if (airport_iata != null) {
                setIATA(airport_iata);
                const airport = await AsyncStorage.getItem("airport");
                const air_photo = await AsyncStorage.getItem("airport_photo");
                setAirportPhoto(air_photo);
                setAirport(airport);
                navigation.setOptions({
                    headerLeft: () => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <TouchableOpacity style={[{ marginRight: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 8 }, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => navigation.navigate('select_airport')} >
                                    <FontAwesome name="location-arrow" size={28} style={{ color: '#F5CB57' }} />
                                    <Text style={[styles.title_header, themeTextStyle]} >{airport}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })
                const res = await axios.get(domain + "/get_terminals", { params: { "iata": airport_iata }, headers: { "Authorization": "Token " + token } })
                console.log(res.data);
                setTerminals(res.data)
            } else {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    navigation.navigate('select_airport');
                    return;
                }
                let location = await Location.getLastKnownPositionAsync({});
                if (location == null) {
                    navigation.navigate('select_airport');
                } else {
                    const res = await axios.get(domain + "/get_airport", { headers: { "Authorization": "Token " + token } })
                    const air = await getAirport(location, res.data);
                    setAirport(air.name);
                    navigation.setOptions({
                        headerLeft: () => {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <TouchableOpacity style={[{ marginRight: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 8 }, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => navigation.navigate('select_airport')} >
                                        <FontAwesome name="location-arrow" size={28} style={{ color: '#F5CB57' }} />
                                        <Text style={[styles.title_header, themeTextStyle]} >{air.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    })
                    const term = await axios.get(domain + "/get_terminals", { params: { "iata": air.iata }, headers: { "Authorization": "Token " + token } })
                    setTerminals(term.data);
                }
            }
        })();
    }, [navigation, colorScheme])


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(domain + "/get_terminals", { params: { "iata": iata }, headers: { "Authorization": "Token " + token } })
        setTerminals(res.data);
        setRefreshing(false);
    }, []);



    const customSelectTerinal = async (item) => {
        await AsyncStorage.setItem("terminal_id", item.id.toString());
        await AsyncStorage.setItem("terminal", `Терминал ${item.terminal}, ${item.floor} этаж`);
        if (item.luggage == 0) {
            navigation.navigate('terminal');
        } else {
            navigation.navigate("orders");
        }

    }



    const renderTerminals = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => customSelectTerinal(item)}>
                <View style={{
                    height: 100, marginBottom: "5%", shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 1,
                }}>
                    <ImageBackground source={{ uri: domain_domain + airportPhoto }} style={{ flex: 1 }} imageStyle={{ borderRadius: 16, }}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row', flex: 1, borderRadius: 16 }}>
                            <View style={{ justifyContent: 'flex-end', flex: 1, bottom: 12, left: 12 }}>
                                <Text style={[styles.title, { color: '#F2F2F3' }]}>Терминал {item.terminal}, {item.floor} этаж</Text>
                                <Text style={[styles.terminal_subtext, { color: '#F2F2F3' }]} >{item.location}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start', flex: 1, top: 12, right: 12 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {item.luggage != 0 && <Text style={[styles.subtext, { color: '#F2F2F3' }]} >{item.luggage} {nameOrders(parseInt(item.luggage))}</Text>}
                                    <MaterialIcons name="arrow-forward-ios" size={32} color="#F5CB57" />
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        )
    }
    const EmptyComponent = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }} >
                <Image style={{ height: 200 }} resizeMode="contain" source={colorScheme === 'light' ? require("../assets/images/Lounge.png") : require("../assets/images/Lounge_white.png")} />
                <Text style={[styles.subtext_notfounde, themeTextStyle]} >В Аэропорту {airport} пока нет КХ, подключенных к нашему сервису</Text>
            </View>
        )
    }

    if (airport == null) {
        return (
            <View style={[{ flex: 1 }, themeContainerStyle]} >
                <Loading title={"Ищем где Вы"} />
            </View>
        )
    }
    if (terminals == null) {
        return (
            <View style={[{ flex: 1 }, themeContainerStyle]} >
                <Loading title={"Подбираем терминал"} />
            </View>
        )
    }




    return (
        <View style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <TouchableOpacity style={[{  flexDirection: 'row', alignItems: 'center' }, ]} activeOpacity={0.5} onPress={() => navigation.goBack()} >
                <Entypo name="chevron-small-left" size={28} color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'} />
                <Text style={[styles.title_header, themeTextStyle]} >Вернуться назад</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', marginTop: '3%' }}>
                <View style={{ alignItems: 'center', width: "100%" }} >
                    <FlatList
                        contentContainerStyle={{ height: "100%" }}
                        style={{ width: '100%', paddingHorizontal: '9%' }}
                        data={terminals}
                        keyExtractor={item => item.id}
                        renderItem={renderTerminals}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<EmptyComponent />}
                    />
                </View>
            </View>
        </View >
    )
}

export default SelectTerminal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: '3%',
    },
    container_select: {
        borderRadius: 16,
        padding: "4%",
        flex: 1
    },
    text_holder: {
        fontSize: 26,
        fontFamily: "Inter_700Bold",
        textAlign: 'center',
        // marginBottom: '5%'
    },
    title: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold"
    },
    title_header: {
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        marginLeft: 10
    },
    terminal_subtext: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
        // textAlign: 'center'
    },
    subtext: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
        // padding:'10%'
    },
    subtext_notfounde: {
        marginTop: '5%',
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
        // padding:'10%'
    },
    radiobutton_container: {
    },
    terminal_line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '4%',
        // flex: 1,
    },
    btn: {
        // flex:1,
        marginBottom: '8%',
        backgroundColor: '#21cfba',
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