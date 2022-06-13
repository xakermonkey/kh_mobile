import React, { useLayoutEffect, useState } from 'react'
import { Appearance, useColorScheme, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { domain } from '../../domain';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';

const ChangeLastNameScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [text, setText] = useState('');
    const [bad, setBad] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        });
        (async () => {
            const fn = await AsyncStorage.getItem("last_name")
            if (fn != null) {
                setText(fn)
            }
        })();
    }, [navigation])



    const setDoc = async () => {
        if (text != "") {
            if (/[0-9]/.test(text)) {
                setBad(true);
            } else {
                const token = await AsyncStorage.getItem("token");
                const data = new FormData();
                data.append("last_name", text);
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
                    await AsyncStorage.setItem("last_name", text);
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "select_terminal" }, { name: "profile" }]
                        }));

                }
            }
        }

    }
    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={[styles.title, themeTextStyle]} >Изменение личных данных</Text>
                            {/* <Text style={[styles.subtext, themeSubTextStyle]}>для ускорения обслуживания и получения</Text> */}
                            {/* <Text style={[styles.subtext, themeSubTextStyle]}>дополнительных привилегий</Text> */}

                            <Text style={[styles.label, themeSubTextStyle]} >Фамилия</Text>
                            <TextInput autoFocus value={text} style={[styles.inputtext, bad ? { color: "#FF3956" } : themeTextStyle]} onChangeText={(text) => { setBad(false); setText(text) }} />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'flex-end', padding: '4%' }}>
                            <TouchableOpacity style={styles.btn} onPress={setDoc}>
                                <Text style={styles.btn_text}>Сохранить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default ChangeLastNameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'flex-start',
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
        marginTop: '20%',
        // width:200
    },
    inputtext: {
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        // marginBottom: '35%'
        width: '100%',
        textAlign:'center'
    },
    row: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
    },
    btn_text: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        color: '#000',
    },
    btn: {
        // width: "90%",
        backgroundColor: '#F5CB57',
        borderRadius: 12,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '4%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16,
        elevation: 12,
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
