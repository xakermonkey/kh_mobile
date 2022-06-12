import React, { useLayoutEffect, useState } from 'react'
import { Appearance, useColorScheme, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { domain } from '../domain';
import { CommonActions } from '@react-navigation/native';
const InputFirstNameScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerRight: () => {
                return (<TouchableOpacity activeOpacity={0.5} onPress={Pass} ><Text style={[{ fontSize: 16, fontFamily: "Inter_800ExtraBold" }, themeTextStyle]} >Пропустить</Text></TouchableOpacity>)
            }
        })
        AsyncStorage.getItem("first_name")
            .then((first_name) => {
                if (first_name != null){
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "select_terminal" }]
                        }));
                }
                
            })
    }, [navigation])

    const Pass = async () => {
        const token = await AsyncStorage.getItem("token");
        const last_name = await AsyncStorage.getItem("last_name");
        const data = new FormData();
        data.append("last_name", last_name);
        const res = await fetch(domain + "/set_document",
            {
                method: "POST",
                body: data,
                headers: {
                    "Authorization": "Token " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
        const res_json = await res.json();
        if (res_json.ok == "ok") {
            await AsyncStorage.setItem("first_join", "true");
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "select_terminal" }]
                }));
        }
    }
    const [text, setText] = useState('')
    const [bad, setBad] = useState(false);

    const setDoc = async () => {
        if (text != "") {
            if (/[0-9]/.test(text)) {
                setBad(true);
            } else {
                
                const token = await AsyncStorage.getItem("token");
                const last_name = await AsyncStorage.getItem("last_name");
                const data = new FormData();
                data.append("last_name", last_name);
                data.append("first_name", text);
                const res = await fetch(domain + "/set_document",
                    {
                        method: "POST",
                        body: data,
                        headers: {
                            "Authorization": "Token " + token,
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                const res_json = await res.json();
                if (res_json.ok == "ok") {
                    await AsyncStorage.setItem("first_name", text);
                    await AsyncStorage.setItem("first_join", "true");
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "select_terminal" }]
                        }));

                }
            }
        }

    }

    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.title, themeTextStyle]} >Введите личные данные</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>для ускорения обслуживания и получения</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>дополнительных привилегий</Text>
            <Text style={[styles.label, themeTextStyle]} >Имя</Text>
            <TextInput autoFocus value={text} style={[styles.inputtext, bad ? {color: "#FF3956"} : themeTextStyle]} onChangeText={(text) => setText(text)} />
            <KeyboardAvoidingView behavior='padding' style={styles.row}>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text style={[styles.subtext, themeSubTextStyle]} >Зачем нам ваши </Text>
                    <Text style={[styles.subtext, themeSubTextStyle]}>паспортные данные?</Text>
                </TouchableOpacity>
                <Button buttonStyle={styles.btn} onPress={setDoc} containerStyle={styles.cont_btn} icon={<AntDesign name="arrowright" size={24} color="#000" />} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default InputFirstNameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold",
        marginBottom: 8,
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
        alignItems: 'center',
        justifyContent: 'center'
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
