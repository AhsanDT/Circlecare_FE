import React, { useEffect } from 'react';
import { View, Text, StyleSheet, I18nManager, SafeAreaView, StatusBar } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

import Colors from '../../constants/Colors';
import { LANGUAGE } from '../../redux/const/const';
import GradiantButton from '../../components/GradiantButton';
import Header from '../../components/Header';
import { moderateScale, moderateScaleVertical, textScale } from '../../utils/responsiveSizes';
import i18n from '../../utils/i18n';
import { updateDeviceLanguageToStorage, getDeviceLanguageFromStorage } from '../../utils/languageUtils';


const LanguageChange = ({ navigation }) => {
  const { t } = useTranslation();
  // const isRTL = I18nManager.isRTL;

  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.auth.languageShort);
  const token = useSelector((state) => state?.auth?.Access_token)

  const data = [
    {
      label: t('english'),
      key: 'en'
    },
    {
      label: t('arabic'),
      key: 'ar'
    },
  ];

  const handleContinueButton = () => {
    if (!selectedLanguage) {
      showMessage({
        message: "Please select an option",
        type: "danger",
      });
      return;
    }

    navigation.navigate('Login');
  };

  const handleOptionSelect = async (option) => {
    if (option.key === selectedLanguage) return;

    let langName = option.key == 'ar' ? 'Arabic' : 'English'

    try {
      dispatch({
        type: LANGUAGE, payload: {
          language: langName,
          languageShort: option?.key
        }
      });

      setTimeout(() => {
        handleLanguageChange(option.key);
      }, 500);

      // Save the selected language to AsyncStorage
      await updateDeviceLanguageToStorage(option.key);
    } catch (error) {
      console.error('Error handling language selection:', error);
    }
  };

  const handleLanguageChange = async (option) => {
    // Set the layout direction based on the selected language
    await i18n.changeLanguage(option);

    if (option === 'ar') {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }

    await RNRestart.restart();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />
      <View style={styles.container}>
        <Header />

        <View flex={1} style={{ paddingTop: 20, paddingHorizontal: moderateScale(20), gap: 16 }}>
          <Text style={styles.txt}>{t('choose_your_preferred_language')}</Text>
          <RadioButtonRN
            initial={data.findIndex((item) => item.key === selectedLanguage) + 1}
            activeColor={Colors.purple}
            box={false}
            data={data}
            selectedBtn={(option) => handleOptionSelect(option)}
          />
        </View>

        {!token && <View style={styles.btnContainer}>
          <GradiantButton title={t('next')} onPress={handleContinueButton} />
        </View>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    textAlign: 'left',
    fontSize: textScale(18),
    fontWeight: '600',
    color: Colors.purple
  },
  btnContainer: {
    width: moderateScale(310),
    alignSelf: 'center',
    paddingBottom: moderateScaleVertical(30)
  },
});

export default LanguageChange;
