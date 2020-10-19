import React from "react";
import {
    StatusBar,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from "react-native";
import logo from "../assets/logo.png";
import Background from "../components/Background";
import { clearData, clearItems } from "../utils/storageManager";
export default function HomeScreen(props) {
    const onClearHandler = () => {
        clearData();
        clearItems();
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
        marginTop: 20,
        borderRadius: 30,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color:'#1D1C1A',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    logo: {
        top: -30,
        width: 370,
        height: 370,
        alignSelf:'center',
        justifyContent: "center",
        marginBottom: -30,
    },
});
