import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity, Keyboard, SafeAreaView, StatusBar, Platform, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { FontFamily, FontSize, Color } from '../../../GlobalStyles';
import Colors from '../../constants/Colors';

import Feather from 'react-native-vector-icons/Feather';
import { userLogin } from '../../redux/actions/auth.actions';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../../utils/responsiveSizes';
import GradiantButton from '../../components/GradiantButton';
import PoweredBy from '../../components/PoweredBy';
import AuthInput from '../../components/Auth/Input';
import { getDataFromStorage } from '../../utils/asyncStorage';
import useDetermineLogo from '../../utils/logoUtils';
import useAuth from './useAuth';

const initialValues = {
  email: '',
  password: '',
};

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Enter your email'),
  password: Yup.string().required('Enter your password')
});

const Login = () => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [securetextentry, setSecuretextentry] = useState(true);
  const [Loginerror, setLoginError] = useState(null);
  const [Loading, setLoading] = useState(false);

  const { googleLoginHandler, appleLoginHandler } = useAuth(setLoading, setLoginError);

  let logo = useDetermineLogo()

  useEffect(() => {
    return () => {
      setLoginError(null)
      // formik.resetForm();
    }
  }, [])

  const handleSignIn = async (values, { setSubmitting }) => {
    Keyboard.dismiss();
    const fcmToken = await getDataFromStorage('fcmToken');

    const data = {
      email: values.email.trim(),
      password: values.password,
      FCMToken: fcmToken
    };

    dispatch(userLogin(data, setLoginError, setLoading));
    setSubmitting(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ backgroundColor: Color.labelColorDarkPrimary, flex: 1 }}>
        <ScrollView overScrollMode="never" contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: moderateScaleVertical(28) }}>
            <Image
              style={styles.groupIcon}
              resizeMode="contain"
              source={logo}
            />

            <View style={{ marginVertical: moderateScaleVertical(24) }}>
              <Text style={styles.logIn}>{t('login')}</Text>
            </View>

            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSignIn}
              innerRef={(formikRef) => (formik = formikRef)} // Save Formik reference
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <>
                  <View style={styles.inputFieldParent}>
                    {Loginerror ? <Text style={styles.error}>{'*' + Loginerror}</Text> : null}
                    <View style={styles.inputContainer}>
                      <AuthInput
                        required
                        placeholder={t('email')}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email}
                        keyboardType='email-address'
                        autoCapitalize="none"
                      />

                      <AuthInput
                        required
                        placeholder={t('password')}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={touched.password && errors.password}
                        secureTextEntry={securetextentry}
                        autoCapitalize="none"
                        leftIcon={
                          <Feather
                            name={securetextentry ? 'eye-off' : 'eye'}
                            size={18}
                            color={Colors.purple}
                            style={{ marginRight: 10 }}
                            onPress={() => setSecuretextentry(prev => !prev)}
                          />
                        }
                      />
                    </View>

                    <Pressable
                      onPress={() => navigation.navigate('ForgotPassword')}>
                      <Text style={[styles.forgotPasswordTxt, { textAlign: isRTL ? 'left' : 'right' }]}>
                        {t('forgot_password')}
                      </Text>
                    </Pressable>

                    <View style={[styles.flexRow, styles.groupContainer, { gap: 20 }]}>
                      <View style={styles.line} />
                      <Text style={styles.orSignIn}>{t('or_sign_in_using')}</Text>
                      <View style={styles.line} />
                    </View>
                  </View>
                  {/* Social Login */}
                  <View style={[styles.socialView, styles.flexRow, { gap: 10 }]}>
                    <TouchableOpacity style={styles.socialIcon} onPress={googleLoginHandler}>
                      <Image style={styles.socialImg} resizeMode="contain"
                        source={require("../../../assets/google.png")}
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.socialIcon} onPress={() => null}>
              <Image style={styles.socialImg} resizeMode="contain"
                source={require("../../../assets/facebook.png")}
              />
            </TouchableOpacity> */}
                    {Platform.OS === 'ios' && <TouchableOpacity style={styles.socialIcon} onPress={appleLoginHandler}>
                      <Image style={styles.socialImg} resizeMode="contain"
                        source={require("../../../assets/apple.png")}
                      />
                    </TouchableOpacity>}
                  </View>
                  <View style={styles.btnContainer}>
                    <GradiantButton title={t('sign_in')} onPress={handleSubmit} loading={Loading} />
                  </View>
                </>
              )}
            </Formik>

            <View style={styles.groupContainer}>
              <View style={styles.flexRow}>
                <Text style={styles.dontHave}>
                  {t('dont_have_an_account')}
                </Text>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Signup')}>
                  <Text style={[styles.dontHave, { color: '#313131', fontWeight: '500' }]}>
                    {' '}{t('sign_up')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView >
        <PoweredBy />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  groupIcon: {
    width: scale(120),
    height: scale(130),
    alignSelf: 'center'
  },

  logIn: {
    fontSize: textScale(28),
    fontWeight: '600',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.dimgray_300,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: moderateScaleVertical(20),
    alignSelf: 'center',
    width: scale(310),
    gap: 10
  },
  inputFieldParent: {
    marginTop: moderateScaleVertical(20),
    alignSelf: 'center',
    width: scale(310),
  },
  input: {
    width: scale(310),
    height: 56,
    borderColor: Colors.light,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    color: 'black',
    alignSelf: 'center',
  },
  inputPasswordContainer: {
    height: 56,
    width: scale(310),
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  forgotPassword: {
  },
  forgotPasswordTxt: {
    marginTop: 6,
    color: '#265565',
    fontSize: textScale(13),
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  orSignIn: {
    color: Color.lightgray,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.defaultRegularFootnote_size,
  },
  line: {
    borderBottomWidth: 0.6,
    borderBottomColor: Color.lightgray,
    flex: 1
  },
  socialView: {
    marginTop: 24,
  },
  socialIcon: {
    height: scale(42),
    width: scale(42),
  },
  socialImg: {
    width: '100%',
    height: '100%'
  },
  dontHave: {
    color: '#8B8B8B',
    fontSize: textScale(13),
    alignItems: 'center'
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  groupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dontHaveAnTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  groupItemLayout: {
    width: 129,
    height: 26,
    top: 0,
    position: 'absolute',
  },

  btnContainer: {
    width: moderateScale(310),
    alignSelf: 'center',
    marginTop: 20
    // paddingBottom: moderateScaleVertical(30)
  },
});

export default Login;
