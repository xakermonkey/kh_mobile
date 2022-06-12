import { Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';


const RuleReferences = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Правила выдачи",
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
            <ScrollView showsVerticalScrollIndicator={false} style={styles.textContainer}>
                <Text style={[styles.title, themeTextStyle]}>Правила выдачи забытых и найденных вещей и предметов в камере хранения багажа</Text>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>1.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                    Забытые вещи — вещи и предметы, находящиеся на территории аэропорта без присмотра до оформления их к перевозке, или оставленные в залах ожидания аэропорта и привокзальной площади.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>2.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                    Срок хранения найденных вещей составляет 30 суток со дня их поступления на хранение.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>3.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                    По истечении этого срока вещи подлежат реализации или уничтожению согласно установленному порядку.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>4.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                    Забытые вещи хранятся бесплатно в течение двух суток. Время хранения исчисляется с момента поступления забытых вещей в камеру хранения багажа. При этом взимается единовременная плата согласно утвержденному прейскуранту за прием и оформление забытых вещей за каждое место багажа.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>5.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                    За выдачу вещей, срок хранения которых превышает двое суток, взимается плата согласно утвержденному прейскуранту. Неполные сутки считаются за полные.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>6.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                    Лицу, претендующему на получение найденной вещи, необходимо указать точные признаки или содержимое упаковки.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>7.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                    Скоропортящиеся продукты в случае угрозы их частичной или полной порчи подлежат реализации или уничтожению с оформлением соответствующего акта.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>8.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                    Оплата выдачи забытых вещей производится в кассах ООО «Упаковка Сервис».
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>9.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                    Пересылка забытых вещей не осуществляется.
                    </Text>
                </View>
            </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default RuleReferences

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        fontSize: 30,
        fontFamily: "Inter_800ExtraBold",
        marginTop: "5%",
        paddingLeft: "5%",
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
        lineHeight: 22
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