import React, { useLayoutEffect, useState } from 'react'
import { Appearance, useColorScheme, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BirthDayScreen = ({navigation}) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

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

    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
      };

      const Pass = () => {
        AsyncStorage.setItem("birthday", "")
        .then(() => {
            navigation.navigate("how_get")
        })
    } 


    const setDoc = () => {
        AsyncStorage.setItem("birthday",date.toString())
        .then(() => {
            navigation.navigate("how_get")
        })
    }

    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.title, themeTextStyle]} >Введите паспортные данные</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>для ускорения обслуживания и получения</Text>
            <Text style={[styles.subtext, themeSubTextStyle]}>дополнительных привилегий</Text>
            <Text style={[styles.label, themeTextStyle]} >Дата рождения</Text>
            <DateTimePicker
                style={styles.picker}
                value={date}
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={onChange}
                textColor={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                locale="ru-RU"
                />
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

export default BirthDayScreen

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
        marginTop: '20%'
    },
    picker:{
        height: '40%',
        width: '80%',
        marginBottom: '50%',
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
