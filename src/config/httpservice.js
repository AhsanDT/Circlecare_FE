import { Alert } from 'react-native';
import axios from "axios";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_Url } from "./config";

const instance = axios.create({
    baseURL: base_Url,
    timeout: 50000, // Timeout set to 50,000 milliseconds (50 seconds)
    headers: {
        "Content-Type": "application/json",
    },
});

const checkInternetConnection = async () => {
    const netInfoState = await NetInfo.fetch();
    return netInfoState.isConnected;
};

instance.interceptors.request.use(async (config) => {
    const isInternetConnected = await checkInternetConnection();

    if (!isInternetConnected) {
        Alert.alert('No Internet Connection', 'Please check your internet connection.');
        throw new Error('No Internet Connection');
    }

    const storedToken = await AsyncStorage.getItem("Token");

    // Add Authorization header only if a valid token is available
    if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
    }

    return config;
});

export default instance;