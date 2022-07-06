import { StyleSheet, Text, View, TouchableOpacity, Appearance, Image, useColorScheme, RefreshControl, Dimensions, ImageBackground } from 'react-native'
import React, { useLayoutEffect, useState, useCallback, useRef, useEffect } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { domain } from '../domain';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Loading from './Loading';
import { LinearGradient } from 'expo-linear-gradient';

const SearchLostItems = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [terminals, setTerminals] = useState(null);
    const [airport, setAirport] = useState(null);
    const [iata, setIATA] = useState(null);


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
        await AsyncStorage.setItem("airport", air.name);
        return air;
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            // headerBackVisible: false,
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                        <Image
                            source={colorScheme === 'light' ? require("../assets/images/profile_turquoise.png") : require("../assets/images/profile_turquoise_white.png")}
                            style={{
                                width: 35, height: 35,
                            }}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )
            }
        });
        // (async () => {
        //     const airport_iata = await AsyncStorage.getItem("airport_iata");
        //     const token = await AsyncStorage.getItem('token');
        //     if (airport_iata != null) {
        //         setIATA(airport_iata);
        //         const airport = await AsyncStorage.getItem("airport");
        //         setAirport(airport);
        //         navigation.setOptions({
        //             headerLeft: () => {
        //                 return (
        //                     <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        //                         <TouchableOpacity style={[{ marginRight: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 8 }, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => navigation.navigate('select_airport')} >
        //                             <FontAwesome name="location-arrow" size={28} style={{ color: '#F5CB57' }} />
        //                             <Text style={[styles.title_header, themeTextStyle]} >{airport}</Text>
        //                         </TouchableOpacity>
        //                     </View>
        //                 )
        //             }
        //         })
        //         const res = await axios.get(domain + "/get_terminals", { params: { "iata": airport_iata }, headers: { "Authorization": "Token " + token } })
        //         setTerminals(res.data)
        //     } else {
        //         let { status } = await Location.requestForegroundPermissionsAsync();
        //         if (status !== 'granted') {
        //             navigation.navigate('select_airport');
        //             return;
        //         }
        //         let location = await Location.getLastKnownPositionAsync({});
        //         if (location == null) {
        //             navigation.navigate('select_airport');
        //         } else {
        //             const res = await axios.get(domain + "/get_airport", { headers: { "Authorization": "Token " + token } })
        //             const air = await getAirport(location, res.data);
        //             setAirport(air.name);
        //             navigation.setOptions({
        //                 headerLeft: () => {
        //                     return (
        //                         <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        //                             <TouchableOpacity style={[{ marginRight: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 8 }, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => navigation.navigate('select_airport')} >
        //                                 <FontAwesome name="location-arrow" size={28} style={{ color: '#F5CB57' }} />
        //                                 <Text style={[styles.title_header, themeTextStyle]} >{air.name}</Text>
        //                             </TouchableOpacity>
        //                         </View>
        //                     )
        //                 }
        //             })
        //             const term = await axios.get(domain + "/get_terminals", { params: { "iata": air.iata }, headers: { "Authorization": "Token " + token } })
        //             setTerminals(term.data);
        //         }
        //     }
        // })();
    }, [navigation, colorScheme])

    // if (airport == null) {
    //     return (
    //         <View style={[{ flex: 1 }, themeContainerStyle]} >
    //             <Loading title={"Ищем где Вы"} />
    //         </View>
    //     )
    // }
    // if (terminals == null) {
    //     return (
    //         <View style={[{ flex: 1 }, themeContainerStyle]} >
    //             <Loading title={"Подбираем терминал"} />
    //         </View>
    //     )
    // }

    return (
        <View style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <View style={{ flex: 1, }} >
                    {/* <View style={{
                        backgroundColor: '#21cfba', borderRadius: 16,
                        height: 150, shadowOffset: {
                            width: 0,
                            height: 6,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={[styles.text_holder, { color: '#000' }]} >Поиск забытых и потерянных вещей</Text>
                    </View> */}
                    <View style={{ flex: 1, paddingHorizontal: '5%' }}>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text style={[styles.subtext, themeSubTextStyle, {}]} >Если Вы забыли или потеряли личные вещи или багаж в аэропорту мы поможем Вам их найти </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={() => navigation.navigate('where_forget')} >
                                <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>НАЧАТЬ ПОИСК</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </View >
    )
}

export default SearchLostItems

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