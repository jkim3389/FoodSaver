import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { db, auth } from "./config";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

state = {
  items: [],
};

// //Local Storage
// export async function storeData(key, value) {
//     try {
//         await AsyncStorage.setItem(key, JSON.stringify(value));
//     } catch (e) {
//         console.log("error occured during store data", e);
//         return null;
//     }
// }
// export async function readData() {
//     try {
//         const data = await AsyncStorage.getItem("items");
//         if (data != null) {
//             return JSON.parse(data);
//         } else {
//             return [];
//         }
//     } catch (e) {
//         console.log("error occured during reading data", e);
//     }
// }
// export async function readDataByOne(key) {
//     try {
//         const data = await AsyncStorage.getItem(key);
//         if (data != null) {
//             return JSON.parse(data);
//         } else {
//             return [];
//         }
//     } catch (e) {
//         console.log("error occured during reading data", e);
//     }
// }

// export async function readAllData() {
//     const keys = await AsyncStorage.getAllKeys();
//     const items = await AsyncStorage.multiGet(keys);
//     return items.map((item) => JSON.parse(item[1]));
// }

// export async function clearData() {
//     try {
//         await AsyncStorage.clear();
//         Alert.alert(`Cleared local data`);
//     } catch (e) {
//         console.log(e);
//         Alert.alert(`Error`);
//     }
// }

/* 
 
    Version 1

export async function removeDataByOne(key) {
    try {
        db.ref('/items').remove();
        db.ref('/users').remove();
        Alert.alert(`Cleared local data`);
    } catch (e) {
        console.log("error occured during store data", e);
    }
}

export function addNewItem(key, value) {
    db.ref("/items").child(key).set(value);
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


*/

export function getUID() {
  return auth.currentUser.uid;
}

export function fbStoreData(key, value) {
  try {
    db.ref(`/${getUID()}/items`).child(key).set(value);
  } catch (e) {
    console.log("error occured during store data", e);
    return null;
  }
}

export function fbUpdateCategory(key, value) {
  try {
    db.ref(`/${getUID()}/categories`).child(key).set(value);
  } catch (e) {
    console.log("error occured during update categories", e);
    return null;
  }
}

export async function removeDataByOne(key) {
  var cancel_expire_day_notif;
  var cancel_notif_day;
  try {
    db.ref(`/${getUID()}/items/${key}/expire_day_notif_id`).on(
      "value",
      (dataSnapshot) => {
        let data = dataSnapshot.val() ? dataSnapshot.val() : {};
        cancel_expire_day_notif = Object.values(data).join("");
      }
    );
    db.ref(`/${getUID()}/items/${key}/days_before_notif_id`).on(
      "value",
      (dataSnapshot) => {
        let data = dataSnapshot.val() ? dataSnapshot.val() : {};
        cancel_notif_day = Object.values(data).join("");
      }
    );
  } catch (e) {
    // console.log(e)
  }
  await Notifications.cancelScheduledNotificationAsync(cancel_expire_day_notif);
  await Notifications.cancelScheduledNotificationAsync(cancel_notif_day);
  try {
    db.ref(`/${getUID()}/items/${key}`).remove();
    // db.ref(`/${getUID()}/users/${key}`).remove();
    // db.ref(`/users/${Constants.installationId}/${key}`).remove();
    // Alert.alert(`Cleared local data`);
  } catch (e) {
    console.log("error occured during store data", e);
  }
}

export function addNewItem(key, value) {
  db.ref(`/${getUID()}/items`).child(key).set(value);
}

export function fbReadAllData() {
  db.ref(`/${getUID()}/items`).on("value", (dataSnapshot) => {
    let data = dataSnapshot.val() ? dataSnapshot.val() : {};
    let items = Object.values(data);
    return items;
  });
}

export function clearItems() {
  try {
    db.ref(`/${getUID()}/items`).remove();
    Alert.alert(`Cleared local data`);
  } catch (e) {
    console.log(e);
    Alert.alert(`Error`);
  }
}

export function fbRemoveDataByOne(key) {
  try {
    db.ref(`/${getUID()}/items/${key}`).remove();
  } catch (error) {
    console.log(error);
  }
}

export async function schedulePushNotification(
  notifDay,
  expireDay,
  productname,
  itemID
) {
  var cancel_expire_day_notif;
  var cancel_notif_day;
  try {
    db.ref(`/${getUID()}/items/${itemID}/expire_day_notif_id`).on(
      "value",
      (dataSnapshot) => {
        let data = dataSnapshot.val() ? dataSnapshot.val() : {};
        cancel_expire_day_notif = Object.values(data).join("");
      }
    );
    db.ref(`/${getUID()}/items/${itemID}/days_before_notif_id`).on(
      "value",
      (dataSnapshot) => {
        let data = dataSnapshot.val() ? dataSnapshot.val() : {};
        cancel_notif_day = Object.values(data).join("");
      }
    );
  } catch (e) {
    // console.log(e)
  }
  await Notifications.cancelScheduledNotificationAsync(cancel_expire_day_notif);
  await Notifications.cancelScheduledNotificationAsync(cancel_notif_day);
  const expire_day_notif = await Notifications.scheduleNotificationAsync({
    content: {
      title: "FoodSaver",
      body: productname + " is expiring soon!",
      data: { data: "goes here" },
    },
    trigger: {
      year: notifDay.getFullYear(),
      month: notifDay.getMonth() + 1,
      day: notifDay.getDate(),
      hour: 22,
      minute: 32,
      // second: 30,
    },
  });
  const days_before_notif = await Notifications.scheduleNotificationAsync({
    content: {
      title: "FoodSaver",
      body: productname + " is expiring today!",
      data: { data: "goes here" },
    },
    trigger: {
      year: expireDay.getFullYear(),
      month: expireDay.getMonth() + 1,
      day: expireDay.getDate(),
      hour: 22,
      minute: 32,
      // second: 30,
    },
  });
  db.ref(`/${getUID()}/items`)
    .child(itemID)
    .child("expire_day_notif_id")
    .set(expire_day_notif);
  db.ref(`/${getUID()}/items`)
    .child(itemID)
    .child("days_before_notif_id")
    .set(days_before_notif);
}
