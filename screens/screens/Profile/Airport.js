import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from 'react-native-elements';
import { Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { color } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';




function Airport() {
    return (
        <View style={styles.container}>
            <View style={styles.panel}>
                <Text style={styles.title} >Камеры хранения</Text>
                <View style={{ marginTop: '5%' }}>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Терминал А</Text>
                            <Text style={styles.subtext} >2 этаж</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >2 заказа</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Терминал А</Text>
                            <Text style={styles.subtext} >2 этаж</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >2 заказа</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Терминал А</Text>
                            <Text style={styles.subtext} >2 этаж</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >2 заказа</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Терминал А</Text>
                            <Text style={styles.subtext} >2 этаж</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >2 заказа</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default Airport

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
    panel: {
        backgroundColor: '#23232A14', borderRadius: 16, padding: '4%',
    },
    title: {
        fontFamily: 'Inter_500Medium',
        color: '#0C0C0D7A',
    },
    text: {
        fontFamily: 'Inter_600SemiBold',
    },
    subtext: {
        fontFamily: 'Inter_500Medium',
        color: '#0C0C0D7A'
    }

})
