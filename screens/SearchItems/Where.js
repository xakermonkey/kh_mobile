import React, { useLayoutEffect, useState } from 'react'
import { Appearance, useColorScheme, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, ImageBackground } from 'react-native'
import { Button, SearchBar } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { domain, domain_domain } from '../../domain';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';


const Where = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [text, setText] = useState("");
    const [bad, setBad] = useState(false);

    const [selectAirport, setSelectAirport] = useState();
    const [airport, setAirport] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Поиск забытых и потерянных вещей',
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            // headerRight: () => {
            //     return (<TouchableOpacity activeOpacity={0.5} onPress={{}} ><Text style={[{ fontSize: 16, fontFamily: "Inter_800ExtraBold" }, themeTextStyle]} >Пропустить</Text></TouchableOpacity>)
            // }
        });
        AsyncStorage.getItem("token")
            .then(token => {
                axios.get(domain + "/get_airport", { headers: { "Authorization": "Token " + token } })
                    .then(res => {
                        setAirport(res.data);
                    })
            })
    }, [navigation])


    const customSelectAirport = async (obj) => {
        setSelectAirport(obj);
    }

    const filterAirport = (obj) => {
        if (search.length === 0) {
            return true;
        }
        return obj.name.toLowerCase().startsWith(search.toLowerCase());
    }

    return (
        <View style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.title, themeTextStyle]} >Расскажите где Вы забыли вещи</Text>
            <TextInput multiline placeholder='Описание' style={[{ width: '100%', height: 200, borderRadius: 16, padding: 8, fontFamily: 'Inter_500Medium', fontSize: 16 }, themeContainerSelectStyle]}></TextInput>

            <Text style={[styles.title, themeTextStyle]}>В каком аэропорту?</Text>
            <SearchBar
                placeholder="Найти аэропорт"
                onChangeText={setSearch}
                value={search}
                containerStyle={{ backgroundColor: null }}
                inputContainerStyle={themeContainerSelectStyle}
                platform='ios'
                cancelButtonTitle='Отмена'
                style={{color: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',}}
            />
            <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false} >
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
                                    <ImageBackground source={{ uri: 'https://31tv.ru/wp-content/uploads/2020/09/rkyr.jpg' }} style={{ flex: 1 }} imageStyle={{ borderRadius: 16, }}>
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

            <Button buttonStyle={styles.btn} onPress={() => navigation.navigate('when_forget')} containerStyle={styles.cont_btn} icon={<AntDesign name="arrowright" size={24} color="#000" />} />
        </View>
    )
}

export default Where

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        padding: '4%'
    },
    title: {
        fontSize: 16,
        fontFamily: "Inter_800ExtraBold",
        marginTop: 12,
        marginBottom: 8
    },
    subtext: {
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        marginBottom: 4
    },
    label: {
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        marginTop: '20%'
    },
    inputtext: {
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        marginBottom: '35%'
    },
    row: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
    },
    btn: {
        backgroundColor: '#F5CB58',
        width: 64,
        height: 64,
        borderRadius: 64
    },
    cont_btn: {
        alignItems: 'flex-end',
        // justifyContent: 'center'
    },
    radiobutton_container: {
        // width: "100%",
        // marginTop: "4%"
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
