import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { db } from "./config";



// V2
export async function storeData(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))        
    } catch(e){
        console.log("error occured during store data", e)
            return null
    }
}

export function addNewItem(key, value) {
    db.ref('/items').child(value['key']).set(value);
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
state = {
    items: [],
};
export function fbReadAllData() {
    db.ref("/items").on("value", (dataSnapshot) => {
        let data = dataSnapshot.val() ? dataSnapshot.val() : {};
        let items = Object.values(data);
        return items;
    });
}

// // V2
export async function readDataByOne(key) {
    
    try {
        const data = await AsyncStorage.getItem(key)
        if(data != null){
            return JSON.parse(data)
        } else {
            return []
        }
    }catch(e){
        console.log("error occured during reading data", e)
    }
}

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

export function clearItems() {
    try {
        db.ref('/items').remove();
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

export function fbRemoveDataByOne(key) {
    try {
        db.ref('/items/' + key).remove();
    } catch(error) {
        console.log(error);
    }
}