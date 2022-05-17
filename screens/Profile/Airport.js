import React from 'react';
import { Appearance, useColorScheme, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';




function Airport() {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? styles.lightSubText : styles.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? styles.lightContainerSelect : styles.darkContainerSelect;

    return (
        <View style={styles.container}>
            <View style={styles.panel}>
                <Text style={styles.title} >Камеры хранения</Text>
                <View style={{ marginTop: '5%' }}>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Терминал А</Text>
                            <Text style={styles.subtext} >2 этаж</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >2 заказа</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Терминал А</Text>
                            <Text style={styles.subtext} >2 этаж</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >2 заказа</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Терминал А</Text>
                            <Text style={styles.subtext} >2 этаж</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >2 заказа</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inline}>
                        <View>
                            <Text style={styles.text} >Терминал А</Text>
                            <Text style={styles.subtext} >2 этаж</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtext} >2 заказа</Text>
                            <Image source={require('../../assets/images/Profile/Arrow.png')} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default Airport

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
    panel: {
        backgroundColor: '#23232A14', borderRadius: 16, padding: '4%',
    },
    title: {
        fontFamily: 'Inter_500Medium',
        color: '#0C0C0D7A',
    },
    text: {
        fontFamily: 'Inter_600SemiBold',
    },
    subtext: {
        fontFamily: 'Inter_500Medium',
        color: '#0C0C0D7A'
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
