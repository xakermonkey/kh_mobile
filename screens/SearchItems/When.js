import React, { useLayoutEffect, useState } from 'react'
import { Appearance, useColorScheme, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { domain } from '../../domain';


const When = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [date, setDate] = useState(new Date());

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Поиск забытых и потерянных вещей',
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        })
    }, [navigation])


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };




    return (
        <View style={[styles.container, themeContainerStyle]}>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start', }}>
                <Text style={[styles.title, themeTextStyle]} >Когда Вы забыли</Text>
                <Text style={[styles.subtext, themeSubTextStyle]}>для ускорения поиска</Text>
                {/* <Text style={[styles.subtext, themeSubTextStyle]}>дополнительных привилегий</Text> */}
                <Text style={[styles.label, themeTextStyle]} >Дата потери</Text>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="calendar"
                    onChange={onChange}
                    locale={"ru-RU"}
                    maximumDate={new Date()}
                    style={{ alignSelf:'center',width: 200, backgroundColor:'#00f'}}
                />
                {/* <MaskInput autoFocus value={date} style={[styles.inputtext, themeTextStyle]} mask={mask} onChangeText={(masked, unmasked) => setDate(masked)} /> */}
                {/* <KeyboardAvoidingView behavior='padding' style={styles.row}> */}
                {/* <TouchableOpacity activeOpacity={0.5}>
                    <Text style={[styles.subtext, themeSubTextStyle]} >Зачем нам ваши </Text>
                    <Text style={[styles.subtext, themeSubTextStyle]}>паспортные данные?</Text>
                </TouchableOpacity> */}
            </View>
            <View style={{ alignItems: 'flex-end' }}>
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
