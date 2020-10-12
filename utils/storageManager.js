import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";



// V2
export async function storeData(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))        
    } catch(e){
        console.log("error occured during store data", e)
            return null
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

// // V2
// export async function readDataByOne(key) {
    
//     try {
//         const data = await AsyncStorage.getItem(key)
//         if(data != null){
//             return JSON.parse(data)
//         } else {
//             return []
//         }
//     }catch(e){
//         console.log("error occured during reading data", e)
//     }
// }

export async function readAllData() {
    const keys = await AsyncStorage.getAllKeys()
    const items = await AsyncStorage.multiGet(keys);
    return items.map(item=> JSON.parse(item[1]))
    
}


export async function clearData() {
    try {
            await AsyncStorage.clear();            
            Alert.alert(`Cleared local data`);
    } catch (e) {
        console.log(e);
        Alert.alert(`Error`);
    }
}



export async function removeDataByOne(key) {
    try{
        await AsyncStorage.removeItem(key)
    } catch(error) {
        console.log(error)
    }

}

