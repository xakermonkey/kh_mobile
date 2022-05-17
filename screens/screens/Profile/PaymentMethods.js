import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from 'react-native-elements';
import { Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { color } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import BouncyCheckbox from "react-native-bouncy-checkbox";

function PaymentMethods({ navigation }) {

    return (
        <ScrollView style={styles.container}>
            <View style={styles.panel}>
                <Text style={styles.title} >Выбрать способ оплаты</Text>
                <View style={styles.inline}>
                    <View style={styles.row}>
                        <Image source={require('../../assets/images/Profile/Visa.png')} style={{ marginRight: 10 }} />
                        <Text style={styles.text} >Visa •••• 6792</Text>
                    </View>
                    <BouncyCheckbox
                        size={24}
                        fillColor='#3333FF'
                        unfillColor="#23232A14"
                        iconStyle={{
                            borderWidth: 0
                        }}
                        disableText={false}
                        checkIconImageSource={null}
                    />
                </View>
                <View style={styles.inline}>
                    <View style={styles.row}>
                        <Image source={require('../../assets/images/Profile/Mastercard.png')} style={{ marginRight: 10 }} />
                        <Text style={styles.text} >Mastercard •••• 4677</Text>
                    </View>
                    <BouncyCheckbox
                        size={24}
                        fillColor='#3333FF'
                        unfillColor="#23232A14"
                        iconStyle={{
                            borderWidth: 0
                        }}
                        disableText={false}
                        checkIconImageSource={null}
                    />
                </View>
                <View style={styles.inline}>
                    <View style={styles.row}>
                        <Image source={require('../../assets/images/Profile/Visa.png')} style={{ marginRight: 10 }} />
                        <Text style={styles.text} >Visa •••• 6792</Text>
                    </View>
                    <BouncyCheckbox
                        size={24}
                        fillColor='#3333FF'
                        unfillColor="#23232A14"
                        iconStyle={{
                            borderWidth: 0
                        }}
                        disableText={false}
                        checkIconImageSource={null}
                    />
                </View>
            </View>
        </ScrollView>
    )
};

export default PaymentMethods

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        backgroundColor: '#F9F9FA',
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: '3%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },

})
