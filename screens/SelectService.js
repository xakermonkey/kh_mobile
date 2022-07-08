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
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Loading from './Loading';
import { LinearGradient } from 'expo-linear-gradient';

const SelectService = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [airport, setAirport] = useState(null);
    const [iata, setIATA] = useState(null);
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
                const airport_photo = await AsyncStorage.getItem("airport_photo");
                setAirportPhoto(airport_photo)
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

    if (airport == null) {
        return (
            <View style={[{ flex: 1 }, themeContainerStyle]} >
                <Loading title={"Ищем где Вы"} />
            </View>
        )
    }
    return (
        <View style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <ImageBackground source={{ uri: domain_domain + airportPhoto }} style={{ width: '100%', height: '50%', marginTop: 20 }} resizeMode='stretch' imageStyle={{}}>
                <LinearGradient
                    colors={ colorScheme === 'light' ? ['rgba(242, 242, 250, 0)', 'rgba(242, 242, 250, 1)'] : ['rgba(23, 23, 28, 0)', 'rgba(23, 23, 28, 1)']}
                    style={{ width: '100%', height: '50%' }}
                >
                </LinearGradient>
            </ImageBackground>
            <View style={{ paddingHorizontal: '7%', top: '-35%', width:'100%' }}>
                <TouchableOpacity activeOpacity={0.9} style={[styles.btn, {backgroundColor: '#F5CB57'}]} onPress={() => navigation.navigate('select_terminal', { "title": airport })}>
                    <Image
                        source={colorScheme === 'light' ? require("../assets/images/kh_icon.png") : require("../assets/images/kh_icon.png")}
                        style={{
                            width:'20%', height:'50%',
                            borderRadius: 16,
                        }}
                        resizeMode='contain'
                    />
                    <Text style={[styles.text_holder, { color: '#000' }]} >Камеры хранения</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={() => 
                    navigation.navigate('search_lost_tems')
                    }>
                    <Image
                        source={colorScheme === 'light' ? require("../assets/images/find_icon.png") : require("../assets/images/find_icon.png")}
                        style={{
                            width:'20%', height:'50%',
                            borderRadius: 16
                        }}
                        resizeMode='contain'
                    />
                    <Text style={[styles.text_holder, { color: '#000' }]} >Поиск потерянных{'\n'}вещей</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default SelectService

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
        fontSize: 24,
        fontFamily: "Inter_700Bold",
        width:'80%'
        // textAlign: 'center',
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
        backgroundColor: '#21cfba', borderRadius: 16, shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:'5%',
        height: 92,
        justifyContent:'space-between',
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