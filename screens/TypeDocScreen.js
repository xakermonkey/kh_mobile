import React, { useLayoutEffect, useState, useRef, useMemo } from 'react'
import { Appearance, useColorScheme, View, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskInput from 'react-native-mask-input';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const TypeDocScreen = ({ navigation }) => {
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
        AsyncStorage.getItem("type_doc").then(td => {
            if (td != null) {
                navigation.replace("document");
            }
        })
    }, [navigation])

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['25%'], []);


    const Pass = async () => {
        const token = await AsyncStorage.getItem("token");
        const first_name = await AsyncStorage.getItem("first_name");
        const last_name = await AsyncStorage.getItem("last_name");
        const patronymic = await AsyncStorage.getItem("patronymic");
        const birthday = await AsyncStorage.getItem("birthday");
        const data = new FormData();
        data.append("last_name", last_name);
        data.append("first_name", first_name);
        data.append("patronymic", patronymic);
        data.append("birthday", birthday);
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
            navigation.navigate("select_airport");
        }
    }

    const [type, setType] = useState("Паспорт РФ");


    const ClickType = (text) => {
        setType(text);
        bottomSheetModalRef.current.close();

    }


    const setDoc = async () => {
        await AsyncStorage.setItem("type_doc", type);
        navigation.navigate("document")

    }

    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.title, themeTextStyle]} >Введите паспортные данные</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>для ускорения обслуживания и получения</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>дополнительных привилегий</Text>
            <Text style={[styles.label, themeTextStyle]} >Выберите тип документа</Text>
            <TouchableOpacity onPress={() => bottomSheetModalRef.current.snapToIndex(0)} style={[styles.inputtext, themeTextStyle]}><Text>{type}</Text></TouchableOpacity>
            <BottomSheetModalProvider>
                <View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={-1}
                        snapPoints={snapPoints}
                        backgroundStyle={{ backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C' }}
                    >
                        <Text style={[styles.text, { textAlign: 'center' }, themeTextStyle]} >Тип документа</Text>
                        <TouchableOpacity onPress={() => ClickType("Паспорт РФ")} ><Text>Паспорт РФ</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => ClickType("Заграничный паспорт")} ><Text>Заграничный паспорт</Text></TouchableOpacity>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
            <KeyboardAvoidingView behavior='padding' style={styles.row}>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text style={[styles.subtext, themeTextStyle]} >Зачем нам ваши </Text>
                    <Text style={[styles.subtext, themeTextStyle]}>паспортные данные?</Text>
                </TouchableOpacity>
                <Button buttonStyle={styles.btn} onPress={setDoc} containerStyle={styles.cont_btn} icon={<AntDesign name="arrowright" size={24} color="#000" />} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default TypeDocScreen

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
    picker: {
        height: '40%',
        width: '80%',
        marginBottom: '50%',
    },
    row: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
    },
    inputtext: {
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        marginBottom: '35%'
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
