import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { base_Url } from "./config";

const instance = axios.create({
    baseURL: base_Url,
    timeout: 50000,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(async (config) => {
    const storedToken = await AsyncStorage.getItem("Token");
    return {
        ...config,
        headers: {
            Authorization: `Bearer ${storedToken}`,
        },
    };
});

export default instance;