import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { Camera } from 'expo-camera'

const CameraScreen = ({navigation, route}) => {
    console.log(route.params);

    const cameraRef = useRef();

    const takePhoto = async () => {
        const result = await cameraRef.current.takePictureAsync();
        let shir = result.uri.split(".")
            shir = shir[shir.length - 1]
            const obj = {
                uri: result.uri,
                type: 'image/' + shir,
                name: `img${route.params.img.length + 1}.${shir}`
            }
            // console.log(obj)
            route.params.func((images) => [...images, obj]);
            navigation.goBack();
    }

    return (
        <Camera ref={cameraRef} style={{ width: "100%", height: "100%", flex: 1 }} type='back'>
            <TouchableOpacity onPress={takePhoto} style={{ width: 60, height: 60, borderRadius: 50, borderColor: "white", borderWidth: 5, position: 'absolute', bottom: 50, left: "42%" }} ></TouchableOpacity>
        </Camera>
    )
}

export default CameraScreen

const styles = StyleSheet.create({})