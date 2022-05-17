import { Appearance, useColorScheme, StyleSheet, Text, View, Platform, Image } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { SearchBar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { domain } from '../domain';

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
                return(<View style={{ alignItems: 'center'}} >
                            <Text style={[styles.header, themeTextStyle]} >Вход</Text>
                            <Text style={[styles.subtext, themeSubTextStyle]} >выберите страну</Text>
                        </View>)
            },
        })
    }, [navigation])


    const [search, setSearch] = useState("");
    const [city, setCity] = useState([]);



    return (

        <View style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <SearchBar
                placeholder="Найти страну"
                onChangeText={setSearch}
                value={search}
                containerStyle={{ backgroundColor: null, padding:'3%' }}
                inputContainerStyle={{ backgroundColor: "#E8E8E9" }}
                platform='ios'
            />
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
                                    <Image source={require('../assets/images/russia.png')} style={{ marginRight: 10 }} />
                                    <Text style={[styles.title, themeTextStyle]}>Россия</Text>
                                    <Text style={[styles.title, themeSubTextStyle]}>+7</Text>
                                </View>
                                <View style={styles.selected} >
                                    <RadioButtonInput
                                        obj={{}}
                                        index={0}
                                        // isSelected={selectAirport === obj.id}
                                        onPress={() => navigation.navigate('login')}
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
        paddingVertical:'2%',
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
        marginLeft:'5%',
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