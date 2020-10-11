import React from "react";
import {
    StatusBar,
    Image,
    ImageBackground,
    StyleSheet,
    View,
    Button,
    TouchableOpacity,
    Alert,
    Text,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import logo from "../assets/logo.png";
import { greaterThan } from "react-native-reanimated";
import Background from "../components/Background";
import { clearData } from "../utils/storageManager";
export default function HomeScreen(props) {
    const onClearHandler = () => {
        clearData();
    };

    return (
        <View style={styles.container}>
            <Background>
                <StatusBar
                    translucent
                    barStyle="light-content"
                    backgroundColor="transparent"
                />
                <Image source={logo} style={styles.logo} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate("My Fridge")}
                >
                    <Text style={styles.buttonText}>View My Fridge</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate("Add Items")}
                >
                    <Text style={styles.buttonText}>Add Items</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onClearHandler}
                >
                    <Text style={styles.buttonText}>Clear Data</Text>
                </TouchableOpacity>
            </Background>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        top: -30,
        height: "5%",
        width: "45%",
        justifyContent: "space-evenly",
        alignSelf:'center',
        backgroundColor: 'rgba(190, 223, 83, .5)',
        marginTop: 15,
        borderRadius: 30,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color:'#1D1C1A',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    logo: {
        top: -30,
        width: 400,
        height: 400,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: -20,
    },
});
