import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Appearance, useColorScheme, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


const DocumentScreen = ({navigation}) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    useLayoutEffect(() =>{
        navigation.setOptions({
            title: '',
            headerShadowVisible: false,
          headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerStyle:{
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerRight:() =>{
                return(<TouchableOpacity activeOpacity={0.5} onPress={Pass} ><Text style={[{fontSize: 16, fontFamily: "Inter_800ExtraBold" }, themeTextStyle]} >Пропустить</Text></TouchableOpacity>)
            }
        })
        AsyncStorage.getItem("number_doc")
        .then((number) => {
            if (number != null){
                navigation.replace("last_name")
            }
        })
    }, [navigation])

    const [text, setText] = useState('')

    const Pass = () => {
        AsyncStorage.setItem("number_doc", "")
        .then(() => {
            navigation.navigate("last_name")
        })
    } 


    const setDoc = () => {
        AsyncStorage.setItem("number_doc",text)
        .then(() => {
            navigation.navigate("last_name")
        })
    }
    useEffect(()=>{
        if (text.length === 4){
            setText(text + ' ');
        }
    })


    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.title, themeTextStyle]} >Введите паспортные данные</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>для ускорения обслуживания и получения</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>дополнительных привилегий</Text>
            <Text style={[styles.label, themeSubTextStyle]} >Серия и номер паспорта</Text>
            <TextInput autoFocus value={text} style={[styles.inputtext, themeTextStyle]} keyboardType='number-pad' onChangeText={(text) => setText(text)}   />
            <KeyboardAvoidingView behavior='padding' style={styles.row}>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text style={[styles.subtext, themeSubTextStyle]} >Зачем нам ваши </Text>
                    <Text style={[styles.subtext, themeSubTextStyle]}>паспортные данные?</Text>
                    </TouchableOpacity>
                <Button buttonStyle={styles.btn} onPress={setDoc} containerStyle={styles.cont_btn} icon={<AntDesign name="arrowright" size={24} color="#000000" />} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default DocumentScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title:{
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold",
        color: "#0C0C0D",
        marginBottom: 8,
    },
    subtext:{
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        color: '#0C0C0D7A',
        marginBottom: 4
    },
    label:{
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        color: '#0C0C0D7A',
        marginTop: '20%'
    },
    inputtext:{
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        color: '#0C0C0D',
        marginBottom: '45%'
    },
    row:{
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
    },
    btn:{
        backgroundColor: '#F5CB58',
        width: 64,
        height: 64,
        borderRadius: 64
    },
    cont_btn:{
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
