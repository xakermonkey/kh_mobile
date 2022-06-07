import React, { useLayoutEffect, useState } from 'react'
import { Appearance, useColorScheme, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { domain } from '../../domain';
import MaskInput, {formatWithMask} from 'react-native-mask-input';


const When = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;


    const [mask, setMask] = useState([ /\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]);


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
            //     return (<TouchableOpacity activeOpacity={0.5} onPress={Pass} ><Text style={[{ fontSize: 16, fontFamily: "Inter_800ExtraBold" }, themeTextStyle]} >Пропустить</Text></TouchableOpacity>)
            // }
        })
        // AsyncStorage.getItem("date_get")
        //     .then((dg) => {
        //         if (dg != null) {
        //             navigation.replace("input_image")
        //         }
        //     })
    }, [navigation])

    const [date, setDate] = useState("");

    // const Pass = async () => {
    //     const token = await AsyncStorage.getItem("token");
    //     const first_name = await AsyncStorage.getItem("first_name");
    //     const last_name = await AsyncStorage.getItem("last_name");
    //     const patronymic = await AsyncStorage.getItem("patronymic");
    //     const birthday = await AsyncStorage.getItem("birthday");
    //     const type_doc = await AsyncStorage.getItem("type_doc");
    //     const number_doc = await AsyncStorage.getItem("number_doc");
    //     const how_get = await AsyncStorage.getItem("how_get");
    //     const data = new FormData();
    //     data.append("last_name", last_name);
    //     data.append("first_name", first_name);
    //     data.append("patronymic", patronymic);
    //     data.append("birthday", birthday);
    //     data.append("type_doc", type_doc);
    //     data.append("series_number", number_doc);
    //     data.append("how_get", how_get);
    //     const res = await fetch(domain + "/set_document",
    //         {
    //             method: "POST",
    //             body: data,
    //             headers: {
    //                 "Authorization": "Token " + token,
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'multipart/form-data',
    //             }
    //         });
    //     const res_json = await res.json();
    //     if (res_json.ok == "ok") {
    //         const fj = await AsyncStorage.getItem("first_join");
    //         if (fj == null){
    //             await AsyncStorage.setItem("first_join", "true");
    //             navigation.navigate("select_airport");
    //         }else{
    //             navigation.navigate("license_luggage");
    //         }
            
    //     }
    // }


    // const setDoc = () => {
    //     if (/[0-9]{2}.[0-9]{2}.[0-9]{4}/.test(date)) {
    //         const dt = new Date(date.split(".")[2], date.split(".")[1], date.split(".")[0])
    //         AsyncStorage.setItem("date_get", dt.getTime().toString())
    //             .then(() => {
    //                 navigation.navigate("input_image");
    //             })
    //     }
    // }


    return (
        <View style={[styles.container, themeContainerStyle]}>
            <View style={{alignItems: 'center',justifyContent: 'flex-start',}}>
            <Text style={[styles.title, themeTextStyle]} >Когда Вы забыли</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>для ускорения поиска</Text>
            {/* <Text style={[styles.subtext, themeSubTextStyle]}>дополнительных привилегий</Text> */}
            <Text style={[styles.label, themeTextStyle]} >Дата потери (в формате ДД.ММ.ГГГГ)</Text>
            <MaskInput autoFocus value={date} style={[styles.inputtext, themeTextStyle]} mask={mask} onChangeText={(masked, unmasked) => setDate(masked)} />
            {/* <KeyboardAvoidingView behavior='padding' style={styles.row}> */}
                {/* <TouchableOpacity activeOpacity={0.5}>
                    <Text style={[styles.subtext, themeSubTextStyle]} >Зачем нам ваши </Text>
                    <Text style={[styles.subtext, themeSubTextStyle]}>паспортные данные?</Text>
                </TouchableOpacity> */}
                </View>
                <View style={{alignItems:'flex-end'}}>
                <Button buttonStyle={styles.btn} onPress={() => navigation.navigate('what_forget')} containerStyle={styles.cont_btn} icon={<AntDesign name="arrowright" size={24} color="#000" />} />
                </View>
            {/* </KeyboardAvoidingView> */}
        </View>
    )
}

export default When

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%'
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
    btn: {
        backgroundColor: '#F5CB58',
        width: 64,
        height: 64,
        borderRadius: 64
    },
    cont_btn: {
        alignItems: 'flex-end',
    },
    inputtext: {
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        marginBottom: '35%'
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
