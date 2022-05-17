import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Appearance, useColorScheme } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

function PaymentMethods({ navigation }) {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerShadowVisible: false,
            title: 'Способы оплаты',
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
        })
    }, [navigation, colorScheme])

    return (
        <ScrollView style={[styles.container, themeContainerStyle]}>
            <View style={[styles.panel, themeContainerSelectStyle]}>
                <Text style={[styles.title, themeSubTextStyle]} >Выбрать способ оплаты</Text>
                <View style={styles.inline}>
                    <View style={styles.row}>
                        <Image source={require('../../assets/images/Profile/Visa.png')} style={{ marginRight: 10 }} />
                        <Text style={[styles.text, themeTextStyle]} >Visa •••• 6792</Text>
                    </View>
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
                </View>
                <View style={styles.inline}>
                    <View style={styles.row}>
                        <Image source={require('../../assets/images/Profile/Mastercard.png')} style={{ marginRight: 10 }} />
                        <Text style={[styles.text, themeTextStyle]} >Mastercard •••• 4677</Text>
                    </View>
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
                </View>
                <View style={styles.inline}>
                    <View style={styles.row}>
                        <Image source={require('../../assets/images/Profile/Visa.png')} style={{ marginRight: 10 }} />
                        <Text style={[styles.text, themeTextStyle]} >Visa •••• 6792</Text>
                    </View>
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
                </View>
            </View>
        </ScrollView>
    )
};

export default PaymentMethods

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        // backgroundColor: '#F9F9FA',
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: '3%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inline_photo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '3%',
    },
    panel: {
        // backgroundColor: '#23232A14', 
        borderRadius: 16, padding: '4%', marginBottom: '3%',
    },
    title: {
        fontFamily: 'Inter_500Medium',
        // color: '#0C0C0D7A',
        fontSize: 14,
    },
    text: {
        fontSize: 14,
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
