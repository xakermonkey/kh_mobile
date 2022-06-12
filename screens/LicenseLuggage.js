import { Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';


const LicenseLuggage = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Сдать багаж",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        })
    }, [navigation])


    return (
        <View style={[styles.container, themeContainerStyle]}>
            <StatusBar />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.textContainer}>
                <Text style={[styles.title, themeTextStyle]}>Правила сдачи и хранения багажа</Text>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>1.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Камера хранения по обслуживанию авиапассажиров работает круглосуточно без перерывов.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>2.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        На хранение принимаются вещи в любой упаковке, обеспечивающей сохранность, исключающей свободный доступ к содержимому, повреждения и загрязнения вещей других клиентов и оборудования камеры хранения.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>3.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Вес одного места багажа не должен превышать 30 кг.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>4.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Фрукты, овощи и другие продукты принимаются на хранение только в упаковке; за их естественную порчу администрация ответственности не несет.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>5.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Стекло и другие бьющиеся предметы принимаются только в упаковке с надписью «Осторожно — Стекло».
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>6.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Не принимаются на хранение взрывчатые, огнеопасные, легко воспламеняющиеся и неприятно пахнущие вещества. Оружие и патроны к нему, живая птица и другая живность, документы, деньги, драгоценности.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>7.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Получение вещей: при получении вещей из камеры хранения клиент должен предъявить кладовщику номерок и назвать фамилию.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>8.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Выдача вещей из камеры хранения производится вне очереди.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>9.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Вещи, не полученные владельцем в течение 6 месяцев со дня принятия на хранение, считаются невостребованными и реализуются в установленном порядке.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>10.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        При утрате клиентом номерка вещи выдаются на основании его заявления, при предъявлении его документов и доказательств принадлежности ему вещей.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    {/* <Text style={[styles.numeric, themeTextStyle]}>10.</Text> */}
                    <Text style={[styles.li, themeTextStyle]}>
                        Компенсация за утерю номерка — 500 рублей.
                        Оплата производится при сдаче багажа.

                    </Text>
                </View>
                <Text style={[styles.title, themeTextStyle]}>Норма оплаты</Text>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>1.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Стоимость хранения одного места багажа 500 рублей с момента сдачи до 23:59 текущих суток.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>2.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        За последующее хранение — по 250 рублей в сутки за каждое место багажа. При этом неполные сутки оплачиваются как полные.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>3.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Оплата за первые сутки производится при сдаче багажа. Доплата за последующее хранение — при выдаче багажа.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>4.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Выдача вещей на временное использование считается завершением оказания услуги.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>5.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Повторная сдача подлежит оплате, согласно действующему прейскуранту. Любая привязь считается отдельным местом.
                    </Text>
                </View>
                <View style={styles.abzath}>
                    <Text style={[styles.numeric, themeTextStyle]}>6.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Вещи на хранение принимаются с объявленной ценностью.
                    </Text>
                </View>
                <View style={[styles.abzath, {marginBottom: "45%"}]}>
                    <Text style={[styles.numeric, themeTextStyle]}>7.</Text>
                    <Text style={[styles.li, themeTextStyle]}>
                        Убытки клиента вследствие утраты или повреждения, сделанные при хранении вещей, подлежат возмещению в пределах суммы на оценке (Ст. 923 ГК РФ, в 7.1.12).
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.container_btn} >
                <Button activeOpacity={0.9} title="Я согласен с правилами" titleStyle={{ fontFamily: 'Inter_700Bold', fontSize: 14, color: '#000', }} containerStyle={styles.btn} buttonStyle={styles.innertBtn} onPress={() => navigation.navigate('add_luggage')} />
                <Button activeOpacity={0.9} title="Отмена" titleStyle={[styles.text_secondary, themeTextStyle]} containerStyle={styles.secondary_btn} buttonStyle={[styles.secondary, themeContainerSelectStyle]} onPress={() => navigation.goBack()} />
            </View>
        </View>
    )
}

export default LicenseLuggage

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