import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, Appearance, useColorScheme  } from 'react-native';


const Loading = () => {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    return (
        <View style={{position:'absolute', bottom:0, backgroundColor:'#0C0C0D5C'}}>
            <Text>Ожидание подключения</Text>
        </View>
    )
};

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        marginBottom:'5%'
        // backgroundColor: '#F9F9FA',
    },

})
