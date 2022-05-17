import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from 'react-native-elements';
import { Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { color } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

function Profile({ navigation }) {
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.panel}>
                <Text style={styles.title} >Персональные данные</Text>
                <View style={{ marginTop: '5%' }}>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Телефон</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >+ 7 963 346 79 35</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Email</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >vladstarun@gmail.com</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Пароль</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >Изменить</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.panel}>
                <Text style={styles.title} >Паспортные данные</Text>
                <View style={{ marginTop: '5%' }}>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >ФИО</Text>
                            <Text style={styles.subtext} >Старун Владислав Андреевич</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Серия и номер паспорта</Text>
                            <Text style={styles.subtext} >10 86 867527</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Дата выдачи</Text>
                            <Text style={styles.subtext} >16 сентября 1990 г.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Дата рождения</Text>
                            <Text style={styles.subtext} >24 октября 1985 г.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Кем выдан</Text>
                            <Text style={styles.subtext} >Мо Уфмс по Амурской обл. в г. Благовещенске</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline_photo}>
                        <Image source={require('../../assets/images/Profile/photo.png')} style={{ marginRight: 10 }} />
                        <View>
                            <Text style={styles.text} >Фото паспорта</Text>
                            <Text style={styles.subtext} >ФИО и фото лица</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.panel}>
                <Text style={styles.title} >Настройки</Text>
                <View style={{ marginTop: '5%' }}>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >{biometric_type}</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: '#23232A14' }}
                            thumbColor={isEnabled ? '#3333FF' : '#f4f3f4'}
                            ios_backgroundColor="#23232A14"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Язык</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >Русский</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >MILEONAIR</Text>
                            <Text style={styles.subtext} >Программа лояльности</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >Подключить</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline} onPress={() => navigation.navigate('PaymentMethods')}>
                        <View>
                            <Text style={styles.text} >Способы оплаты</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >Добавить</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
};

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        backgroundColor: '#F9F9FA',
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
        backgroundColor: '#23232A14', borderRadius: 16, padding: '4%', marginBottom: '3%',
    },
    title: {
        fontFamily: 'Inter_500Medium',
        color: '#0C0C0D7A',
        fontSize: 14,
    },
    text: {
        fontFamily: 'Inter_600SemiBold',
    },
    subtext: {
        fontFamily: 'Inter_500Medium',
        color: '#0C0C0D7A',
        fontSize: 12,
    },

})
