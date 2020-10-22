import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';

export default function Loading(props) {
    return (
        
            <AnimatedLoader
                visible={true}
                overlayColor="rgba(0,0,0,1)"
                source={require("../assets/loading.json")}
                animationStyle={styles.lottie}
                speed={1}
            />

    )
}
const styles = StyleSheet.create({
    
    screen :{
        backgroundColor:"black"
    },
    lottie: {
        width: 300,
        height: 300
    }
})