import { Appearance, useColorScheme, StyleSheet, Text, View, Platform, Image, FlatList } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { SearchBar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { domain, domain_domain } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectCountryCode = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerShadowVisible: false,
            title: "Вход",
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerTitle: () => {
                return (<View style={{ alignItems: 'center' }} >
                    <Text style={[styles.header, themeTextStyle]} >Вход</Text>
                    <Text style={[styles.subtext, themeSubTextStyle]} >выберите страну</Text>
                </View>)
            }
        })
        axios.get(domain + "/get_code_city").then((res) => setCity(res.data));
        (async () => {
            // await AsyncStorage.removeItem("token");
            // await AsyncStorage.removeItem("pin");
            // await AsyncStorage.removeItem("airport");
            // await AsyncStorage.removeItem("airport_iata");
            // await AsyncStorage.removeItem("first_join");
            // await AsyncStorage.removeItem("first_name");
            // await AsyncStorage.removeItem("last_name");
            // await AsyncStorage.removeItem("patronymic");
            // await AsyncStorage.removeItem("type_doc");
            // await AsyncStorage.removeItem("avatar");
            // await AsyncStorage.removeItem("number_doc");
            // await AsyncStorage.removeItem("how_get");
            // await AsyncStorage.removeItem("date_get");
            // await AsyncStorage.removeItem("birthday");
            const pin = await AsyncStorage.getItem("pin");
            const token = await AsyncStorage.getItem("token");
            if (token != null && pin != null){
                navigation.replace("pin");
            }
            if (token != null && pin == null){
                navigation.replace("changepin")
            }
        })();
    }, [navigation])


    const renderItem = ({item}) => {
        return (
            <View>
                <View style={[styles.container_select]}>
                    <View style={styles.radiobutton_container}>
                        <RadioForm
                            formHorizontal={false}
                            animation={true}
                            initial={0}
                        >
                            <RadioButton labelHorizontal={true} style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: "2%" }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={{uri: domain_domain + item.flag}} width={30} height={30} style={{ marginRight: 10, width: 30, height: 30 }} />
                                    <Text style={[styles.title, themeTextStyle]}>{item.city}</Text>
                                    <Text style={[styles.title, themeSubTextStyle]}>{item.code}</Text>
                                </View>
                                <View style={styles.selected} >
                                    <RadioButtonInput
                                        obj={{}}
                                        index={0}
                                        // isSelected={selectAirport === obj.id}
                                        onPress={() => navigation.navigate('login', {'code': item.code})}
                                        buttonInnerColor='#F5CB57'
                                        buttonOuterColor={colorScheme === 'light' ? '#e8e8e9' : '#F2F2F31F'}
                                        buttonSize={24}
                                        buttonOuterSize={31}
                                        buttonStyle={{ backgroundColor: colorScheme === 'light' ? '#e8e8e9' : '#F2F2F31F' }}

                                    />
                                </View>
                            </RadioButton>
                        </RadioForm>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={{ width: '83%', height: 1, backgroundColor: "#0C0C0D1F" }}></View>
                </View>
            </View>
        )
    }

    const EmptyComponent = () => {
        return(
            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                <Image style={{ width: "50%" }}resizeMode="contain" source={require("../assets/images/Lounge.png")} />
                <Text style={styles.subtext} >Ничего не найдено</Text>
            </View>
        )
    }


    const [search, setSearch] = useState("");
    const [city, setCity] = useState([]);


    const FilterData = (obj) => {
        if (search.length === 0) {
            return true;
        }
        return obj.city.toLowerCase().startsWith(search.toLowerCase());
    }



    return (

        <View style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <SearchBar
                placeholder="Найти страну"
                onChangeText={setSearch}
                value={search}
                containerStyle={{ backgroundColor: null, padding: '3%' }}
                inputContainerStyle={{ backgroundColor: "#E8E8E9" }}
                platform='ios'
            />
            <FlatList
                data={city.filter(FilterData)}
                keyExtractor={(item) => item.code}
                renderItem={renderItem}
                ListEmptyComponent={<EmptyComponent />}
            />
        </View>
    )
}

export default SelectCountryCode

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: '3%',
    },
    container_select: {
        // borderRadius: 12,
        paddingHorizontal: "5%",
        paddingVertical: '2%',
        borderTopWidth: 1,
        borderTopColor: '#0C0C0D1F',
    },
    text_holder: {
        fontSize: 14,
        fontFamily: "Inter_500Medium",

    },
    subtext: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",

    },
    header: {
        fontSize: 16,
        fontFamily: "Inter_800ExtraBold",

    },
    title: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        marginLeft: '5%',
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