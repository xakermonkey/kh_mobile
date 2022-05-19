import { Appearance, useColorScheme, StyleSheet, Text, View, TouchableOpacity, Switch, TextInput, Platform, Image } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Icon, Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BouncyCheckbox from "react-native-bouncy-checkbox";


const SelectDocument = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['25%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerRight: () => {
                return (<TouchableOpacity activeOpacity={0.5}  ><Text style={[{ fontSize: 16, fontFamily: "Inter_800ExtraBold" }, themeTextStyle]} >Пропустить</Text></TouchableOpacity>)
            }
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
            <View style={{ alignItems: 'center' }}>
                <Text style={[styles.title, themeTextStyle]} >Введите паспортные данные</Text>
                <Text style={[styles.text14, themeSubTextStyle]}>для ускорения обслуживания и получения{"\n"}дополнительных привилегий</Text>
            </View>
            <View style={{ marginTop: '30%' }} >
                <Text style={[styles.text14, themeSubTextStyle]} >Выберите тип документа</Text>
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
            </View>
            <Text style={[{fontFamily:'Inter_500Medium', fontSize:12, lineHeight:18, marginTop:32}, themeSubTextStyle]}>Мы зарегистрировали Вас в MILEONAIR. Для того, чтобы начать пользоваться милями Вам необходимо скачать мобильное приложение MILEONAIR</Text>
            <View style={{ marginTop: '30%' }}>
                <View style={{ height: 130 }}>
                    <View style={styles.container_mileonair} >
                        <Text style={[styles.value, themeTextStyle]} >Я являюсь участником MILEONAIR{"\n"}и хочу копить/тратить мили</Text>
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

                <View style={styles.container_mileonair} >
                    <Text style={[styles.value, themeTextStyle]} >Хочу стать участником MILEONAIR</Text>
                    <Icon
                        name="chevron-forward-outline"
                        type="ionicon"
                        color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                    />
                </View>


            </View>
            <View style={styles.row}>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text style={[styles.subtext, themeSubTextStyle]} >Зачем нам ваши </Text>
                    <Text style={[styles.subtext, themeSubTextStyle]}>паспортные данные?</Text>
                </TouchableOpacity>
                <Button buttonStyle={styles.btn} onPress={() => { navigation.navigate('document') }} containerStyle={styles.cont_btn} icon={<AntDesign name="arrowright" size={24} color="#000" />} />
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
                        <Text style={[styles.bottom_title, themeTextStyle]} >Тип документа</Text>
                        <View style={{ padding: '4%' }}>
                            <View style={styles.inline}>
                                <Text style={[styles.bottom_title, themeTextStyle]} >Паспорт РФ</Text>
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
                            <View style={styles.inline}>
                                <Text style={[styles.bottom_title, themeTextStyle]} >Заграничный паспорт</Text>
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
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </View>
    )
}

export default SelectDocument

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%',
    },
    title: {
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold",
        marginBottom: 10
    },
    text14: {
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        lineHeight: 20,
        textAlign: 'center'
    },
    bottom_title: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
    },
    bottom_text: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
        marginTop: '3%'
    },
    price_line_text: {
        fontSize: 16,
        fontFamily: "Inter_400Regular"
    },
    btn: {
        backgroundColor: '#F5CB58',
        width: 64,
        height: 64,
        borderRadius: 64
    },
    type_pay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card_img: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    text_type: {
        fontFamily: "Inter_700Bold",
        fontSize: 16,
    },
    container_input_mileonair: {
        flexDirection: 'row',
        borderRadius: 12,
        marginTop: '5%'
    },
    min_mile: {
        textAlign: 'right',
    },
    text_input: {
        fontSize: 32,
        fontFamily: 'Inter_800ExtraBold',
    },
    bottom_input: {
        padding: '3%',
        borderRadius: 12,
        marginTop: '3%'
    },
    bottom_input_row: {
        paddingVertical: '10%',
        borderRadius: 12,
        marginTop: '3%'
    },
    container_mileonair: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    value: {
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        lineHeight: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
        position: 'absolute',
        bottom: 24,
        width: '100%',
    },
    cont_btn: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    select: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 10,
        padding: '3%'
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: '3%',
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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