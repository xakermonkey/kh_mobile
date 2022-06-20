import { StyleSheet, Text, View, TouchableOpacity, Appearance, useColorScheme, Image, ScrollView, ImageBackground, RefreshControl, FlatList } from 'react-native'
import React, { useLayoutEffect, useState, useCallback } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { domain, domain_domain } from '../../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Terminals = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [terminals, setTerminals] = useState([]);
    // const [airport, setAirport] = useState("");
    const [refreshing, setRefresing] = useState(false);
    const [airport, setAirport] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            // headerBackVisible: false,
            headerBackTitleVisible: false,
            // headerRight: () => {
            //     return (
            //         <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            //             <TouchableOpacity style={{ marginRight: 5 }} activeOpacity={0.5} onPress={() => navigation.navigate('profile')} >
            //                 <Image
            //                     source={require("../../assets/images/profile.png")}
            //                     style={{ width: 24, height: 30 }}
            //                 />
            //             </TouchableOpacity>
            //         </View>)
            // }
        });
        (async () => {
            const airport = await AsyncStorage.getItem("close_airport");
            navigation.setOptions({
                headerTitle: () => {
                    return (<View style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={[styles.title_header, themeTextStyle]} >{airport}</Text>
                        {/* <Text style={[styles.subtext, themeSubTextStyle]} >Вы здесь</Text> */}
                    </View>)
                }
            })
            const token = await AsyncStorage.getItem("token");
            const iata = await AsyncStorage.getItem("close_airport_iata");
            setAirport(await AsyncStorage.getItem("close_airport"));
            const res = await axios.get(domain + "/get_closed_termianls", {
                params: {
                    iata: iata
                },
                headers: {
                    "Authorization": "Token " + token
                }
            });
            setTerminals(res.data);
        })();
    }, [navigation, colorScheme])



    const onRefresh = useCallback(async () => {
        setRefresing(true);
        const token = await AsyncStorage.getItem("token");
        const iata = await AsyncStorage.getItem("close_airport_iata");
        const res = await axios.get(domain + "/get_closed_termianls", { params: { "iata": iata }, headers: { "Authorization": "Token " + token } })
        setTerminals(res.data);
        setRefresing(false);
    }, []);



    const customSelectTerinal = async (item) => {
        await AsyncStorage.setItem("close_terminal", item.id.toString());
        await AsyncStorage.setItem("close_terminal_name", `Терминал ${item.terminal}, ${item.floor} этаж`);
        navigation.navigate("closed_orders");
    }
    const EmptyComponent = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop:'10%' }} >
                <Image style={{ height:200 }}resizeMode="contain" source={colorScheme === 'light' ? require("../../assets/images/Lounge.png") : require("../../assets/images/Lounge_white.png")} />
                <Text style={[styles.subtext_notfounde, themeTextStyle]} >Закрытых заказов нет</Text>
            </View>
        )
    }


    const itemTerminal = ({ item }) => {
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
                            </View>
                        </View>
                    </ImageBackground>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <View style={{
                backgroundColor: '#F5CB57', borderRadius: 16,
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
                renderItem={itemTerminal}
                ListEmptyComponent={<EmptyComponent />}
            />
        </View >
    )
}

export default Terminals

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop:'3%',
        paddingHorizontal: '10%',
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
        fontSize: 16,
        fontFamily: "Inter_800ExtraBold"
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
    subtext_notfounde: {
        marginTop:'5%',
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
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