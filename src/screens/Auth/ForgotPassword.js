import React, { useState } from 'react'
import { StyleSheet, Text, View, Keyboard, SafeAreaView, StatusBar } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import { FontFamily } from "../../../GlobalStyles";
import Colors from '../../constants/Colors'
import { useDispatch } from 'react-redux';
import { forgetPass } from '../../redux/actions/auth.actions';
import Header from '../../components/Header';
import { scale, textScale } from '../../utils/responsiveSizes';
import AuthInput from '../../components/Auth/Input';
import GradiantButton from '../../components/GradiantButton';
import { showError } from '../../helper/customToast';

const ForgotPassword = () => {
  const { t } = useTranslation()
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setEmailError('Please Provide a valid email.');
      return false
    }

    setEmailError('');
    return true
  };

  console.log("emailError", email);

  const onforgot = async () => {
    Keyboard.dismiss();

    const isValid = validateEmail();
    if (!isValid) {
      showError('Please please provide a valid email.');
      return;
    }

    const body = {
      email: email.trim()
    }
    AsyncStorage.setItem('emailforgot', email.trim())
    dispatch(forgetPass(body, navigation, setLoading))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View flex={1} style={{ width: '95%' }}>
          <Header />

          <View style={{ marginHorizontal: 20, }}>
            <Text style={styles.heading}>{t('forgot_password')}</Text>
            <Text style={styles.subTxt}>{t('kindly_enter_your_email_so_we_can')}</Text>
          </View>
          <View style={{ marginTop: 40, marginHorizontal: 20, }}>
            <AuthInput
              placeholder={t('email')}
              value={email}
              onChangeText={value => setEmail(value)}
              onBlur={validateEmail}
              error={emailError}
              keyboardType='email-address'
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{ width: scale(310), alignSelf: 'center', paddingBottom: 40 }}>
          <GradiantButton title={t('send_verificarion')} onPress={onforgot} loading={loading} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  heading: {
    fontSize: textScale(28),
    textAlign: 'left',
    fontWeight: '600',
    marginTop: 20,
    color: "#4E4D4F",
    fontFamily: FontFamily.poppinsMedium
  },
  subTxt: {
    fontSize: textScale(13),
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: FontFamily.poppinsRegular,
    color: '#576B74'
  },
})