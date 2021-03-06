import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Appearance, useColorScheme } from 'react-native';
import { domain } from '../../domain';



function AddEmail({ navigation }) {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [email, setEmail] = useState("");
    const [repeat, setRepeat] = useState(60);
    const [timer, setTimer] = useState();
    const [send, setSend] = useState(false);
    const [firstSend, setFirstSend] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerShadowVisible: false,
            title: 'Добавить эл. почту',
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
        })
    }, [navigation, colorScheme])

    const sendEmail = useCallback(async () => {
        setFirstSend(true);
        if (!send){
            const token = await AsyncStorage.getItem("token");
        await AsyncStorage.setItem("email", email);
        const res = await axios.post(domain + "/send_email", {email: email}, {headers:{"Authorization": "Token " + token}});
        
        }
    }, [repeat])

    return (
        <View style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.subtext, themeSubTextStyle]} >Эл. почта</Text>
            <TextInput autoCapitalize='none' style={[styles.input, themeContainerSelectStyle]} value={email} onChangeText={setEmail} />
            {firstSend && <Text style={[styles.subtext, { textAlign: 'center' }, themeSubTextStyle]} >На указанный адрес не пришло письмо?</Text>}
            {firstSend &&<Text style={[styles.subtext, { textAlign: 'center' }, themeSubTextStyle]} >Повторная отправка возможна через {repeat} секунд</Text>}
            {firstSend &&<TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('profile')}>
                <Text style={styles.btn_text}>Отправить еще раз</Text>
            </TouchableOpacity>}
            

            <View>
                <Text style={[styles.subtext, { textAlign: 'center' }, themeSubTextStyle]} >Вам на почту придет письмо с подтверждением</Text>
                <TouchableOpacity style={styles.btn} onPress={sendEmail}>
                    <Text style={styles.btn_text}>Сохранить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default AddEmail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inline_photo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '3%',
    },
    panel: {
        borderRadius: 16, padding: '4%', marginBottom: '3%',
    },
    title: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
    },
    text: {
        fontFamily: 'Inter_600SemiBold',
    },
    subtext: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
        marginBottom: '3%',
    },
    inline_subtext: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
        marginBottom: '6%',
    },
    input: {
        borderRadius: 12,
        padding: '4%',
        marginBottom: '6%'
    },
    inline_input: {
        borderRadius: 12,
        padding: '8%',
        marginBottom: '12%'
    },
    btn_text: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        color: '#000',
    },
    btn: {
        // marginTop:'10%',
        padding: '4%',
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#F5CB57',
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
