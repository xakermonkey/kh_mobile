import { Appearance, useColorScheme, StyleSheet, Text, View, TouchableOpacity, Switch, TextInput, Platform, Image } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Icon, Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage"
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


const SelectDocument = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;


    /////////////////////////////// BottomSheet Oprions ////////////////////////////
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.snapToIndex(0);
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
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


    //////////////////////// END BOTTOMSHEET /////////////////////////////////

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
                return (<TouchableOpacity onPress={Pass} activeOpacity={0.5}  ><Text style={[{ fontSize: 16, fontFamily: "Inter_800ExtraBold" }, themeTextStyle]} >????????????????????</Text></TouchableOpacity>)
            }
        })
        AsyncStorage.getItem("type_doc").then(td => {
            if (td != null) {
                navigation.replace("document");
            }
        })
    }, [navigation])


    const [images, setImages] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [mile, setMile] = useState("")
    const [type, setType] = useState("?????????????? ????");



    const ClickType = (text) => {
        setType(text);
        bottomSheetRef.current.close();

    }

    const Pass = async () => {
        const token = await AsyncStorage.getItem("token");
        const first_name = await AsyncStorage.getItem("first_name");
        const last_name = await AsyncStorage.getItem("last_name");
        const patronymic = await AsyncStorage.getItem("patronymic");
        const birthday = await AsyncStorage.getItem("birthday");
        const data = new FormData();
        data.append("last_name", last_name);
        data.append("first_name", first_name);
        data.append("patronymic", patronymic);
        data.append("birthday", birthday);
        const res = await fetch(domain + "/set_document",
            {
                method: "POST",
                body: data,
                headers: {
                    "Authorization": "Token " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
        const res_json = await res.json();
        if (res_json.ok == "ok") {
            await AsyncStorage.setItem("first_join", "true");
            navigation.navigate("select_airport");
        }
    }

    const setDoc = async () => {
        await AsyncStorage.setItem("type_doc", type);
        navigation.navigate("document");

    }

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
    }





    return (
        <View style={{flex:1}}>
            <View style={[styles.container, themeContainerStyle]}  >
                <StatusBar />
                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.title, themeTextStyle]} >?????????????? ???????????????????? ????????????</Text>
                    <Text style={[styles.text14, themeSubTextStyle]}>?????? ?????????????????? ???????????????????????? ?? ??????????????????{"\n"}???????????????????????????? ????????????????????</Text>
                </View>
                <View style={{ marginTop: '30%' }} >
                    <Text style={[styles.text14, themeSubTextStyle]} >???????????????? ?????? ??????????????????</Text>
                    <TouchableOpacity activeOpacity={.9} onPress={handlePresentModalPress}>
                        <View style={[styles.select, themeContainerSelectStyle]} >
                            <Text style={[styles.value, themeTextStyle]} >{type}</Text>
                            <Icon
                                name="chevron-down-outline"
                                type="ionicon"
                                color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                {mile != "" && <Text style={[{ fontFamily: 'Inter_500Medium', fontSize: 12, lineHeight: 18, marginTop: 32 }, themeSubTextStyle]}>???? ???????????????????????????????? ?????? ?? MILEONAIR. ?????? ????????, ?????????? ???????????? ???????????????????????? ???????????? ?????? ???????????????????? ?????????????? ?????????????????? ???????????????????? MILEONAIR</Text>}
                <View style={{ marginTop: '30%', }}>
                    <View style={{ marginBottom: "10%" }}>
                        <View style={styles.container_mileonair} >
                            <Text style={[styles.value, themeTextStyle]} >?? ?????????????? ???????????????????? MILEONAIR{"\n"}?? ???????? ????????????/?????????????? ????????</Text>
                            <Switch
                                trackColor={{ false: "#23232A14", true: "#23232A14" }}
                                thumbColor={isEnabled ? "#F5CB57" : "#F2F2F3"}
                                ios_backgroundColor="#23232A14"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>
                    <View style={styles.container_mileonair} >
                        <Text style={[styles.value, themeTextStyle]} >???????? ?????????? ???????????????????? MILEONAIR</Text>
                        <Icon
                            name="chevron-forward-outline"
                            type="ionicon"
                            color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                        />
                    </View>

                </View>
            </View>
            <View style={styles.row}>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text style={[styles.subtext, themeSubTextStyle]} >?????????? ?????? ???????? </Text>
                    <Text style={[styles.subtext, themeSubTextStyle]}>???????????????????? ?????????????</Text>
                </TouchableOpacity>
                <Button buttonStyle={styles.btn} onPress={() => { navigation.navigate('document') }} containerStyle={styles.cont_btn} icon={<AntDesign name="arrowright" size={24} color="#000" />} />
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backdropComponent={CustomBackDrop}
            >
                <Text style={[styles.bottom_title, themeTextStyle]} >?????? ??????????????????</Text>
                <View style={{ padding: '4%' }}>
                    <View style={styles.inline}>
                        <Text style={[styles.bottom_title, themeTextStyle]} >?????????????? ????</Text>
                        <RadioButtonInput
                            obj={{ name: "?????????????? ????" }}
                            index={0}
                            isSelected={type === "?????????????? ????"}
                            onPress={() => ClickType("?????????????? ????")}
                            buttonInnerColor='#F5CB57'
                            buttonOuterColor="#fff"
                            buttonSize={24}
                            buttonOuterSize={31}
                            buttonStyle={{ backgroundColor: '#23232A14' }}

                        />
                    </View>
                    <View style={styles.inline}>
                        <Text style={[styles.bottom_title, themeTextStyle]} >?????????????????????? ??????????????</Text>
                        <RadioButtonInput
                            obj={{ name: "?????????????????????? ??????????????" }}
                            index={1}
                            isSelected={type === "?????????????????????? ??????????????"}
                            onPress={() => ClickType("?????????????????????? ??????????????")}
                            buttonInnerColor='#F5CB57'
                            buttonOuterColor="#fff"
                            buttonSize={24}
                            buttonOuterSize={31}
                            buttonStyle={{ backgroundColor: '#23232A14' }}

                        />
                    </View>
                </View>
            </BottomSheet>
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