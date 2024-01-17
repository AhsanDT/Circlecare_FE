import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDataFromStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
        return null;
    }
};

export const setDataInStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error setting data in AsyncStorage:", error);
    }
};

export const removeDataFromStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing data from AsyncStorage:", error);
    }
};

export const clearAllDataInStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error("Error clearing all data from AsyncStorage:", error);
    }
};
