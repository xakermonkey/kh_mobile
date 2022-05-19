import { Appearance, useColorScheme, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const Terminal = ({navigation}) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    const dateAlert = () =>
    Alert.alert(
      "Заполнить данные о себе",
      "При сдаче багажа необходимо подтверждение личности. Вы можете ускорить процесс оформления, заполнив данные самостоятельно.",
      [
        {
          text: "Заполнить",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Пропустить", onPress: () => navigation.navigate('license_luggage') }
      ]
    );


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colorScheme === 'light' ? '#f2f2f2' : '#17171C'
            },
            headerBackTitleVisible: false,
            headerTintColor: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3',
            headerTitle: () => {
                return(<View style={{ alignItems: 'center'}} >
                            <Text style={[styles.title, themeTextStyle]} >Терминал А, 2 этаж</Text>
                            <Text style={[styles.subtext, themeSubTextStyle]} >Шереметьево</Text>
                        </View>)
            },
            headerRight: () => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TouchableOpacity style={{ marginRight: 5 }} activeOpacity={0.5} onPress={() => navigation.navigate('profile')} >
                            <Image
                                source={require("../assets/images/profile.png")}
                                style={{width:24, height:30}}
                            />
                        </TouchableOpacity>
                    </View>)
            }
        })
    }, [navigation])


  return (
    <SafeAreaView  style={[styles.container, themeContainerStyle]} >
        <StatusBar/>
        <View style={[styles.container_price, themeContainerSelectStyle]} >
            <View style={styles.price_line}>
                <Text style={[styles.price_line_text, themeTextStyle]} >Хранение багажа</Text>
                <Text style={[styles.price_line_price, themeTextStyle]} >500 ₽</Text>
            </View>
            <View style={[styles.line, themeContainerStyle]} ></View>
            <View style={styles.price_line}>
                <Text style={[styles.price_line_text, themeTextStyle]} >Продление хранения</Text>
                <Text style={[styles.price_line_price, themeTextStyle]} >250 ₽</Text>
            </View>
        </View>
        <View style={[styles.container_location, themeContainerSelectStyle]}>
            <Text style={[styles.subtext, themeSubTextStyle]} >Местоположение</Text>
            <Text style={[styles.title, {marginTop: "3%"}, themeTextStyle]} >Терминал А, 2 этаж.{"\n"}Возле стойки информации.</Text>
            <Image 
                source={{"uri": "https://print.packandfly.ru/media/pos/c.jpg"}}
                style={styles.map}
                width="100%"
                height={240}
            />
        </View>
          <TouchableOpacity activeOpacity={.9} style={styles.btn} onPress={dateAlert} >
            <Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>Сдать багаж</Text>
          </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Terminal

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center'
    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    container_price: {
        width: "85%",
        borderRadius: 12,
        marginTop: "7%",
    },
    price_line: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: "7%",
        alignItems: 'center'
    },
    line: {
        width: "100%",
        height: 2
    },
    price_line_text: {
        color: "#0C0C0D",
        fontSize: 16,
        fontFamily: "Inter_400Regular"
    },
    price_line_price: {
        fontSize: 20,
        fontFamily: "Inter_600SemiBold"
    },
    container_location: {
        width: "98%",
        borderRadius: 12,
        marginTop: "7%",
        alignItems: 'center',
        padding: "4%",
    },
    map: {
        marginTop: "7%",
        borderRadius: 12
    },
    btn: {
        position: 'absolute',
        backgroundColor: '#F5CB57',
        width: '90%',
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
        bottom: "5%",
        elevation: 12,
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