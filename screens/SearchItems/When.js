import React, { useLayoutEffect, useState, useMemo, useRef, useCallback } from 'react'
import { Appearance, useColorScheme, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { domain } from '../../domain';
import { Icon } from 'react-native-elements';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


const When = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const [date, setDate] = useState(new Date());
    const [place, setPlace] = useState(["Аэровокзал", "Самолет", "Парковка", "Не помню"]);
    const [selectPlace, setSelectPlace] = useState("Аэровокзал");

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['50%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.snapToIndex(0);
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

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Поиск забытых и потерянных вещей',
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
        })
    }, [navigation])


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const ClickPlace = (obj) => {
        setSelectPlace(obj);
        bottomSheetRef.current.close();
    }


    const renderPlace = (obj, ind) => {
        return(<TouchableOpacity key={ind} activeOpacity={0.5} onPress={() => ClickPlace(obj)} >
            <View style={styles.terminal_line}>
                <View style={styles.name_terminal}>
                    <Text style={[styles.title_bottom, themeTextStyle]} >{obj}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButtonInput
                        obj={obj}
                        index={ind}
                        isSelected={selectPlace == obj}
                        onPress={() => ClickPlace(obj)}
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



    return (
        <View style={[styles.container, themeContainerStyle]}>
            <TouchableOpacity style={styles.container_select} onPress={handlePresentModalPress}>
            <Text style={[styles.title, themeTextStyle]} >Где Вы забыли свои вещи</Text>
                <View style={[styles.select, themeContainerSelectStyle]} >
                    <Text style={[styles.value, themeTextStyle]} >{selectPlace}</Text>
                    <Icon
                        name="chevron-down-outline"
                        type="ionicon"
                        color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                    />
                </View>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1 }}>
                <Text style={[styles.title, themeTextStyle]} >Когда Вы забыли</Text>
                <Text style={[styles.subtext, themeSubTextStyle]}>для ускорения поиска</Text>
                {/* <Text style={[styles.subtext, themeSubTextStyle]}>дополнительных привилегий</Text> */}
                {/* <Text style={[styles.label, themeTextStyle]} >Дата потери</Text> */}
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="calendar"
                    onChange={onChange}
                    locale={"ru-RU"}
                    maximumDate={new Date()}
                    style={{ width: 150, height: 100, right: 5 }}
                />
                {/* <MaskInput autoFocus value={date} style={[styles.inputtext, themeTextStyle]} mask={mask} onChangeText={(masked, unmasked) => setDate(masked)} /> */}
                {/* <KeyboardAvoidingView behavior='padding' style={styles.row}> */}
                {/* <TouchableOpacity activeOpacity={0.5}>
                    <Text style={[styles.subtext, themeSubTextStyle]} >Зачем нам ваши </Text>
                    <Text style={[styles.subtext, themeSubTextStyle]}>паспортные данные?</Text>
                </TouchableOpacity> */}
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'flex-end' }}>
                <Button buttonStyle={styles.btn} onPress={() => navigation.navigate('what_forget')} containerStyle={styles.cont_btn} icon={<AntDesign name="arrowright" size={24} color="#000" />} />
            </View>
            {/* </KeyboardAvoidingView> */}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                enablePanDownToClose={true}
                snapPoints={snapPoints}
                backdropComponent={CustomBackDrop}
                backgroundStyle={{ backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C' }}
            >
                <Text style={[styles.bottom_title, themeTextStyle]} >Место</Text>
                <View style={{ padding: '4%' }}>
                    {place.map((obj, ind) => renderPlace(obj, ind))}
                </View>
            </BottomSheet>
        </View>
    )
}

export default When

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%'
    },
    title: {
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold",
        marginBottom: 8,
    },
    subtext: {
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        marginBottom: 4
    },
    label: {
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        marginTop: '20%'
    },
    picker: {
        height: '40%',
        width: '80%',
        marginBottom: '50%',
    },
    row: {
        flexDirection: 'row',
        // width: '85%',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
    },
    btn: {
        backgroundColor: '#F5CB58',
        width: 64,
        height: 64,
        borderRadius: 64,
        marginBottom: '5%'
    },
    cont_btn: {
        alignItems: 'flex-end',
    },
    inputtext: {
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        marginBottom: '35%'
    },
    bottom_title: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
    },
    container_select: {
        marginBottom: '5%',
        alignItems: 'center'
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
        padding: '3%',
        width: "100%"
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
    title_bottom: {
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
