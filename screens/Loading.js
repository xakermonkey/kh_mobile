import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, Appearance, useColorScheme } from 'react-native';


const Loading = () => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    return (
        <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#A3A2A5', width: '100%', height: 78 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                <Image source={require('../assets/images/loading.gif')} style={{ width: 24, height: 24 }} />
                <Text style={{ color: '#fff', fontFamily: 'Inter_500Medium', fontSize: 14, marginLeft: '2%' }}>Ожидание подключения</Text>
            </View>
        </View>
    )
};

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        marginBottom: '5%'
        // backgroundColor: '#F9F9FA',
    },

})
