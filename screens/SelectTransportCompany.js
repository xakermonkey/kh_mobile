import { Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Switch, TextInput } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BouncyCheckbox from "react-native-bouncy-checkbox";


const SelectTransportCompany = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [isEnabled, setIsEnabled] = useState(false);
    const [mile, setMile] = useState("")

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['35%', '35%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Выберите ТК",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        })
    }, [navigation])


    return (
        <View style={[styles.container, themeContainerStyle]}  >
            <StatusBar />
            <View style={styles.container_select} >
                <Text style={[styles.label, themeSubTextStyle]} >Транспортная компания</Text>
                <TouchableOpacity activeOpacity={.9} onPress={handlePresentModalPress}>
                    <View style={[styles.select, themeContainerSelectStyle]} >
                        <Text style={[styles.value, themeTextStyle]} >Почта России</Text>
                        <Icon
                            name="chevron-down-outline"
                            type="ionicon"
                            color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.label, { marginTop: 10 }, themeSubTextStyle]} >Дата доставки: 24 декабря</Text>
            </View>

            <View style={[styles.container_price, themeContainerSelectStyle]} >
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeSubTextStyle]} >Продление хранения</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >500 ₽</Text>
                </View>
                <View style={{ height: 1, backgroundColor: '#fff' }}></View>
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeSubTextStyle]} >Списание миль</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >-250 миль</Text>
                </View>
                <View style={{ height: 1, backgroundColor: '#fff' }}></View>
                <View style={[styles.price_line]}>
                    <View style={styles.transport_company} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Image
                                source={require("../assets/images/pochta.png")}
                                style={styles.card_img}
                            />
                            <View style={{ marginLeft: '5%' }} >
                                <Text style={[styles.subtext, themeSubTextStyle]} >Доставка</Text>
                                <Text style={[styles.text_type, themeTextStyle]} >Почта России</Text>
                            </View>
                        </View>
                        <Text style={[styles.price_line_price, themeTextStyle]} >500 ₽</Text>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: '#fff' }}></View>
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeSubTextStyle]} >Итоговая стоимость</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >250 ₽</Text>
                </View>
            </View>

            <View style={{ height: 150, width:'100%', marginTop:'5%' }}>
                <View style={styles.container_mileonair} >
                    <View  >
                        <Text style={[styles.value, themeTextStyle]} >Оплатить милями MILEONAIR</Text>
                        <Text style={[styles.label_mile, themeSubTextStyle]} >3 600 миль</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#23232A14", true: "#23232A14" }}
                        thumbColor={isEnabled ? "#F5CB57" : "#F2F2F3"}
                        ios_backgroundColor="#23232A14"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                {isEnabled &&
                    <View style={[{ borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }, themeContainerSelectStyle]}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignItems: 'center', alignContent: 'center', paddingHorizontal: 20, paddingVertical: 6 }}>
                                <Icon
                                    name="airplane"
                                    type="ionicon"
                                    color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                />
                                <Text style={themeSubTextStyle} >миль</Text>
                            </View>
                            <View style={[{ width: 1, backgroundColor:'#fff' }, themeContainerStyle]}></View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingHorizontal: 20 }}>
                            <TextInput
                                value={mile}
                                placeholder="40"
                                style={[styles.text_input, themeTextStyle]}
                                keyboardType="number-pad"
                            />
                            <Text style={[{ textAlign: 'right', fontSize: 12, fontFamily: "Inter_400Regular" }, themeSubTextStyle]} >Мининимальное {"\n"}списание 40 миль</Text>
                        </View>
                    </View>
                }
            </View>


            <View style={styles.type_pay} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Image
                        source={require("../assets/images/visa.png")}
                        width={50}
                        height={50}
                        style={styles.card_img}
                    />
                    <View style={{ marginLeft: '5%' }} >
                        <Text style={[styles.text_type, themeTextStyle]} >Способ оплаты</Text>
                        <Text style={[styles.subtext, themeSubTextStyle]} >Visa **** 1679</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Text style={[styles.subtext, themeSubTextStyle]} >Изменить</Text>
                    <Icon
                        name="chevron-forward-outline"
                        type="ionicon"
                        color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                    />
                </View>
            </View>

            <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={() => navigation.navigate('accept_luggage')} >
                <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Оплатить</Text>
            </TouchableOpacity>

            <BottomSheetModalProvider>
                <View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        backgroundStyle={{ backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C' }}
                    >
                        <Text style={[styles.bottom_title, themeTextStyle]} >Транспортная компания</Text>
                        <View style={{ padding: '4%' }}>
                            <View style={styles.inline}>
                                <View style={styles.row}>
                                    <Image source={require('../assets/images/sdek.png')} style={{ marginRight: 10 }} />
                                    <View style={{ alignItems: 'flex-start' }}>
                                        <Text style={[styles.bottom_title, themeTextStyle]} >СДЭК</Text>
                                        <Text style={[styles.label, { marginTop: 4 }, themeSubTextStyle]} >Дата доставки: 24 декабря</Text>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.label, { marginRight: 16 }, themeSubTextStyle]} >1 000 ₽</Text>
                                    <BouncyCheckbox
                                        size={24}
                                        fillColor='#F5CB57'
                                        unfillColor={colorScheme === 'light' ? '#23232A14' : '#F2F2F31F'}
                                        iconStyle={{
                                            borderWidth: 0
                                        }}
                                        disableText={true}
                                        checkIconImageSource={null}
                                    />
                                </View>
                            </View>
                            <View style={styles.inline}>
                                <View style={styles.row}>
                                    <Image source={require('../assets/images/dhl.png')} style={{ marginRight: 10 }} />
                                    <View style={{ alignItems: 'flex-start' }}>
                                        <Text style={[styles.bottom_title, themeTextStyle]} >DHL</Text>
                                        <Text style={[styles.label, { marginTop: 4 }, themeSubTextStyle]} >Дата доставки: 24 декабря</Text>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.label, { marginRight: 16 }, themeSubTextStyle]} >1 000 ₽</Text>
                                    <BouncyCheckbox
                                        size={24}
                                        fillColor='#F5CB57'
                                        unfillColor={colorScheme === 'light' ? '#23232A14' : '#F2F2F31F'}
                                        iconStyle={{
                                            borderWidth: 0
                                        }}
                                        disableText={true}
                                        checkIconImageSource={null}
                                    />
                                </View>
                            </View>
                            <View style={styles.inline}>
                                <View style={styles.row}>
                                    <Image source={require('../assets/images/pochta_rus.png')} style={{ marginRight: 10 }} />
                                    <View style={{ alignItems: 'flex-start' }}>
                                        <Text style={[styles.bottom_title, themeTextStyle]} >Почта России</Text>
                                        <Text style={[styles.label, { marginTop: 4 }, themeSubTextStyle]} >Дата доставки: 24 декабря</Text>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.label, { marginRight: 16 }, themeSubTextStyle]} >1 000 ₽</Text>
                                    <BouncyCheckbox
                                        size={24}
                                        fillColor='#F5CB57'
                                        unfillColor={colorScheme === 'light' ? '#23232A14' : '#F2F2F31F'}
                                        iconStyle={{
                                            borderWidth: 0
                                        }}
                                        disableText={true}
                                        checkIconImageSource={null}
                                    />
                                </View>
                            </View>
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </View>
    )
}

export default SelectTransportCompany

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%',
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center'
    },
    container_price: {
        borderRadius: 16,
        marginTop: "10%",
    },
    price_line: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: "7%",
        alignItems: 'center'
    },
    line: {
        height: 2
    },
    price_line_text: {
        fontSize: 16,
        fontFamily: "Inter_400Regular"
    },
    price_line_price: {
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold"
    },
    container_select: {
        width: "100%",
    },
    label: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
    },
    select: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 10,
        padding: '3%'
    },
    btn: {
        position: 'absolute',
        backgroundColor: '#F5CB57',
        width: '100%',
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
        bottom: "5%",
        elevation: 12,
    },
    type_pay: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        // marginTop: "40%"
    },
    transport_company: {
        alignItems: 'center',
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
    },
    card_img: {
        width: 32,
        height: 32,
        borderRadius: 50
    },
    text_type: {
        fontFamily: "Inter_700Bold",
        fontSize: 16,
    },
    value: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold"
    },
    bottom_title: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
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
    container_mileonair: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems:'center'
    },
    text_input: {
        fontSize: 32,
        fontFamily: 'Inter_800ExtraBold',
        // color: "#0C0C0D7A",
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