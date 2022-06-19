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
    const [scrollOpacity, setScrollOpacity] = useState(0);
    const [selectIndex, setSelectIndex] = useState(0);


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
            headerBackVisible: false,
            headerBackTitleVisible: false,
            // headerTitle: () => {
            //     return (<View style={{ alignItems: 'center' }} >
            //         <Text style={[styles.title_header, themeTextStyle]} >{airport}</Text>
            //         <Text style={[styles.subtext, themeSubTextStyle]} >{airport ? "Вы здесь" : "Поиск..."}</Text>
            //     </View>)
            // },
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                        <Image
                            source={colorScheme === 'light' ? require("../assets/images/kh_logo.png") : require("../assets/images/kh_logo_white.png")}
                            style={{
                                width: 100, height: 40
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
                setAirport(airport);
                navigation.setOptions({
                    headerLeft: () => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <TouchableOpacity style={[{ marginRight: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 8 }, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => navigation.navigate('select_airport')} >
                                    <FontAwesome name="location-arrow" size={28} style={{ color: '#F5CB57' }} />
                                    <Text style={[styles.title_header, themeTextStyle]} >{airport}</Text>

                                </TouchableOpacity>
                                {/* 
                            <TouchableOpacity style={{ marginRight: 5 }} activeOpacity={0.5} onPress={() => navigation.navigate('profile')} >
                                <Image
                                    source={colorScheme === 'light' ? require("../assets/images/profile.png") : require("../assets/images/profile_white.png")}
                                    style={{ width: 24, height: 30 }}
                                />
                            </TouchableOpacity> */}
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
                                    {/* 
                                <TouchableOpacity style={{ marginRight: 5 }} activeOpacity={0.5} onPress={() => navigation.navigate('profile')} >
                                    <Image
                                        source={colorScheme === 'light' ? require("../assets/images/profile.png") : require("../assets/images/profile_white.png")}
                                        style={{ width: 24, height: 30 }}
                                    />
                                </TouchableOpacity> */}
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
    const [cards, setCards] = useState([
        { title: "КХ" },
        { title: "КХ ЗВ" },

    ]
    )

    const carouselRef = useRef();

    useEffect(() => {
        if (selectIndex == 0) {
            navigation.setOptions({
                headerLeft: () => {
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <TouchableOpacity style={[{ marginRight: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 8 }, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => navigation.navigate('select_airport')} >
                                <FontAwesome name="location-arrow" size={28} style={{ color: '#F5CB57' }} />
                                <Text style={[styles.title_header, themeTextStyle]} >{airport}</Text>

                            </TouchableOpacity>
                            {/* 
                            <TouchableOpacity style={{ marginRight: 5 }} activeOpacity={0.5} onPress={() => navigation.navigate('profile')} >
                                <Image
                                    source={colorScheme === 'light' ? require("../assets/images/profile.png") : require("../assets/images/profile_white.png")}
                                    style={{ width: 24, height: 30 }}
                                />
                            </TouchableOpacity> */}
                        </View>
                    )
                },
                headerRight: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                            <Image
                                source={colorScheme === 'light' ? require("../assets/images/kh_logo.png") : require("../assets/images/kh_logo_white.png")}
                                style={{
                                    width: 100, height: 40
                                }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )
                }
            })
        } else {
            navigation.setOptions({
                headerLeft: () => {
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <TouchableOpacity style={[{ marginRight: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 8 }, themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => navigation.navigate('select_airport')} >
                                <FontAwesome name="location-arrow" size={28} style={{ color: '#21cfba' }} />
                                <Text style={[styles.title_header, themeTextStyle]} >{airport}</Text>

                            </TouchableOpacity>
                            {/* 
                            <TouchableOpacity style={{ marginRight: 5 }} activeOpacity={0.5} onPress={() => navigation.navigate('profile')} >
                                <Image
                                    source={colorScheme === 'light' ? require("../assets/images/profile.png") : require("../assets/images/profile_white.png")}
                                    style={{ width: 24, height: 30 }}
                                />
                            </TouchableOpacity> */}
                        </View>
                    )
                },
                headerRight: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                            <Image
                                source={colorScheme === 'light' ? require("../assets/images/lost_logo.png") : require("../assets/images/lost_logo_white.png")}
                                style={{
                                    width: 100, height: 40
                                }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )
                }
            })
        }

    }, [navigation, selectIndex]);



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
                    <ImageBackground source={{ uri: 'https://31tv.ru/wp-content/uploads/2020/09/rkyr.jpg' }} style={{ flex: 1 }} imageStyle={{ borderRadius: 16, }}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row', flex: 1, borderRadius: 16 }}>
                            <View style={{ justifyContent: 'flex-end', flex: 1, bottom: 12, left: 12 }}>
                                <Text style={[styles.title, { color: '#F2F2F3' }]}>Терминал {item.terminal}, {item.floor} этаж</Text>
                                <Text style={[styles.terminal_subtext, { color: '#F2F2F3' }]} >{item.location}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start', flex: 1, top: 12, right: 12 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {item.luggage != 0 && <Text style={[styles.subtext, { color: '#F2F2F3' }]} >{item.luggage} заказа</Text>}
                                    <MaterialIcons name="arrow-forward-ios" size={32} color="#F5CB57" />
                                </View>
                                {/* <RadioButtonInput
                                    obj={{}}
                                    index={0}
                                    isSelected={{}}
                                    onPress={{}}
                                    buttonInnerColor='#F5CB57'
                                    buttonOuterColor={colorScheme === 'light' ? '#23232A07' : '#F2F2F31F'}
                                    buttonSize={24}
                                    buttonOuterSize={31}
                                    buttonStyle={{ backgroundColor: colorScheme === 'light' ? '#e8e8e9' : '#F2F2F31F' }}
                                /> */}
                            </View>
                        </View>
                    </ImageBackground>

                </View>


                {/* <View style={styles.terminal_line}>
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
            </View> */}
            </TouchableOpacity>
        )
    }
    const EmptyComponent = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop:'10%' }} >
                <Image style={{ height:200 }}resizeMode="contain" source={colorScheme === 'light' ? require("../assets/images/Lounge.png") : require("../assets/images/Lounge_white.png")} />
                <Text style={[styles.subtext_notfounde, themeTextStyle]} >В Аэропорту {airport} пока нет КХ, подключенных к нашему сервису</Text>
            </View>
        )
    }
    const renderItem = ({ item, index }) => {
        if (index == 0) {
            return (
                <View style={{ alignItems: 'center' }} >
                    <View style={{
                        backgroundColor: '#F5CB57', borderRadius: 16, width: '103%',
                        height: 150, marginBottom: "10%", shadowOffset: {
                            width: 0,
                            height: 6,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={[styles.text_holder, { color: '#000' }]} >Камеры{'\n'}хранения</Text>
                    </View>
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
                    {/* <ScrollView style={{ height: '100%' }}>
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                        <View style={styles.radiobutton_container}>
                            {terminals.map((obj) => {
                                
                            })}
                        </View>
                    </ScrollView> */}
                </View>

            )
        } else if (index == 1) {
            return (
                <View style={{ flex: 1 }} >
                    <View style={{
                        backgroundColor: '#21cfba', borderRadius: 16, width: '103%',
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
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: '9%' }}>
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
            )
        }

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
            <View style={[{ flex: 1}, themeContainerStyle ]} >
                <Loading title={"Подбираем терминал"} />
            </View>
        )
    }

    const newOpacity = (obj) => {
        setScrollOpacity(obj.nativeEvent.contentOffset.x / 312);
        return obj;
    }



    return (
        <View style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <View style={{ alignItems: 'center', marginTop: '3%' }}>
                <Carousel
                    ref={carouselRef}
                    data={cards}
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width * 0.8}
                    onSnapToItem={obj => setSelectIndex(obj)}
                // onScroll={newOpacity}
                /></View>
            {/* <View style={styles.subtitle}><Text style={[styles.subtext, themeSubTextStyle]}></Text></View>
            <ScrollView contentContainerStyle={[styles.container_select, themeContainerSelectStyle]}>
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
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
            </ScrollView> */}
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
        marginTop:'5%',
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