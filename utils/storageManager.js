import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";


// export default funcs
export async function storeData(value) {
    try {
        await AsyncStorage.setItem("items", JSON.stringify(value))
    } catch(e){
        console.log("error occured during store data", e)
    }
}

export async function readData() {
    
        try {
            const data = await AsyncStorage.getItem("items")
            if(data != null){
                return JSON.parse(data)
            } else {
                return []
            }
        }catch(e){
            console.log("error occured during reading data", e)
        }
    
}


export async function clearData() {
    try {
        const data = await AsyncStorage.getItem("items");

        if(data){
            await AsyncStorage.clear();            
            Alert.alert(`Cleared local data`);
        } else {
            Alert.alert("There is nothing to delete")
        }
    } catch (e) {
        console.log(e);
        Alert.alert(`Error`);
    }
}
