// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const resources = {
    en: { translation: require('../locales/en.json') },
    ar: { translation: require('../locales/ar.json') },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: RNLocalize.getLocales()[0].languageCode,
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
