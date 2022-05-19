import { Appearance, useColorScheme, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { domain } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectAirport = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [selectAirport, setSelectAirport] = useState(0);
    const [airport, setAirport] = useState([]);


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
            axios.get(domain + "/get_airport", {headers: {"Authorization": "Token " + token }})
            .then(res => {
                setAirport(res.data);
            })
        })
        AsyncStorage.getItem("airport_iata")
        .then(iata => {
            if (iata != null){
                setSelectAirport(iata);
            }
        })
    }, [navigation])


    
    const customSelectAirport = async (iata) => {
        await AsyncStorage.setItem("airport", airport.filter((obj) => obj.iata == iata)[0].name);
        await AsyncStorage.setItem("airport_iata", iata);
        navigation.replace("select_terminal", { "title": airport.filter((obj) => obj.iata == iata)[0].name, 'iata': iata })
    }


    return (
        <View style={[styles.container, themeContainerStyle]} >
            <StatusBar />
            <View style={[styles.container_select, themeContainerSelectStyle]}>
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
                                    buttonOuterColor={colorScheme === 'light' ? '#e8e8e9' : '#F2F2F31F'}
                                    buttonSize={24}
                                    buttonOuterSize={31}
                                    buttonStyle={{ backgroundColor: colorScheme === 'light' ? '#e8e8e9' : '#F2F2F31F' }}

                                />
                            </View>
                        </RadioButton>)
                        })}
                    </RadioForm>
                </View>
            </View>
        </View>
    )
}

export default SelectAirport

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