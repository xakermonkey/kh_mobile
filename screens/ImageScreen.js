import React, { useLayoutEffect, useState } from 'react'
import { Appearance, useColorScheme, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain } from '../domain';
import { lessThan } from 'react-native-reanimated';

const ImageScreen = ({navigation}) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;
    const [img, setImg] = useState();

    useLayoutEffect(() =>{
        navigation.setOptions({
            title: '',
            headerShadowVisible: false,
            headerStyle:{
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerRight:() =>{
                return(<TouchableOpacity activeOpacity={0.5} onPress={Pass} ><Text style={[{fontSize: 16, fontFamily: "Inter_800ExtraBold" }, themeTextStyle]} >Пропустить</Text></TouchableOpacity>)
            }
        })
    }, [navigation])

    


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
        if (!result.cancelled) {
            let shir = result.uri.split(".")
            shir = shir[shir.length - 1]
            const obj = {
                uri: result.uri,
                type: 'image/' + shir,
                name: `img.${shir}`
              }
            setImg(obj);
        }
    }

    const Pass = async () => {
        const token = await AsyncStorage.getItem("token");
        const first_name = await AsyncStorage.getItem("first_name");
        const last_name = await AsyncStorage.getItem("last_name");
        const patronymic = await AsyncStorage.getItem("patronymic");
        const birthday = await AsyncStorage.getItem("birthday");
        const type_doc = await AsyncStorage.getItem("type_doc");
        const number_doc = await AsyncStorage.getItem("number_doc");
        const how_get = await AsyncStorage.getItem("how_get");
        const date_get = await AsyncStorage.getItem("date_get");
        const data = new FormData();
        data.append("last_name", last_name);
        data.append("first_name", first_name);
        data.append("patronymic", patronymic);
        data.append("birthday", birthday);
        data.append("type_doc", type_doc);
        data.append("series_number", number_doc);
        data.append("how_get", how_get);
        data.append("date_get", date_get);
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

    const setDoc = async () => {
        await AsyncStorage.setItem("avatar", img.uri);
        const token = await AsyncStorage.getItem("token");
        const first_name = await AsyncStorage.getItem("first_name");
        const last_name = await AsyncStorage.getItem("last_name");
        const patronymic = await AsyncStorage.getItem("patronymic");
        const birthday = await AsyncStorage.getItem("birthday");
        const type_doc = await AsyncStorage.getItem("type_doc");
        const number_doc = await AsyncStorage.getItem("number_doc");
        const how_get = await AsyncStorage.getItem("how_get");
        const date_get = await AsyncStorage.getItem("date_get");
        const data = new FormData();
        data.append("last_name", last_name);
        data.append("first_name", first_name);
        data.append("patronymic", patronymic);
        data.append("birthday", birthday);
        data.append("type_doc", type_doc);
        data.append("series_number", number_doc);
        data.append("how_get", how_get);
        data.append("date_get", date_get);
        data.append("photo", img);
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
            await AsyncStorage.setItem("full_document", "true");
            navigation.navigate("select_airport");
        }
    }


    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.title, themeTextStyle]} >Загрузите фото паспорта</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>для подтверждения вашей личности</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>загрузите, пожалуйста, фотографию паспорта</Text>
            {img ? <Image source={{ uri: img.uri}} style={styles.add} /> :
            <TouchableOpacity onPress={pickImage} activeOpacity={0.5} style={[styles.add, themeContainerSelectStyle]}><AntDesign name="pluscircleo" size={24} color={colorScheme === 'light' ? '#17171C' : '#f2f2f2'} /></TouchableOpacity>
            }
            <Text style={[styles.label, themeSubTextStyle]} >Первый разворот с ФИО и фото лица</Text>
            {img && <Button titleStyle={styles.textbtn} onPress={setDoc} containerStyle={styles.cntbtn} buttonStyle={styles.btn} title="Завершить" />}
        </SafeAreaView>
    )
}

export default ImageScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title:{
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold",
        marginBottom: 8,
    },
    subtext:{
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        marginBottom: 4
    },
    label:{
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        marginTop: '5%',
        marginBottom: '65%'
    },
    add:{
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30%',
        borderRadius: 16,
        marginTop:'20%'
    },
    btn:{
        paddingVertical: 15,
        backgroundColor: '#F5CB57'
    },
    cntbtn:{
        width: '80%',
        borderRadius: 12,
    },
    textbtn:{
        fontSize: 14, 
        fontFamily: "Inter_700Bold",
        color: '#000'
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
