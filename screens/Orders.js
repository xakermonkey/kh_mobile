import { Appearance, useColorScheme, StyleSheet, Text, View, TouchableOpacity, Image, Switch } from 'react-native'
import React, { useLayoutEffect, useState, useRef, useMemo, useCallback } from 'react'
import { Icon } from 'react-native-elements'; import { StatusBar } from 'expo-status-bar';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';





const Orders = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeBtnSubText = colorScheme === 'light' ? styles.lightBtnSubText : styles.darkBtnSubText;
    const themeBtnSubText2 = colorScheme === 'light' ? styles.lightBtnSubText2 : styles.darkBtnSubText2;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;
    const themeButtonStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;
    const themeBtn = colorScheme === 'light' ? styles.lightBtn : styles.darkBtn;

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['30%', '30%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerTitle: () => {
                return (<View style={{ alignItems: 'center' }} >
                    <Text style={[styles.title, themeTextStyle]} >Терминал A, 2 этаж</Text>
                    <Text style={[styles.subtext, themeSubTextStyle]} >Шепеметьево</Text>
                </View>)
            },
            headerRight: () => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TouchableOpacity style={{ marginRight: 5 }} activeOpacity={0.5} onPress={() => navigation.navigate('Profile')} >
                            <Image
                                source={require("../assets/images/profile.png")}
                                style={{width:24, height:30}}
                            />
                        </TouchableOpacity>
                    </View>)
            }
        })
    }, [navigation])


    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={[styles.container, themeContainerStyle]} >

            <StatusBar />
            {/* <View style={styles.row_center_between}>
                <Text style={[styles.text, themeTextStyle]} >Показать закрытые заказы</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#23232A14' }}
                    thumbColor={isEnabled ? '#F5CB57' : '#f4f3f4'}
                    ios_backgroundColor="#23232A14"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View> */}


            <View style={[styles.container_location, themeContainerSelectStyle]}>
                <View style={styles.row_center}>
                    <Image source={require('../assets/images/Orders/img1.png')} style={styles.img} />
                    <Image source={require('../assets/images/Orders/img2.png')} style={styles.img} />
                    <Image source={require('../assets/images/Orders/img3.png')} style={styles.img} />
                    <Image source={require('../assets/images/Orders/img4.png')} style={styles.img} />
                </View>
                <View style={{ marginTop: '4%' }}>
                    <View style={styles.row_center_between}>
                        <Text style={[styles.description, themeSubTextStyle]} >Багаж</Text>
                        <Text style={[styles.text_description, themeTextStyle]} >Чемодан</Text>
                    </View>
                    <View style={styles.row_center_between}>
                        <Text style={[styles.description, themeSubTextStyle]} >Камера хранения</Text>
                        <Text style={[styles.text_description, themeTextStyle]} >Терминал A, 2 этаж</Text>
                    </View>
                    <View style={styles.row_center_between}>
                        <Text style={[styles.description, themeSubTextStyle]} >Принят</Text>
                        <Text style={[styles.text_description, themeTextStyle]} >21 сентября 2022</Text>
                    </View>
                    <View style={styles.row_center_between}>
                        <Text style={[styles.description, themeSubTextStyle]} >Стоимость</Text>
                        <Text style={[styles.text_description, themeTextStyle]} >500 ₽</Text>
                    </View>
                    <View style={styles.row_center_between}>
                        <Text style={[styles.description, themeSubTextStyle]} >Хранение </Text>
                        <Text style={[styles.text_description, themeTextStyle]} >2 дня</Text>
                    </View>
                    <View style={styles.row_center_between}>
                        <Text style={[styles.description, themeSubTextStyle]} >Продление хранения </Text>
                        <Text style={[styles.text_description, themeTextStyle]} >250 ₽</Text>
                    </View>
                </View>
                <View style={[styles.row_center_between, { marginTop: '4%' }]}>
                    <View style={styles.row_center}>
                        <BouncyCheckbox
                            size={24}
                            fillColor='#F5CB57'
                            unfillColor={colorScheme === 'light' ? '#23232A14' : '#F2F2F31F'}
                            iconStyle={{
                                borderWidth: 0
                            }}
                            disableText={false}
                            checkIconImageSource={null}
                        />
                        <Text style={[styles.text_select, themeSubTextStyle]} >Выбрать для возврата</Text>
                    </View>
                    <TouchableOpacity activeOpacity={.9} style={[styles.btn_check, themeContainerSelectStyle]} onPress={handlePresentModalPress} >
                        <Text style={[{ fontFamily: 'Inter_700Bold', fontSize: 14 }, themeTextStyle]}>Чеки</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={{ position: 'absolute', bottom: '5%', width: '100%' }}>
                <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={() => navigation.navigate('accept_luggage_mileonair')} >
                    <Text style={{ fontFamily: 'Inter_700Bold', color: '#000', fontSize: 14 }}>Забрать сейчас</Text>
                    <Text style={styles.subtext_btn}>2 единицы на сумму 3 000 ₽</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.9} style={[styles.btn_2, themeBtn]} onPress={() => navigation.navigate('deliver_home')} >
                    <Text style={[{ fontFamily: 'Inter_700Bold', fontSize: 14 }, themeBtnSubText]}>Доставить домой</Text>
                    <Text style={[styles.subtext_btn, themeBtnSubText2]}>2 единицы на сумму 3 000 ₽ + доставка</Text>
                </TouchableOpacity>
            </View>

            <BottomSheetModalProvider>
                <View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        backgroundStyle={{ backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C' }}
                    >
                        <Text style={[styles.text, { textAlign: 'center' }, themeTextStyle]} >Чеки за оплату</Text>

                        <View style={{ padding: '5%' }}>
                            <View style={[styles.row_center_between, { marginBottom: '5%' }]}>
                                <Text style={[styles.text, themeTextStyle]} >Чек за хранение</Text>
                                <Text style={[styles.text_description, { color: '#0C0C0D7A' }, themeSubTextStyle]} >21 сентября 2022</Text>
                            </View>
                            <View style={[styles.row_center_between, { marginBottom: '5%' }]}>
                                <Text style={[styles.text, themeTextStyle]} >Чек за хранение</Text>
                                <Text style={[styles.text_description, { color: '#0C0C0D7A' }, themeSubTextStyle]} >21 сентября 2022</Text>
                            </View>

                            <TouchableOpacity activeOpacity={.9} style={styles.btn_bottomsheet} onPress={() => navigation.navigate('license_luggage')} >
                                <Text style={{ fontFamily: 'Inter_700Bold', color: '#000', fontSize: 14 }}>Сохранить чеки</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    row_center_between: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginTop: '2%',
        width: '100%',
    },
    row_center: {
        flexDirection: 'row', alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center'
    },
    text: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
    },
    subtext: {
    },
    subtext_btn: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
        color:"#0C0C0D7A",
    },
    description: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
    },
    text_description: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
    },
    text_select: {
        fontSize: 12,
        fontFamily: "Inter_400Regular",
    },

    container: {
        flex: 1,
        padding: '3%',
        alignItems: 'center'
    },
    container_location: {
        width: '100%',
        padding: '4%',
        borderRadius: 12,
        marginTop: "5%",
    },
    btn: {
        backgroundColor: '#F5CB57',
        borderRadius: 12,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16,
        elevation: 12,
    },
    btn_2: {
        marginTop: 12,
        borderRadius: 12,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16,
        elevation: 12,
    },

    btn_bottomsheet: {
        backgroundColor: '#F5CB57',
        borderRadius: 12,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16,
        elevation: 12,
    },

    btn_check: {
        borderRadius: 12,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
        paddingHorizontal: '4%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16,
        elevation: 12,
    },

    img: {
        marginRight: 8
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
    lightBtnSubText: {
        color: "#fff",
    },
    darkBtnSubText: {
        color: '#F2F2F37A',
    },
    lightBtnSubText2: {
        color: "#FFFFFF7A",
    },
    darkBtnSubText2: {
        color: '#F2F2F37A',
    },
    lightContainerSelect: {
        backgroundColor: "#23232A14"
    },
    darkContainerSelect: {
        backgroundColor: "#F2F2F31F"
    },
    lightBtn: {
        backgroundColor: "#0C0C0D"
    },
    darkBtn: {
        backgroundColor: "#F2F2F31F"
    },
    lightButton: {
        backgroundColor: "#F2F2F31F"
    },
    darkButton: {
        backgroundColor: "#F5CB57"
    },
})