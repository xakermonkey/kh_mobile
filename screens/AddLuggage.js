import { Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Switch, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { EvilIcons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain } from '../domain';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


const AddLuggage = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [terminal, setTerminal] = useState(null);
    const [kind, setKind] = useState(null);
    const [selectTerminal, setSelectTerminal] = useState(null);
    const [selectKind, setSelectKind] = useState(0);
    const bottomSheetterminalRef = useRef(null);
    const snapPointsterminal = useMemo(() => ['50%'], []);
    const handlePresentModalTerminalPress = useCallback(() => {
        bottomSheetterminalRef.current?.snapToIndex(0);
    }, []);

    const bottomSheetKindRef = useRef(null);
    const snapPointsKind = useMemo(() => ['50%'], []);
    const handlePresentModalKindPress = useCallback(() => {
        bottomSheetKindRef.current?.snapToIndex(0);
    }, []);

    const bottomSheetInfoRef = useRef(null);
    const snapPointsInfo = useMemo(() => ['50%'], []);
    const handlePresentModalInfoPress = useCallback(() => {
        bottomSheetInfoRef.current?.snapToIndex(0);
    }, []);

    const CustomBackDrop = (props) => {
        return (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                opacity='0.9'
                closeOnPress={false}
                enableTouchThrough={false}
                pressBehavior='none'
            />
        );
    };


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Сдать багаж",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        });
        (async () => {
            const iata = await AsyncStorage.getItem("airport_iata");
            const token = await AsyncStorage.getItem("token");
            const term_id = await AsyncStorage.getItem("terminal_id");
            const res = await axios.get(domain + "/add_luggage", { params: { iata: iata }, headers: { "Authorization": "Token " + token } });
            setKind(res.data.kind);
            setTerminal(res.data.ls);
            setSelectTerminal(res.data.ls.filter((item) => item.id == term_id)[0]);
            console.log(res.data.ls.filter((item) => item.id == term_id)[0]);
        })();
    }, [navigation, colorScheme])


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
            // console.log(obj)
            setImages([...images, obj]);
        }
    };

    const ClickTerminal = (obj) => {
        setSelectTerminal(obj);
        bottomSheetterminalRef.current.close();
    }

    const ClickKind = (ind) => {
        setSelectKind(ind);
        bottomSheetKindRef.current.close();
    }


    const Remove = (id) => {
        setImages((img) => {
            if (img.length === 1) {
                return [];
            }
            return [...img.slice(0, id), ...img.slice(id + 1)];
        })
    }

    const createLuggage = async () => {
        await AsyncStorage.setItem("luggage_ls", selectTerminal.id.toString());
        await AsyncStorage.setItem("luggage_kind", kind[selectKind].id.toString());
        for (let i = 0; i < images.length; i++) {
            await AsyncStorage.setItem(`luggage_file${i + 1}`, images[i].uri);
        }
        navigation.navigate("accept_luggage", { "price": selectTerminal.price_storage, "sale": mile })
    }

    const renderTerminal = (obj) => {
        return (
            <TouchableOpacity key={obj.id} activeOpacity={0.5} onPress={() => ClickTerminal(obj)} >
                <View style={styles.terminal_line}>
                    <View style={styles.name_terminal}>
                        <Text style={[styles.title, themeTextStyle]} >Терминал {obj.terminal}, {obj.floor} этаж</Text>
                        <Text style={[styles.subtext, themeSubTextStyle]} >{obj.location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButtonInput
                            obj={obj}
                            index={obj.id}
                            isSelected={selectTerminal.id == obj.id}
                            onPress={() => ClickTerminal(obj)}
                            buttonInnerColor='#F5CB57'
                            buttonOuterColor="#f2f2f2"
                            buttonSize={24}
                            buttonOuterSize={31}
                            buttonStyle={{ backgroundColor: '#23232A14' }}

                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const rendKind = (obj, ind) => {
        return (
            <TouchableOpacity key={obj.id} activeOpacity={0.5} onPress={() => ClickKind(obj)} >
                <View style={styles.terminal_line}>
                    <View style={styles.name_terminal}>
                        <Text style={[styles.title, themeTextStyle]} >{obj.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButtonInput
                            obj={obj}
                            index={ind}
                            isSelected={selectKind == ind}
                            onPress={() => ClickKind(ind)}
                            buttonInnerColor='#F5CB57'
                            buttonOuterColor="#f2f2f2"
                            buttonSize={24}
                            buttonOuterSize={31}
                            buttonStyle={{ backgroundColor: '#23232A14' }}

                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    if (selectTerminal == null) {
        return (<View>
            <ActivityIndicator />
        </View>)
    }

    return (
        <KeyboardAvoidingView style={[styles.container, themeContainerStyle]} keyboardVerticalOffset={100} behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <StatusBar />
            <View style={[styles.container_price, themeContainerSelectStyle]} >
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeTextStyle]} >Хранение багажа</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >{selectTerminal.price_storage} ₽</Text>
                </View>
                <View style={[styles.line, themeContainerStyle]} ></View>
                <View style={styles.price_line}>
                    <Text style={[styles.price_line_text, themeTextStyle]} >Продление хранения</Text>
                    <Text style={[styles.price_line_price, themeTextStyle]} >{selectTerminal.extension_storage} ₽</Text>
                </View>
            </View>
            <View style={styles.container_select} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.label, themeSubTextStyle]} >Камера хранения</Text>
                    <TouchableOpacity onPress={handlePresentModalInfoPress} ><Feather name="info" size={18} color="#0C0C0D7A" style={{marginLeft: "10%"}} /></TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handlePresentModalTerminalPress()} style={[styles.select, themeContainerSelectStyle]} >
                    <Text style={[styles.value, themeTextStyle]} >Терминал {selectTerminal.terminal}, {selectTerminal.floor} этаж</Text>
                    <Icon
                        name="chevron-down-outline"
                        type="ionicon"
                        color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.container_select} onPress={handlePresentModalKindPress}>
                <Text style={[styles.label, themeSubTextStyle]} >Вид багажа</Text>
                <View style={[styles.select, themeContainerSelectStyle]} >
                    <Text style={[styles.value, themeTextStyle]} >{kind[selectKind].name}</Text>
                    <Icon
                        name="chevron-down-outline"
                        type="ionicon"
                        color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                    />
                </View>
            </TouchableOpacity>
            <View style={{}} >
                <Text style={[styles.textimage, themeTextStyle]}>Прикрепить фото багажа</Text>
                <Text style={[styles.subtext, themeSubTextStyle]}>Сфотографируйте багаж со всех сторон</Text>
                {images.length === 0 ?
                    <TouchableOpacity onPress={pickImage} style={[styles.inputimage, themeContainerSelectStyle]}>
                        <EvilIcons style={[{ marginRight: 12, marginTop: 3 }, themeTextStyle]} name="image" size={28} color="black" />
                        {/* <Image style={{ marginRight: 12, marginTop: 3 }} source={require('../assets/images/ImageSquare.png')} /> */}
                        <View >
                            <Text style={[styles.placesub, themeTextStyle]} >Добавить фото</Text>
                            <Text style={[styles.placesub, themeSubTextStyle]}>Макс. размер фото 10mb</Text>
                        </View>
                    </TouchableOpacity> :
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: "100%", height: 56, flexDirection: 'row', marginTop: "3%" }} >
                        {images.map((item, id) => {
                            return (<TouchableOpacity activeOpacity='0.9' onPress={() => Remove(id)} key={id} ><Image source={{ uri: item.uri }} style={{ width: 56, height: 56, marginRight: 10, borderRadius: 4 }} /></TouchableOpacity>);
                        })}
                        <TouchableOpacity onPress={pickImage} style={styles.add} ><Image height='56' source={require('../assets/images/PlusCircle.png')} /></TouchableOpacity>
                    </ScrollView>
                }
            </View>
            <View style={{ height: 150, marginTop: '8%' }}>
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
                                onChangeText={text => setMile(text)}
                            />
                            <Text style={[{ textAlign: 'right', fontSize: 12, fontFamily: "Inter_400Regular" }, themeSubTextStyle]} >Мининимальное {"\n"}списание 40 миль</Text>
                        </View>
                    </View>
                }
            </View>
            <View style={{}} ></View>
            <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={createLuggage} >
                <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Перейти к оплате</Text>
            </TouchableOpacity>
            <BottomSheet
                ref={bottomSheetterminalRef}
                index={-1}
                backdropComponent={CustomBackDrop}
                snapPoints={snapPointsterminal}
                enablePanDownToClose={true}
                backgroundStyle={{ backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C' }}
            >
                <Text style={[styles.bottom_title, themeTextStyle]} >Камера хранения</Text>
                <View style={{ padding: '4%' }}>
                    {terminal.map((obj) => renderTerminal(obj))}
                </View>
            </BottomSheet>
            <BottomSheet
                ref={bottomSheetKindRef}
                index={-1}
                enablePanDownToClose={true}
                snapPoints={snapPointsKind}
                backdropComponent={CustomBackDrop}
                backgroundStyle={{ backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C' }}
            >
                <Text style={[styles.bottom_title, themeTextStyle]} >Вид вещи</Text>
                <View style={{ padding: '4%' }}>
                    {kind.map((obj, ind) => rendKind(obj, ind))}
                </View>
            </BottomSheet>
            <BottomSheet
                ref={bottomSheetInfoRef}
                index={-1}
                snapPoints={snapPointsInfo}
                enablePanDownToClose={true}
                backdropComponent={CustomBackDrop}
                backgroundStyle={{ backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C' }}
            >
                <Text style={[styles.bottom_title, themeTextStyle]} >Информация о камере хранения</Text>
                <View style={{ padding: '4%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: "5%" }} >
                        <Text style={{ fontSize: 14, color: "#000000", fontFamily: "Inter_600SemiBold" }} >Расположение</Text>
                        <View style={{}}>
                            <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Inter_500Medium", color: "#0C0C0D7A" }} >Терминал {selectTerminal.terminal}, {selectTerminal.floor} этаж</Text>
                            <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Inter_500Medium", color: "#0C0C0D7A" }} >{selectTerminal.location}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: "5%" }} >
                        <Text style={{ fontSize: 14, color: "#000000", fontFamily: "Inter_600SemiBold" }} >Время работы</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Inter_500Medium", color: "#0C0C0D7A" }} >{selectTerminal.work_time}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: "5%" }} >
                        <Text style={{ fontSize: 14, color: "#000000", fontFamily: "Inter_600SemiBold" }} >Условия</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Inter_500Medium", color: "#0C0C0D7A" }} >{selectTerminal.conditions}</Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={.9} style={[styles.btn, { width: "90%", alignSelf: 'center', marginTop: "10%"}]} onPress={() => bottomSheetInfoRef.current.close()} >
                    <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Понятно</Text>
                </TouchableOpacity>
            </BottomSheet>
        </KeyboardAvoidingView>

    )
}

export default AddLuggage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%'
    },
    title: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center'
    },
    container_price: {
        width: "100%",
        borderRadius: 12,
        marginTop: "7%",
        marginBottom: "7%",
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
    btn: {
        backgroundColor: '#F5CB57',
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
    container_select: {
        marginBottom: '5%'
    },
    label: {
        fontSize: 14,
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
    value: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold"
    },
    inputimage: {
        borderRadius: 12,
        flexDirection: 'row',
        paddingVertical: 10,
        marginTop: "3%",
        paddingLeft: 16
    },
    textimage: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        marginTop: "3%"
    },
    add: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        height: 56,
        width: 56,
    },
    container_mileonair: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    label_mile: {
        marginTop: "1%"
    },
    text_input: {
        fontSize: 32,
        fontFamily: 'Inter_800ExtraBold',
    },
    terminal_line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '4%'
    },
    subtext: {
        fontSize: 14,
        fontFamily: "Inter_500Medium"
    },
    bottom_title: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
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