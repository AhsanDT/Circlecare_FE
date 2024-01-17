/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useEffect, useState } from 'react';
import { LogBox, I18nManager, AppState } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';

import { store, persistor } from '../src/redux/store';
import Navigation from './navigation';
// import socketService from './utils/socketService';
import Socket from './utils/Socket';
import {
  requestNotificationPermission,
  notificationListener,
} from "./utils/notificationServices";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getDeviceLanguageFromStorage } from './utils/languageUtils';
import i18n from './utils/i18n';

const App = () => {
  GoogleSignin.configure({
    androidClientId: "584141500398-o1k8rhma7df09rkh2den2mmgjqacf21e.apps.googleusercontent.com", // client ID of type WEB for your server
    iosClientId: '584141500398-7gttr2hc9vlk44klfamjfdsff148cqgt.apps.googleusercontent.com'
  });

  // const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    requestNotificationPermission();
    notificationListener();
    LogBox.ignoreAllLogs();
  }, [])

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Get the last chosen language from AsyncStorage
        const lastChosenLanguage = await getDeviceLanguageFromStorage();

        // Set the initial language
        await i18n.changeLanguage(lastChosenLanguage);

        // Set layout direction based on the selected language if needed
        if (lastChosenLanguage === 'ar') {
          I18nManager.forceRTL(true);
        } else {
          I18nManager.forceRTL(false);
        }
        // Continue with the rest of your app initialization
      } catch (error) {
        console.error('Error initializing the app:', error);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    Socket.emit("connection");

    return () => {
      Socket.off("new notification");
      Socket.disconnect();
    }
  }, [])

  // useEffect(() => {
  //   AppState.addEventListener('change', handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //     Socket.disconnect();
  //   };
  // }, []);

  // const handleAppStateChange = (nextAppState) => {
  //   if (appState.match(/inactive|background/) && nextAppState === 'active') {
  //     // App has come to the foreground
  //     Socket.connect();
  //   } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
  //     // App has gone to the background
  //     Socket.disconnect();
  //   }

  //   setAppState(nextAppState);
  // };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

export default App;
