// languageUtils.js

import { getDataFromStorage, setDataInStorage } from "./asyncStorage";

export const getDeviceLanguageFromStorage = async () => {
  try {
    const lang = await getDataFromStorage('lang');
    return lang || 'en'; // Default to 'en' if lang is not available
  } catch (error) {
    console.error('Error getting device language from storage:', error);
    return 'en'; // Default to 'en' in case of an error
  }
};

export const updateDeviceLanguageToStorage = async (lang) => {
  await setDataInStorage('lang', lang);
};
