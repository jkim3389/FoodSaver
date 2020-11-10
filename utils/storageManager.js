import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { db, auth } from "./config";

state = {
    items: [],
};

//Local Storage
export async function storeData(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log("error occured during store data", e);
        return null;
    }
}
export async function readData() {
    try {
        const data = await AsyncStorage.getItem("items");
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    } catch (e) {
        console.log("error occured during reading data", e);
    }
}
export async function readDataByOne(key) {
    try {
        const data = await AsyncStorage.getItem(key);
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    } catch (e) {
        console.log("error occured during reading data", e);
    }
}

export async function readAllData() {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items.map((item) => JSON.parse(item[1]));
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
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
}

//Firebase Storage V1

export function fbStoreData(key, value) {
    try {
        db.ref("/items").child(key).set(value);
    } catch (e) {
        console.log("error occured during store data", e);
    }
}

export function addNewItem(key, value) {
    db.ref("/items").child(value[key]).set(value);
}

export function fbReadAllData() {
    db.ref("/items").on("value", (dataSnapshot) => {
        let data = dataSnapshot.val() ? dataSnapshot.val() : {};
        let items = Object.values(data);
        return items;
    });
}

export function clearItems() {
    try {
        db.ref("/items").remove();
        Alert.alert(`Cleared local data`);
    } catch (e) {
        console.log(e);
        Alert.alert(`Error`);
    }
}

export function fbRemoveDataByOne(key) {
    try {
        db.ref("/items/" + key).remove();
    } catch (error) {
        console.log(error);
    }
}

//V2 ------------ THIS IS FIREBASE VERSION UNDER USER ID

// let UID = auth.currentUser.uid

// export function fbStoreData(key, value) {
//     try {
//         db.ref(`/${UID}/items`).child(key).set(value)
//     } catch (e) {
//         console.log("error occured during store data", e);
//     }
// }

// export function addNewItem(key, value) {
//     db.ref(`/${UID}/items`).child(value["key"]).set(value);
// }

// export function fbReadAllData() {
//     db.ref(`/${UID}/items`).on("value", (dataSnapshot) => {
//         let data = dataSnapshot.val() ? dataSnapshot.val() : {};
//         console.log(data)
//         let items = Object.values(data);
//         return items;
//     });
// }

// export function clearItems() {
//     try {
//         db.ref(`/${UID}/items`).remove();
//         Alert.alert(`Cleared local data`);
//     } catch (e) {
//         console.log(e);
//         Alert.alert(`Error`);
//     }
// }

// export function fbRemoveDataByOne(key) {
//     try {
//         db.ref(`/${UID}/items/${key}`).remove();
//     } catch (error) {
//         console.log(error);
//     }
// }
