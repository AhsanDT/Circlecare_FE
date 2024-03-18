import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Color } from '../../../GlobalStyles';
import Colors from '../../constants/Colors';
import { UpdateProfile } from '../../redux/actions/user.action';
import { moderateScale, moderateScaleVertical, scale } from '../../utils/responsiveSizes';
import Header from '../../components/Header';
import AuthInput from '../../components/Auth/Input';
import GradiantButton from '../../components/GradiantButton';
import SuccessModal from '../../components/Modal/SuccessModal';
import CalenderModal from '../../components/Modal/CalenderModal';

const EditProfile = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth?.profile)
  // console.log("USer Data ===> ", userData);

  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [passerror, setPasserror] = useState('');
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [state, setState] = useState({
    first_name: userData?.first_name || '',
    last_name: userData?.last_name || '',
    nickname: userData?.nickname || '',
    dob: userData?.dob || '',
    email: '',
    password: ''
  });

  const handleChange = (key, value) => {
    setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const updateProfile = async () => {
    // if (!state?.first_name || !state?.last_name || !state?.dob) {
    //   setPasserror("All fields are required!")
    //   return;
    // }

    dispatch(UpdateProfile(state, navigation, setLoading, setSuccess));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />
      <View style={{ backgroundColor: Color.labelColorDarkPrimary, flex: 1 }}>
        <Header title={t('edit_profile')} onPress={() => navigation.goBack()} />

        <ScrollView overScrollMode='never' contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.inputFieldParent}>
            <Text style={styles.errorTxt}>{passerror !== '' ? passerror : ''}</Text>

            {/* First Name */}
            <AuthInput
              placeholder={t('first_name')}
              value={state?.first_name}
              onChangeText={value => handleChange("first_name", value)}
              error={error?.firstname}
            />

            {/* Last Name */}
            <AuthInput
              placeholder={t('last_name')}
              value={state?.last_name}
              onChangeText={value => handleChange("last_name", value)}
              error={error?.lastname}
            />

            {/* Nick name */}
            {/* <AuthInput
              placeholder={t('nick_name')}
              value={state?.nickname == "nickname" ? state?.first_name : state?.nickname}
              onChangeText={value => handleChange("nickname", value)}
              error={error?.nickname}
            /> */}

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
              <View style={{ top: 10, left: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 5,
                    color: state?.dob ? 'black' : 'lightgrey',
                    textAlign: 'left'
                  }}>
                  {state?.dob || t('date_of_birth')}
                </Text>
              </View>
            </TouchableOpacity>
            {error?.dob && <Text style={styles.errorMsg}>{error?.dob}</Text>}

            {/* Email */}
            <AuthInput
              placeholder={t('email')}
              value={userData?.email}
              editable={false}
            />
          </View>
          <View style={styles.btnConatiner}>
            <GradiantButton title={t('update')} onPress={updateProfile} loading={loading} />
          </View>
        </ScrollView>

        {success && <SuccessModal open={success} setOpen={setSuccess} message="Your Profile has been updated successfully!" />}
        {open ? <CalenderModal open={open} setOpen={setOpen} date={new Date()} setDate={value => handleChange("dob", value)} /> : null}
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  inputFieldParent: {
    flex: 1,
    marginTop: moderateScaleVertical(20),
    alignSelf: 'center',
    width: scale(310),
    gap: 10
  },
  btnConatiner: {
    width: moderateScale(310),
    alignSelf: 'center',
    paddingVertical: moderateScaleVertical(30)
  },
  errorTxt: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
});
