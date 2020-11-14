import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { db } from "./config";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';



// V2
export async function storeData(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))        
    } catch(e){
        console.log("error occured during store data", e)
            return null
    }
}

export function fbStoreData(key, value) {
    try {
        db.ref('/items').child(key).set(value);
    } catch(e) {
        console.log("error occured during store data", e)
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
        db.ref('/users').remove();
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

export async function schedulePushNotification(notifDay, expireDay, productname, itemID) {
    var cancel_expire_day_notif
    var cancel_notif_day
    db.ref('/users').on("value", (dataSnapshot) => {
        let data = dataSnapshot.val() ? dataSnapshot.val() : {};
        let users = Object.values(data);
        try {
            cancel_expire_day_notif = users[0][itemID]['expire_day_notif_id'];
            cancel_notif_day = users[0][itemID]['days_before_notif_id'];
        } catch(e) {
            // console.log(e)
        }
    });
    await Notifications.cancelScheduledNotificationAsync(cancel_expire_day_notif);
    await Notifications.cancelScheduledNotificationAsync(cancel_notif_day);
    const expire_day_notif = await Notifications.scheduleNotificationAsync({
        content: {
            title: "FoodSaver",
            body: productname + ' is expiring soon!',
            data: { data: 'goes here' },
        },
        trigger: { 
            year: notifDay.getFullYear(),
            month: notifDay.getMonth()+1,
            day: notifDay.getDate(),
            hour: 16,
            minute: 41,
            second: 30,
        },
    });
    const days_before_notif = await Notifications.scheduleNotificationAsync({
        content: {
            title: "FoodSaver",
            body: productname + ' is expiring today!',
            data: { data: 'goes here' },
        },
        trigger: { 
            year: expireDay.getFullYear(),
            month: expireDay.getMonth()+1,
            day: expireDay.getDate(),
            hour: 16,
            minute: 41,
            second: 30,
        },
    });
    db.ref('/users').child(Constants.installationId).child(itemID).child('expire_day_notif_id').set(expire_day_notif)
    db.ref('/users').child(Constants.installationId).child(itemID).child('days_before_notif_id').set(days_before_notif)
}