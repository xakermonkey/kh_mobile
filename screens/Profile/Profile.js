import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, Appearance, useColorScheme, RefreshControl } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Icon } from 'react-native-elements';
import Loading from '../Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { month } from '../../params';
import { domain, domain_domain } from '../../domain';
import axios from 'axios';


function Profile({ navigation }) {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;


    const [isEnabled, setIsEnabled] = useState(false);
    const [biometric_type, setBiomentric] = useState("")
    const [FIO, setFIO] = useState("");
    const [numberDoc, setnumberDoc] = useState("");
    const [dateGet, setDateGet] = useState("");
    const [birthday, setBirthday] = useState("");
    const [howGet, setHowGet] = useState("");
    const [avatar, setAvatar] = useState("");
    const [isMile, setisMile] = useState(false);
    const [email, setEmail] = useState("");
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const toggleSwitch = async () => {
        setIsEnabled(previousState => !previousState);
        await AsyncStorage.setItem("biometric", (!previousState).toString());
    }

    const Update = useCallback(async () => {
        const biometric = await AsyncStorage.getItem("biometric");
            if (biometric == "true") {
                setIsEnabled(true);
            } else {
                setIsEnabled(false);
            }
            const last_name = await AsyncStorage.getItem("last_name");
            const first_name = await AsyncStorage.getItem("first_name");
            const patronymic = await AsyncStorage.getItem("patronymic");
            const how_get = await AsyncStorage.getItem("how_get");
            const document = await AsyncStorage.getItem("number_doc");
            const birthday = await AsyncStorage.getItem("birthday");
            const date_get = await AsyncStorage.getItem("date_get");
            const avatar_uri = await AsyncStorage.getItem("avatar");
            const email = await AsyncStorage.getItem("email");
            // console.warn(email);
            setEmail(email);
            if (patronymic != null) {
                setFIO(`${last_name} ${first_name} ${patronymic}`);
            } else if (first_name != null) {
                setFIO(`${last_name} ${first_name}`);
            } else if (last_name != null) {
                setFIO(`${last_name}`);
            }
            if (how_get != null) {
                setHowGet(how_get);
            }
            if (avatar_uri != null) {
                setAvatar(avatar_uri);
            }
            if (document != null) {
                setnumberDoc(document);
            }
            if (birthday != null) {
                let data = new Date(parseInt(birthday));
                console.log(data.toString());
                setBirthday(`${data.getDay()} ${month[data.getMonth()]} ${data.getFullYear()} г.`)
            }
            if (date_get != null) {
                let date = new Date(parseInt(date_get));
                setDateGet(`${date.getDay()} ${month[date.getMonth()]} ${date.getFullYear()} г.`)
            }
            // console.warn("Update");
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(domain + "/get_profile", { headers: { "Authorization": "Token " + token } });
            // console.warn(res.data.verify_email);
            setVerifyEmail(res.data.verify_email);
    }, []) 

    useEffect(() => {
        LocalAuthentication.supportedAuthenticationTypesAsync().then((type) => {
            if (type.indexOf(1) != -1) {
                setBiomentric('Touch ID');
            } else if (type.indexOf(2) != -1) {
                setBiomentric('Face ID');
            }
        })
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerShadowVisible: false,
            title: 'Профиль',
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
        });
        Update();
    }, [navigation, colorScheme])


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await Update();
        setRefreshing(false);
    }, []);

    return (
        <View style={[styles.container, themeContainerStyle]}>
            <ScrollView style={{ padding: '3%', marginBottom: '5%' }}>
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                <View style={[styles.panel, themeContainerSelectStyle]}>
                    <Text style={[styles.title, themeTextStyle]} >Персональные данные</Text>
                    <View style={{ marginTop: '5%' }}>
                        <TouchableOpacity style={styles.inline}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Телефон</Text>
                            </View>
                            <View style={styles.row_center}>
                                <Text style={[styles.subtext, themeSubTextStyle]} >+ 7 963 346 79 35</Text>
                                <Icon
                                    name="chevron-forward-outline"
                                    type="ionicon"
                                    color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                    style={{ marginLeft: 10 }}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inline} onPress={() => navigation.navigate('add_email')}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Email</Text>
                            </View>
                            <View style={styles.row_center}>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={[styles.subtext, themeSubTextStyle]} >{email == "" || email == null ? "Добавить и подтвердить" : email}</Text>
                                    {!verifyEmail && email != null && email != "" && <Text style={[styles.subtext, { color: '#FF3956' }]} >Ожидается подтверждение</Text>}
                                </View>
                                <Icon
                                    name="chevron-forward-outline"
                                    type="ionicon"
                                    color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                    style={{ marginLeft: 10 }}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inline} onPress={() => navigation.navigate('change_pin')}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >ПИН-код</Text>
                            </View>
                            <View style={styles.row_center}>
                                <Text style={[styles.subtext, themeSubTextStyle]} >Изменить</Text>
                                <Icon
                                    name="chevron-forward-outline"
                                    type="ionicon"
                                    color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                    style={{ marginLeft: 10 }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.panel, themeContainerSelectStyle]}>
                    <Text style={[styles.title, themeTextStyle]} >Паспортные данные</Text>
                    <View style={{ marginTop: '5%' }}>
                        <TouchableOpacity style={styles.inline}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >ФИО</Text>
                                <Text style={[styles.subtext, themeSubTextStyle]} >{FIO}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inline}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Серия и номер паспорта</Text>
                                <Text style={[styles.subtext, themeSubTextStyle]} >{numberDoc}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inline}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Дата выдачи</Text>
                                <Text style={[styles.subtext, themeSubTextStyle]} >{dateGet}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inline}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Дата рождения</Text>
                                <Text style={[styles.subtext, themeSubTextStyle]} >{birthday}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inline}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Кем выдан</Text>
                                <Text style={[styles.subtext, themeSubTextStyle]} >{howGet}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inline_photo}>
                            <Image source={{ uri: domain_domain + avatar }} height={30} width={30} style={{ marginRight: 10, width: 30, height: 30, borderRadius: 30 }} />
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Фото паспорта</Text>
                                <Text style={[styles.subtext, themeSubTextStyle]} >ФИО и фото лица</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.panel, themeContainerSelectStyle]}>
                    <Text style={[styles.title, themeTextStyle]} >Настройки</Text>
                    <View style={{ marginTop: '5%' }}>
                        <TouchableOpacity style={styles.inline}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >{biometric_type}</Text>
                            </View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#23232A14' }}
                                thumbColor={isEnabled ? '#F5CB57' : '#f4f3f4'}
                                ios_backgroundColor="#23232A14"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inline} onPress={() => navigation.navigate('choose_language')}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Язык</Text>
                            </View>
                            <View style={styles.row_center}>
                                <Text style={[styles.subtext, themeSubTextStyle]} >Русский</Text>
                                <Icon
                                    name="chevron-forward-outline"
                                    type="ionicon"
                                    color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                    style={{ marginLeft: 10 }}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inline} onPress={() => navigation.navigate('airports')}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Посмотреть закрытые заказы</Text>
                            </View>
                            <Icon
                                name="chevron-forward-outline"
                                type="ionicon"
                                color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inline}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Я являюсь участником MILEONAIR{"\n"}и хочу копить/тратить мили</Text>
                            </View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#23232A14' }}
                                thumbColor={isEnabled ? '#F5CB57' : '#f4f3f4'}
                                ios_backgroundColor="#23232A14"
                                onValueChange={setisMile}
                                value={isMile}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.subtext, { lineHeight: 18 }, themeSubTextStyle]} >Мы зарегистрировали Вас в MILEONAIR. Для того, чтобы начать пользоваться милями Вам необходимо скачать мобильное приложение MILEONAIR</Text>
                        <TouchableOpacity style={styles.inline}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Хочу стать участником MILEONAIR</Text>
                            </View>
                            <Icon
                                name="chevron-forward-outline"
                                type="ionicon"
                                color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.inline} onPress={() => navigation.navigate('add_card')}>
                        <View>
                            <Text style={[styles.text, themeTextStyle]} >MILEONAIR</Text>
                            <Text style={[styles.subtext, themeSubTextStyle]} >Программа лояльности</Text>
                        </View>
                        <View style={styles.row_center}>
                            <Text style={[styles.subtext, themeSubTextStyle]} >Подключить</Text>
                            <Icon
                                    name="chevron-forward-outline"
                                    type="ionicon"
                                    color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                    style={{marginLeft: 10}}
                                />
                        </View>
                    </TouchableOpacity> */}
                        <TouchableOpacity style={styles.inline} onPress={() => navigation.navigate('payment_methods')}>
                            <View>
                                <Text style={[styles.text, themeTextStyle]} >Способы оплаты</Text>
                                <Text style={[styles.subtext, themeSubTextStyle]} >Cертификат защиты PCI DSS</Text>
                            </View>
                            <View style={styles.row_center}>
                                <Text style={[styles.subtext, themeSubTextStyle]} >Добавить</Text>
                                <Icon
                                    name="chevron-forward-outline"
                                    type="ionicon"
                                    color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                    style={{ marginLeft: 10 }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {/* <Loading/> */}
        </View>
    )
};

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F9F9FA',
    },
    row_center: {
        flexDirection: 'row', alignItems: 'center'
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: '3%',
    },
    inline_photo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '3%',
    },
    panel: {
        // backgroundColor: '#23232A14', 
        borderRadius: 16, padding: '4%',
        marginBottom: '3%',
    },
    title: {
        fontFamily: 'Inter_500Medium',
        // color: '#0C0C0D7A',
        fontSize: 14,
    },
    text: {
        fontFamily: 'Inter_600SemiBold',
    },
    subtext: {
        fontFamily: 'Inter_500Medium',
        // color: '#0C0C0D7A',
        fontSize: 12,
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
