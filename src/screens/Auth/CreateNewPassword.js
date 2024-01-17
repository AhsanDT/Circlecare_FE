import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, Modal, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import Feather from 'react-native-vector-icons/Feather';

import { FontFamily, Color } from "../../../GlobalStyles";
import Colors from '../../constants/Colors';
import { createNewPass } from '../../redux/actions/auth.actions';
import GradiantButton from '../../components/GradiantButton';
import { moderateScale, moderateScaleVertical, textScale } from '../../utils/responsiveSizes';
import Header from '../../components/Header';
import AuthInput from '../../components/Auth/Input';

const CreateNewPassword = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [passwordalert, setPasswordalert] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false);

  const getuser = async () => {
    let emailll = await AsyncStorage.getItem('emailforgot')
    let otpp = await AsyncStorage.getItem('otp')
    setEmail(emailll)
    setOtp(otpp)
  }

  useEffect(() => {
    getuser()
  }, []);

  const onreset = async () => {
    Keyboard.dismiss();
    if (!email || otp?.length < 6) {
      showMessage({
        message: "Please try again!",
        description: "You are not allow to perform this task!",
        type: "danger",
      });
      return;
    }

    if (password1 !== password2) {
      showMessage({
        message: "Password and Confirm Password Not Match!",
        type: "danger",
      });
      setPasswordalert("Password shoult be same")
      return;
    }

    const body = {
      email: email,
      otp: otp,
      password: password1
    }
    dispatch(createNewPass(body, navigation, setLoading))
  }

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
    setPasswordError(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Color.labelColorDarkPrimary }} behavior="height" keyboardVerticalOffset={10}>
        <Header onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <Text style={styles.title}>{t('create_new_password')}</Text>
          <Text style={styles.txt}>{t('make_new_password_that_different')}</Text>
          <Text style={styles.errorTxt}>{passwordalert !== "" ? "*" + passwordalert : ""}</Text>

          <View style={styles.inputFieldParent}>
            {/* New Password */}
            <AuthInput
              placeholder={t('create_new_password')}
              value={password1}
              onChangeText={value => setPassword1(value)}
              secureTextEntry={!showPassword1}
              leftIcon={
                <Feather
                  name={showPassword1 ? 'eye-off' : 'eye'}
                  size={18}
                  color={Colors.purple}
                  style={{ marginRight: 10 }}
                  onPress={togglePasswordVisibility1}
                />
              }
            />

            {/* Confirm New Password */}
            <AuthInput
              placeholder={t('confirm_new_password')}
              value={password2}
              onChangeText={value => setPassword2(value)}
              secureTextEntry={!showPassword2}
              leftIcon={
                <Feather
                  name={showPassword2 ? 'eye-off' : 'eye'}
                  size={18}
                  color={Colors.purple}
                  style={{ marginRight: 10 }}
                  onPress={togglePasswordVisibility2}
                />
              }
            />

            {passwordError && (
              <Text style={{ color: 'red', marginTop: 10 }}>{t('password_not_the_same_with_new_password')}</Text>
            )}
          </View>
        </View>

        <View style={styles.btnConatiner}>
          <GradiantButton title={t('create_new_password')} onPress={onreset} loading={loading} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20),
    paddingTop: 20,
    flex: 1
  },
  title: {
    fontSize: textScale(28),
    textAlign: 'left',
    color: "#4E4D4F",
    fontWeight: '600',
    fontFamily: FontFamily.poppinsMedium,
  },
  txt: {
    fontSize: textScale(13),
    textAlign: 'left',
    fontWeight: '400',
    color: '#576B74',
    lineHeight: textScale(18)
  },
  inputFieldParent: {
    // marginTop: moderateScaleVertical(20),
    // alignSelf: 'center',
    // width: scale(310),
    gap: 20
  },
  btnConatiner: {
    width: moderateScale(310),
    alignSelf: 'center',
    marginTop: moderateScaleVertical(50),
    paddingBottom: moderateScaleVertical(30)
  },
  errorTxt: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },


  input: {
    width: '90%',
    height: 40,
    fontSize: 16,
    color: 'black'
  },
  toggleButton: {
    padding: 5,
  },
});

export default CreateNewPassword;
