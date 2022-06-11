import React, { useLayoutEffect, useState, useMemo, useRef, useCallback } from 'react'
import { Appearance, useColorScheme, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Keyboard, View, ImageBackground } from 'react-native'
import { Button, Icon } from 'react-native-elements'
// import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { domain, domain_domain } from '../../domain';
// import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Loading from '../Loading';


const What = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;
    const [kind, setKind] = useState();
    const [selectKind, setSelectKind] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Поиск забытых и потерянных вещей',
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
            const res = await axios.get(domain + "/add_luggage", { params: { iata: iata }, headers: { "Authorization": "Token " + token } });
            setKind(res.data.kind);
            setSelectKind(res.data.kind[0]);
        })();
    }, [navigation])

    const bottomSheetKindRef = useRef(null);
    const snapPointsKind = useMemo(() => ['50%'], []);
    const handlePresentModalKindPress = useCallback(() => {
        Keyboard.dismiss();
        bottomSheetKindRef.current?.snapToIndex(0);
    }, []);

    const CustomBackDrop = (props) => {
        return (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                opacity='0.9'
                closeOnPress={true}
                enableTouchThrough={true}
                pressBehavior='close'
            />
        );
    };

    const rendKind = (obj, ind) => {
        return (
            <TouchableOpacity key={obj.id} activeOpacity={0.5} onPress={() => ClickKind(obj)} >
                <View style={styles.terminal_line}>
                    <View style={styles.name_terminal}>
                        <Text style={[styles.bottom_title, themeTextStyle]} >{obj.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButtonInput
                            obj={obj}
                            index={ind}
                            isSelected={selectKind == obj}
                            onPress={() => ClickKind(obj)}
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

    if (selectKind == null) {
        return (<View>
            <Loading title={"Загрузка"} />
        </View>)
    }
    return (
        <View style={[styles.container, themeContainerStyle]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.title, themeTextStyle]} >Что именно Вы потеряли</Text>
                <TextInput multiline placeholder='Описание' style={[{ width: '100%', height: 200, borderRadius: 16, padding: 8, fontFamily: 'Inter_500Medium', fontSize: 16 }, themeContainerSelectStyle]}></TextInput>

                <Text style={[styles.title, themeTextStyle]}>Вид багажа</Text>
                <TouchableOpacity style={styles.container_select} onPress={handlePresentModalKindPress}>
                    <View style={[styles.select, themeContainerSelectStyle]} >
                        <Text style={[styles.value, themeTextStyle]} >{selectKind.name}</Text>
                        <Icon
                            name="chevron-down-outline"
                            type="ionicon"
                            color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                        />
                    </View>
                </TouchableOpacity>

                <Text style={[styles.title, themeTextStyle]}>Какого цвета?</Text>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 30, width: 30, backgroundColor: '#F5CB57', borderRadius: '50%' }}></View>
                    <View style={{ height: 30, width: 30, backgroundColor: '#F5C', borderRadius: '50%', marginLeft:10 }}></View>
                    <View style={{ height: 30, width: 30, backgroundColor: '#F50', borderRadius: '50%', marginLeft:10 }}></View>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={() => navigation.navigate('info_forget')} >
                    <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>ИСКАТЬ</Text>
                </TouchableOpacity>
            </View>
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
        </View>
    )
}

export default What

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%'
    },
    title: {
        fontSize: 16,
        fontFamily: "Inter_800ExtraBold",
        marginTop: 12,
        marginBottom: 8
    },
    inputtext: {
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        marginBottom: '35%'
    },
    row: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
    },
    btn: {
        marginBottom: '5%',
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
    terminal_line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '4%'
    },
    bottom_title: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center'
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
