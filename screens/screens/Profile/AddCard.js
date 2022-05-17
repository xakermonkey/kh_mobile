import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, TextInput } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from 'react-native-elements';
import { Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { color } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';


function AddCard({ navigation }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.subtext} >ФИО владельца</Text>
            <TextInput style={styles.input} />

            <Text style={styles.subtext} >Номер карты</Text>
            <TextInput style={styles.input} />

            <View style={styles.inline}>
                <View style={{ width: '48%' }}>
                    <Text style={styles.inline_subtext} >Действует до</Text>
                    <TextInput style={styles.inline_input} />
                </View>
                <View style={{ width: '48%' }}>
                    <Text style={styles.inline_subtext} >CVV</Text>
                    <TextInput style={styles.inline_input} />
                </View>
            </View>
            <TouchableOpacity style={styles.btn}>
                {/* <LinearGradient
                    colors={['rgba(255, 255, 255, 0.24)', 'rgba(51, 51, 255, 0.48)']}
                    style={styles.btn}> */}
                <Text style={styles.btn_text}>Привязать карту</Text>
                {/* </LinearGradient> */}
            </TouchableOpacity>
        </ScrollView>
    )
};

export default AddCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        backgroundColor: '#F9F9FA',
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical: '3%',
    },
    inline_photo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '3%',
    },
    panel: {
        backgroundColor: '#23232A14', borderRadius: 16, padding: '4%', marginBottom: '3%',
    },
    title: {
        fontFamily: 'Inter_500Medium',
        color: '#0C0C0D7A',
        fontSize: 14,
    },
    text: {
        fontFamily: 'Inter_600SemiBold',
    },
    subtext: {
        fontFamily: 'Inter_500Medium',
        color: '#0C0C0D7A',
        fontSize: 12,
        marginBottom: '3%',
    },
    inline_subtext: {
        fontFamily: 'Inter_500Medium',
        color: '#0C0C0D7A',
        fontSize: 12,
        marginBottom: '6%',
    },
    input: {
        backgroundColor: '#23232A14',
        borderRadius: 12,
        padding: '4%',
        marginBottom: '6%'
    },
    inline_input: {
        backgroundColor: '#23232A14',
        borderRadius: 12,
        padding: '8%',
        marginBottom: '12%'
    },
    btn_text: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        color: '#F2F2F3',
    },
    btn: {
        padding: '4%',
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#3333FF',
    },

})
