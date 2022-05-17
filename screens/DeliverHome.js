import { Appearance, useColorScheme, StyleSheet, Text, View, TouchableOpacity, Switch, TextInput, Platform } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const DeliverHome = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['100%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Доставить домой",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        })
    }, [navigation])


    const [images, setImages] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [mile, setMile] = useState("")




    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
    }


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);




    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            let shir = result.uri.split(".")
            shir = shir[shir.length - 1]
            const obj = {
                uri: Platform.OS === 'android' ? result.uri : result.uri, //.replace("file://", ""),
                type: 'image/' + shir,
                name: `img${images.length + 1}.${shir}`
            }
            console.log(obj)
            setImages([...images, obj]);
        }
    };



    const Remove = (id) => {
        setImages((img) => {
            if (img.length === 1) {
                return [];
            }
            return [...img.slice(0, id), ...img.slice(id + 1)];
        })
    }

    return (
        <View style={[styles.container, themeContainerStyle]}  >
            <StatusBar />
            <Text style={[styles.text14, themeSubTextStyle]} >Укажите адрес доставки и транспортную компанию, мы рассчитаем стоимость и пришлём вам push-уведомление с информацией о стоимости и дате доставки</Text>

            <View style={{ marginTop: '100%' }}>
                <View style={{ height: 150 }}>
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
                                <View style={[{ width: 2 }, themeContainerStyle]}></View>
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

                <TouchableOpacity activeOpacity={.9} onPress={handlePresentModalPress}>
                    <View style={styles.type_pay} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <View>
                                <Text style={[styles.text_type, themeTextStyle]} >Адрес доставки</Text>
                                <Text style={[styles.subtext, themeSubTextStyle]} >Не указан</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={[styles.subtext, themeSubTextStyle]} >Добавить</Text>
                            <Icon
                                name="chevron-forward-outline"
                                type="ionicon"
                                color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={() => navigation.navigate('select_transport_company')} >
                    <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Создать заявку</Text>
                </TouchableOpacity>
            </View>


            <BottomSheetModalProvider>
                <View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        backgroundStyle={{ backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C' }}
                    >
                        <Text style={[styles.bottom_title, themeTextStyle]} >Новый адрес</Text>
                        <View style={{ padding: '3%' }}>
                            <View>
                                <Text style={[styles.bottom_text, themeSubTextStyle]} >Адрес</Text>
                                <TextInput style={[styles.bottom_input, themeContainerSelectStyle, themeTextStyle]} />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%' }}>
                                <View style={{ width: '30%' }}>
                                    <Text style={[styles.bottom_text, themeSubTextStyle]} >Подъезд</Text>
                                    <TextInput style={[styles.bottom_input_row, themeContainerSelectStyle, themeTextStyle]} />
                                </View>
                                <View style={{ width: '30%' }}>
                                    <Text style={[styles.bottom_text, themeSubTextStyle]} >Этаж</Text>
                                    <TextInput style={[styles.bottom_input_row, themeContainerSelectStyle, themeTextStyle]} />
                                </View>
                                <View style={{ width: '30%' }}>
                                    <Text style={[styles.bottom_text, themeSubTextStyle]} >Квартира</Text>
                                    <TextInput style={[styles.bottom_input_row, themeContainerSelectStyle, themeTextStyle]} />
                                </View>
                            </View>
                            <View>
                                <Text style={[styles.bottom_text, themeSubTextStyle]} >Домофон</Text>
                                <TextInput style={[styles.bottom_input, themeContainerSelectStyle, themeTextStyle]} />
                            </View>

                            <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={() => navigation.navigate('accept_luggage')} >
                                <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Сохранить</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </View>
    )
}

export default DeliverHome

const styles = StyleSheet.create({
    subtext: {
        // color: "#0C0C0D7A",
    },
    container: {
        // backgroundColor: "#F9F9FA",
        flex: 1,
        padding: '4%',
    },
    text14: {
        // color: "#0C0C0D7A",
        fontSize: 14,
        fontFamily: "Inter_500Medium"
    },
    bottom_title: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
    },
    bottom_text: {
        // color: "#0C0C0D7A",
        fontSize: 12,
        fontFamily: "Inter_500Medium",
        marginTop: '3%'
    },
    price_line_text: {
        // color: "#0C0C0D",
        fontSize: 16,
        fontFamily: "Inter_400Regular"
    },
    btn: {
        backgroundColor: '#F5CB57',
        marginTop: '10%',
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
    type_pay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card_img: {
        width: 50,
        height: 50,
        // backgroundColor: "#fff",
        borderRadius: 50
    },
    text_type: {
        // color: "#0C0C0D",
        fontFamily: "Inter_700Bold",
        fontSize: 16,
    },
    container_input_mileonair: {
        flexDirection: 'row',
        borderRadius: 12,
        // backgroundColor: "#23232A14",
        marginTop: '5%'
    },
    min_mile: {
        textAlign: 'right',
        // color: "#0C0C0D7A",
    },
    text_input: {
        fontSize: 32,
        fontFamily: 'Inter_800ExtraBold',
        // color: "#0C0C0D7A",
    },
    bottom_input: {
        // color: "#0C0C0D7A",
        padding: '3%',
        // backgroundColor: "#23232A14",
        borderRadius: 12,
        marginTop: '3%'
    },
    bottom_input_row: {
        // color: "#0C0C0D7A",
        paddingVertical: '10%',
        // backgroundColor: "#23232A14",
        borderRadius: 12,
        marginTop: '3%'
    },
    container_mileonair: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    value: {
        // color: "#0C0C0D",
        fontSize: 14,
        fontFamily: "Inter_500Medium"
    },
    label_mile: {
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