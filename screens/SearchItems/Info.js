import React, { useLayoutEffect, useState, useMemo, useRef, useCallback } from 'react'
import { Appearance, useColorScheme, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Keyboard, View, ImageBackground } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { domain, domain_domain } from '../../domain';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Loading from '../Loading';


const Info = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Поиск забытых и потерянных вещей',
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        });
    }, [navigation])


    return (
        <View style={[styles.container, themeContainerStyle]}>
            <View style={{flex:1,justifyContent:'center'}}>
            <Text style={[styles.title, themeTextStyle]} >Похоже мы обнаружили вещи похожие на ваши.
                Для получения своих вещей обратитесь в единый call center службы розыска по тел 8-800 - *****</Text>

                <TouchableOpacity activeOpacity={.9} onPress={() => navigation.navigate('rule_references')} >
                <Text style={[{ fontFamily: 'Inter_700Bold', textAlign:'center', marginTop:'5%' }, themeSubTextStyle]}>Правила выдачи забытых и найденных вещей и предметов в камере хранения багажа</Text>
            </TouchableOpacity>
                </View>

                

            <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={() => navigation.navigate('select_terminal')} >
                <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>К терминалам</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Info

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'flex-end',
        padding: '4%'
    },
    title: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        marginTop: 12,
        marginBottom: 8,
        textAlign: 'center',
    },
    btn: {
        marginBottom: '5%',
        backgroundColor: '#F5CB57',
        borderRadius: 12,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 17,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16,
        elevation: 12,
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
