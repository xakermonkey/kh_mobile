import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, Appearance, useColorScheme  } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Icon } from 'react-native-elements';
import Loading from '../Loading';


function Profile({ navigation }) {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;


    const [isEnabled, setIsEnabled] = useState(false);
    const [biometric_type, setBiomentric] = useState("")
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        LocalAuthentication.supportedAuthenticationTypesAsync().then((type)=>{
            if (type.indexOf(1) != -1){
                setBiomentric('Touch ID');
            }else if (type.indexOf(2) != -1){
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
        })
    }, [navigation, colorScheme])

    return (
        <View style={[styles.container, themeContainerStyle]}>
        <ScrollView >
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
                                    style={{marginLeft: 10}}
                                />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline} onPress={() => navigation.navigate('add_email')}>
                        <View>
                            <Text style={[styles.text, themeTextStyle]} >Email</Text>
                        </View>
                        <View style={styles.row_center}>
                            <View style={{alignItems:'flex-end'}}>
                            <Text style={[styles.subtext, themeSubTextStyle]} >Добавить и подтвердить</Text>
                            <Text style={[styles.subtext, {color:'#FF3956'}]} >Ожидается подтверждение</Text>
                            </View>
                            <Icon
                                    name="chevron-forward-outline"
                                    type="ionicon"
                                    color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                    style={{marginLeft: 10}}
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
                                    style={{marginLeft: 10}}
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
                            <Text style={[styles.subtext, themeSubTextStyle]} >Старун Владислав Андреевич</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={[styles.text, themeTextStyle]} >Серия и номер паспорта</Text>
                            <Text style={[styles.subtext, themeSubTextStyle]} >10 86 867527</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={[styles.text, themeTextStyle]} >Дата выдачи</Text>
                            <Text style={[styles.subtext, themeSubTextStyle]} >16 сентября 1990 г.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={[styles.text, themeTextStyle]} >Дата рождения</Text>
                            <Text style={[styles.subtext, themeSubTextStyle]} >24 октября 1985 г.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={[styles.text, themeTextStyle]} >Кем выдан</Text>
                            <Text style={[styles.subtext, themeSubTextStyle]} >Мо Уфмс по Амурской обл. в г. Благовещенске</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline_photo}>
                        <Image source={require('../../assets/images/Profile/photo.png')} style={{ marginRight: 10 }} />
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
                                    style={{marginLeft: 10}}
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
                                    style={{marginLeft: 10}}
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
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.subtext, {lineHeight:18}, themeSubTextStyle]} >Мы зарегистрировали Вас в MILEONAIR. Для того, чтобы начать пользоваться милями Вам необходимо скачать мобильное приложение MILEONAIR</Text>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={[styles.text, themeTextStyle]} >Хочу стать участником MILEONAIR</Text>
                        </View>
                            <Icon
                                    name="chevron-forward-outline"
                                    type="ionicon"
                                    color={colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3'}
                                    style={{marginLeft: 10}}
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
                                    style={{marginLeft: 10}}
                                />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        <Loading/>
        </View>
    )
};

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        marginBottom:'5%'
        // backgroundColor: '#F9F9FA',
    },
    row_center: {
        flexDirection: 'row', alignItems:'center'
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
