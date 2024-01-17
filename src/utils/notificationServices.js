import { Platform } from "react-native";
import notifee from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";

import { getDataFromStorage, setDataInStorage } from './asyncStorage';
import navigationService from "../navigation/navigationService";

export async function requestNotificationPermission() {
    try {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            getFCMToken();
            console.log("Notification permission granted");
        } else {
            console.log("Notification permission denied");
        }
    } catch (error) {
        console.log("Error requesting notification permission: ", error);
    }
}

async function getFCMToken() {
    const checkToken = await getDataFromStorage("fcmToken");
    // console.log("FCM Token ==> ", checkToken);

    if (!checkToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                await setDataInStorage("fcmToken", fcmToken);
            }
            console.log("FCM Token:", fcmToken);
        } catch (error) {
            console.log("Error fetching FCM token: ", error);
        }
    }
}

async function onDisplayNotification(data) {
    // Request permissions (required for iOS)
    if (Platform.OS === "ios") {
        await notifee.requestPermission();
    }

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: "default",
        name: "Default Channel",
        sound: "default",
    });

    // Display a notification
    await notifee.displayNotification({
        title: data?.notification?.title,
        body: data?.notification?.body,
        android: {
            channelId,
            // smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
                id: "default",
            },
        },
    });
}

export const notificationListener = async () => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        console.log("A New FCM message received!", remoteMessage);
        await onDisplayNotification(remoteMessage);
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
            "Notification caused app to open from background state:",
            remoteMessage
        );
        handleNotificationAction(remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
            if (remoteMessage) {
                console.log(
                    "Notification caused app to open from quit state:",
                    remoteMessage
                );
                handleNotificationAction(remoteMessage);
            }
        });

    return unsubscribe;
};


const handleNotificationAction = (remoteMessage) => {
    // const redirectTo = remoteMessage?.data?.redirect_to;

    const navigateWithTimeout = (screenName, timeout) => {
        setTimeout(() => {
            navigationService.navigate(screenName);
        }, timeout);
    };

    navigateWithTimeout("Support", 1500);


    // if (redirectTo === "Support") {
    //     // Navigate to "Support" with a timeout of 1500 milliseconds (1.5 seconds)
    //     navigateWithTimeout("Support", 1500);
    // } else {
    //     navigateWithTimeout("DefaultScreen", 1500);
    // }
};