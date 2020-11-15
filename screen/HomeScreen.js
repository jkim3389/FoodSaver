import React, { useEffect, useState, useRef } from "react";
import {
  StatusBar,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import logo from "../assets/logo.png";
import setting from "../assets/setting.png";
import Background from "../components/Background";
import { clearData, clearItems } from "../utils/storageManager";
import { db, auth } from "../utils/config";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen(props) {
  const onSignout = () => {
    auth
      .signOut()
      .then((res) => {
        Alert.alert("Signed out!");
        props.navigation.navigate("LogIn");
      })
      .catch((err) => Alert.alert(err.message));
  };

  const onClearHandler = () => {
    clearData();
    clearItems();
  };

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Background>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        <TouchableOpacity onPress={() => props.navigation.navigate("Setting")}>
          <Image source={setting} style={styles.setting} />
        </TouchableOpacity>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("MyFridge")}
        >
          <Text style={styles.buttonText}>View My Fridge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("Add Items")}
        >
          <Text style={styles.buttonText}>Add Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSignout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </Background>
    </View>
  );
}
export const screenOptions = (navData) => {
  return {
    title: "Home",
    headerShown: false,
  };
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
    let uid = Constants.installationId;
    db.ref("users_expo_token").child(uid).update({
      expoPushToken: token,
    });
  } else {
    alert("Must use physical device for Push Notifications");
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
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
    alignSelf: "center",
    backgroundColor: "rgba(190, 223, 83, .5)",
    marginTop: 20,
    borderRadius: 30,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1D1C1A",
    textAlign: "center",
    textTransform: "uppercase",
  },
  logo: {
    top: -30,
    width: 370,
    height: 370,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: -30,
  },
  setting: {
    top: -95,
    right: 20,
    alignSelf: "flex-end",
    // position: "absolute",
    height: 50,
    width: 50,
  },
});
