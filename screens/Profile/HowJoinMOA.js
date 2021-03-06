import { Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';


const HowJoinMOA = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "MILEONAIR",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        })
    }, [navigation])


    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <View style={[styles.container, themeContainerStyle]}>
            <StatusBar />
            <View style={{padding:'5%', marginTop:'10%'}}>
                <Text style={[styles.title, themeTextStyle]}>Как стать участником MILEONAIR?</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                    Для того, чтобы начать пользоваться милями Вам необходимо скачать мобильное приложение MILEONAIR.</Text>
            </View>
            </View>
        </SafeAreaView>
    )
}

export default HowJoinMOA

const styles = StyleSheet.create({
    container: {
        flex: 1,
// justifyContent:'center'
    },
    title: {
        fontSize: 30,
        fontFamily: "Inter_800ExtraBold",
        marginTop: "5%",
        // paddingLeft: "5%",
        textAlign:'center'
    },
    subtext: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        marginBottom: 26
    },
    textContainer: {
        // width: '85%',
        paddingLeft: "5%",
        paddingHorizontal:'10%'
    },
    abzath: {
        flexDirection: 'row',
        marginTop: 8
    },
    numeric: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 22,
        marginRight: 3
    },
    li: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 22,
        textAlign:'center',
        marginTop:'5%',
    },
    container_btn: {
        width: "100%",
        position: 'absolute',
        bottom: '5%',
        alignItems: 'center'
    },
    btn: {
        width: '90%',
        borderRadius: 12,
    },
    secondary_btn: {
        marginTop: "2%",
        width: '90%',
        borderRadius: 12,
    },
    secondary: {
        paddingVertical: 14,
    },
    text_secondary: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
    innertBtn: {
        backgroundColor: '#F5CB57',
        paddingVertical: 14
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
        backgroundColor: "#DFDFE1"
    },
    darkContainerSelect: {
        backgroundColor: "#3C3C42"
    },
})