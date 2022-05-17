import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Appearance, useColorScheme } from 'react-native';



function AddCard({ navigation }) {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
          headerShadowVisible: false,
          title: 'Добавить карту',
          headerBackTitleVisible: false,
          headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
          headerStyle: {
            backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
          },
        })
    }, [navigation, colorScheme])

    return (
        <ScrollView style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.subtext, themeSubTextStyle]} >ФИО владельца</Text>
            <TextInput style={[styles.input, themeContainerSelectStyle]} />

            <Text style={[styles.subtext, themeSubTextStyle]} >Номер карты</Text>
            <TextInput style={[styles.input, themeContainerSelectStyle]} />

            <View style={styles.inline}>
                <View style={{ width: '48%' }}>
                    <Text style={[styles.inline_subtext, themeSubTextStyle]} >Действует до</Text>
                    <TextInput style={[styles.inline_input, themeContainerSelectStyle]} />
                </View>
                <View style={{ width: '48%' }}>
                    <Text style={[styles.inline_subtext, themeSubTextStyle]} >CVV</Text>
                    <TextInput style={[styles.inline_input, themeContainerSelectStyle]} />
                </View>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btn_text}>Привязать карту</Text>
            </TouchableOpacity>
        </ScrollView>
    )
};

export default AddCard

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
        marginTop:'10%',
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
