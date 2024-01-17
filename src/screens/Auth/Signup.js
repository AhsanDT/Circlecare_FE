import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { FontFamily, FontSize, Color, Border, Padding } from '../../../GlobalStyles';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Colors from '../../constants/Colors';
import { FORMONE } from '../../redux/const/const';
import { EmailCheck } from '../../redux/actions/auth.actions';
import { moderateScaleVertical, scale, textScale } from '../../utils/responsiveSizes';
import AuthInput from '../../components/Auth/Input';
import GradiantButton from '../../components/GradiantButton';
import PoweredBy from '../../components/PoweredBy';
import { showError } from '../../helper/customToast';
import CalenderModal from '../../components/Modal/CalenderModal';
import { getDataFromStorage } from '../../utils/asyncStorage';
import DropdownComponent from '../../components/DropdownComponent';
import useDetermineLogo from '../../utils/logoUtils';
import useAuth from './useAuth';

let genderList = [
  { label: 'Male', arabic: 'ذكر', value: 'Male' },
  { label: 'Female', arabic: 'أنثي', value: 'Female' },
  { label: 'Prefer not to say', arabic: 'أفضل عدم الإفصاح', value: 'other' }
]

let maritalStatusList = [
  { label: 'Single', arabic: 'أعزب', value: 'Single' },
  { label: 'Married', arabic: 'متزوج', value: 'Married' },
  { label: 'Divorced', arabic: 'مطلق', value: 'Divorced' },
  { label: 'Prefer not to say', arabic: 'أفضل عدم الإفصاح', value: 'other' }
]

const initialValues = {
  first_name: '',
  last_name: '',
  gender: null,
  dob: '',
  marital_status: null,
  email: '',
  password: '',
  cpassword: '',
};

const Signup = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string().required('Please enter first name'),
    last_name: Yup.string().required('Please enter last name'),
    gender: Yup.string().required('Please select gender'),
    dob: Yup.string().required('Please select date of birth'),
    marital_status: Yup.string().required('Please select status'),
    email: Yup.string().email('Invalid email format').required('Please enter email'),
    password: Yup.string()
      .required('Please enter password')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]*$/, 'Password must be at least 6 characters with letters, numbers, and optional special characters'),
    cpassword: Yup.string()
      .required('Please confirm password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [passerror, setPasserror] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [error, setError] = useState(null);
  const [securetextentry, setSecuretextentry] = useState(true);
  const [securetextentry1, setSecuretextentry1] = useState(true);
  const [emailverify, setEmailverify] = useState(false)

  const { googleLoginHandler, appleLoginHandler } = useAuth(setLoading, setError);

  let logo = useDetermineLogo()

  const emailCheck = async (email) => {
    const data = await dispatch(EmailCheck(email, setError))
    return data;
  }

  function handleCalcAge(birthDate) {
    const momentDate = moment(birthDate, 'DD-MM-YYYY');
    const convertedDate = momentDate.format('YYYY-MM-DD');

    const today = new Date();
    const birthDateObj = new Date(convertedDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age.toString();
  }

  const handleSignup = async (values) => {
    Keyboard.dismiss();
    const fcmToken = await getDataFromStorage('fcmToken');
    setLoading(true);

    const res = await emailCheck(values.email.trim());
    console.log("EMAIL TEST 1111 ====> ", res);
    if (res) {
      setLoading(false);
      showError('Email Already Exists!', 'Please provide a valid email address.');
      console.error('Please provide a valid email!');
      return;
    }

    const body = {
      ...values,
      FCMToken: fcmToken,
    };

    // console.log("body ======> ", body);

    await dispatch({ type: FORMONE, payload: body });
    setLoading(false);
    navigation.navigate('Demographics');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ backgroundColor: Color.labelColorDarkPrimary, flex: 1 }}>
        <ScrollView overScrollMode="never" contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: moderateScaleVertical(28) }}>
            <Image
              style={styles.groupIcon}
              resizeMode="contain"
              source={logo}
            />

            <View style={{ marginVertical: moderateScaleVertical(24) }}>
              <Text style={styles.logIn}>{t('sign_up')}</Text>
              <View style={[styles.flexCenter]}>
                {passerror && <Text style={{ color: 'red' }}>{passerror !== '' ? passerror : ''}</Text>}
              </View>
            </View>

            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={handleSignup}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <>
                  <View style={styles.inputFieldParent}>
                    {/* First Name */}
                    <AuthInput
                      placeholder={t('first_name')}
                      value={values.first_name}
                      onChangeText={handleChange('first_name')}
                      onBlur={handleBlur('first_name')}
                      error={touched.first_name && errors.first_name}
                    />

                    {/* Last Name */}
                    <AuthInput
                      placeholder={t('last_name')}
                      value={values.last_name}
                      onChangeText={handleChange('last_name')}
                      onBlur={handleBlur('last_name')}
                      error={touched.last_name && errors.last_name}
                    />

                    {/* Gender */}
                    <DropdownComponent
                      placeholder={t('gender')}
                      value={values.gender}
                      setValue={(value) => handleChange('gender')(value)}
                      data={genderList}
                      error={touched.gender && errors.gender}
                      allowArabic={true}
                    />

                    {/* DOB */}
                    <TouchableOpacity
                      onPress={() => setOpen(true)}
                      style={{
                        height: 56,
                        width: '100%',
                        backgroundColor: 'transparent',
                        alignSelf: 'center',
                        borderRadius: scale(7),
                        borderWidth: 1,
                        borderColor: Colors.light,
                      }}>
                      <View style={{ top: 10, marginHorizontal: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            marginTop: 5,
                            color: values.dob === '' ? 'lightgrey' : 'black',
                            textAlign: 'left'
                          }}>
                          {values.dob || t('date_of_birth')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {touched.dob && errors.dob && <Text style={styles.errorMsg}>{errors.dob}</Text>}

                    {/* Age */}
                    <AuthInput
                      placeholder={t('age')}
                      editable={false}
                      value={values.dob && handleCalcAge(values.dob).toString() || ''}
                      keyboardType="number-pad"
                    />

                    {/* Check Under 18 */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        // onFillColor='red'
                        // onCheckColor='red'
                        // tintColor='#FFFF'
                        tintColors={{ true: 'purple', false: 'lightgrey' }}
                      />
                      <Text style={{ color: 'black', marginLeft: 10 }}>{t('under_18')}</Text>
                    </View>

                    {/* Maritial Status */}
                    <DropdownComponent
                      placeholder={t('marital_status')}
                      value={values.marital_status}
                      setValue={(value) => handleChange('marital_status')(value)}
                      data={maritalStatusList}
                      error={touched.marital_status && errors.marital_status}
                      allowArabic={true}
                    />

                    {/* Email */}
                    <AuthInput
                      placeholder={t('email')}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={(touched.email && errors.email) || (values.emailverify && "Email already exists")}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />

                    {/* Password */}
                    <AuthInput
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

                    {/* Confirm Password */}
                    <AuthInput
                      placeholder={t('confirm_password')}
                      value={values.cpassword}
                      onChangeText={handleChange('cpassword')}
                      onBlur={handleBlur('cpassword')}
                      error={touched.cpassword && errors.cpassword}
                      secureTextEntry={securetextentry1}
                      autoCapitalize="none"
                      leftIcon={
                        <Feather
                          name={securetextentry1 ? 'eye-off' : 'eye'}
                          size={18}
                          color={Colors.purple}
                          style={{ marginRight: 10 }}
                          onPress={() => setSecuretextentry1(prev => !prev)}
                        />
                      }
                    />
                  </View>

                  <View style={{ width: scale(310), alignSelf: 'center' }}>
                    <View style={[styles.flexRow, styles.groupContainer, { gap: 20 }]}>
                      <View style={styles.line} />
                      <Text style={styles.orSignIn}>{t('or_create_using')}</Text>
                      <View style={styles.line} />
                    </View>

                    {/* social logn  */}
                    <View style={[styles.socialView, styles.flexRow, { gap: 10 }]}>
                      <TouchableOpacity style={styles.socialIcon} onPress={googleLoginHandler}>
                        <Image style={styles.socialImg} resizeMode="contain"
                          source={require("../../../assets/google.png")}
                        />
                      </TouchableOpacity>
                      {Platform.OS === 'ios' && <TouchableOpacity style={styles.socialIcon} onPress={appleLoginHandler}>
                        <Image style={styles.socialImg} resizeMode="contain"
                          source={require("../../../assets/apple.png")}
                        />
                      </TouchableOpacity>}
                    </View>

                    <View style={styles.groupContainer}>
                      <Text style={styles.dontHave}>{t('by_signing_up_to_you_account_you_are_agree')}</Text>
                      <View style={[styles.flexRow, { gap: 4 }]}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('PrivacyPolicy')}>
                          <Text style={[styles.dontHave, { color: '#313131', fontWeight: '500' }]}>
                            {t('privacy_and_policy')}
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.dontHave}>{t('and')}</Text>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('TermsConditions')}>
                          <Text style={[styles.dontHave, { color: '#313131', fontWeight: '500' }]}>
                            {t('terms_conditions')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={[styles.groupContainer, { width: '100%' }]}>
                      <GradiantButton title={t('sign_up')} onPress={handleSubmit} loading={loading} />
                    </View>

                    <View style={styles.groupContainer}>
                      <View style={styles.flexRow}>
                        <Text style={styles.dontHave}>
                          {t('have_an_account')}
                        </Text>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Login')}>
                          <Text style={[styles.dontHave, { color: '#313131', fontWeight: '500' }]}>
                            {' '}{t('sign_in')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {open && <CalenderModal open={open} setOpen={setOpen} date={values?.dob} setDate={handleChange('dob')} />}
                </>
              )}
            </Formik>

            {/* <View style={{width:'90%',marginHorizontal:22,borderWidth:0.5,padding:5,borderRadius:5,marginTop:10,}}>
          <Text style={{fontSize:16,fontWeight:'bold'}}>Note<Text style={{fontSize:14,fontWeight:'400'}}> : You must be 18 years or above to use this app , otherwise you wont be able to signup</Text> </Text>
        </View> */}
          </View>
        </ScrollView>
        <PoweredBy />
      </View>
    </SafeAreaView>
  );
};

export default Signup;

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
  inputFieldParent: {
    marginTop: moderateScaleVertical(20),
    alignSelf: 'center',
    width: scale(310),
    gap: 10
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
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  forgotPasswordTxt: {
    color: '#265565',
    textAlign: 'center',
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

  checkbox: {
    alignSelf: 'center',
  },
  pressable: {
    borderRadius: Border.br_47xl,
    height: '100%',
    backgroundColor: 'transparent',
    width: '100%',
  },
  buttons: {
    height: 45,
    marginTop: 20,
    width: 343,
    borderRadius: 40,
    alignSelf: 'center',
  },
  buttonFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    fontSize: FontSize.size_base,
    fontWeight: '600',
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.labelColorDarkPrimary,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    alignSelf: 'stretch',
    paddingHorizontal: Padding.p_98xl,
    paddingVertical: 0,
    flex: 1,
  },
  errorMsg: {
    color: 'red',
    marginBottom: 5,
  }
});
