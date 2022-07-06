import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { Camera } from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator';
const CameraScreen = ({ navigation, route }) => {

    const cameraRef = useRef();

    const takePhoto = async () => {
        // console.log(await cameraRef.current.getAvailablePictureSizesAsync());
        const result = await cameraRef.current.takePictureAsync({quality: 0.1});
        let H = (result.height /4).toFixed(0);
        let W = (result.width / 4).toFixed(0);
        const img = await ImageManipulator.manipulateAsync(result.uri,
            [
                {resize: {height: parseInt(H), width: parseInt(W)}},
                // {crop: {height: 1000, width: 1000, originX: (W/2).toFixed(0)-500, originY: (H/2).toFixed(0) - 500 }}
                
            ]);
        
        let shir = img.uri.split(".")
        shir = shir[shir.length - 1]
        const obj = {
            uri: img.uri,
            type: 'image/' + shir,
            name: `img${route.params.img.length + 1}.${shir}`
        }
        // console.log(obj)
        route.params.func(obj);
        navigation.goBack();
    }


    return (
        <Camera ref={cameraRef} style={{ flex: 1 }} type='back'>
            <TouchableOpacity onPress={takePhoto} style={{ width: 60, height: 60, borderRadius: 50, borderColor: "white", borderWidth: 5, position: 'absolute', bottom: 50, left: "42%" }} ></TouchableOpacity>
        </Camera>
    )
}

export default CameraScreen

const styles = StyleSheet.create({})