import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, SafeAreaView, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Color } from "../../../GlobalStyles";
import { ChangePassword } from '../../redux/actions/user.action';
import { showError } from '../../helper/customToast';
import Header from '../../components/Header';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../../utils/responsiveSizes';
import GradiantButton from '../../components/GradiantButton';
import AuthInput from '../../components/Auth/Input';
import SuccessModal from '../../components/Modal/SuccessModal';
import Colors from '../../constants/Colors';

const CreateNewPassword = ({ navigation }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch()
  const changepass = async () => {
    Keyboard.dismiss();

    if (oldPassword.trim() == "" || newPassword.trim() == "" || confirmPassword.trim() == "") {
      showError("All field are required!")
      setError("All field are required!")
      return;
    } else if (newPassword !== confirmPassword) {
      showError("New Password and Confirm Password does not matched")
      setError("New Password and Confirm Password does not matched")
      return;
    }

    const body = {
      old_password: oldPassword,
      password: newPassword
    }
    dispatch(ChangePassword(body, navigation, setLoading, setSuccess))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />
      <View flex={1} style={{ backgroundColor: Color.labelColorDarkPrimary }}>
        <Header title={t('change_password')} onPress={() => navigation.goBack()} />

        <KeyboardAvoidingView flex={1}>
          <View style={styles.container}>
            <View style={{ marginTop: 15, }}>
              <Text style={styles.title}>{t('make_a_new_password_that_different')}</Text>
              <Text style={styles.errorTxt}>{error !== '' ? error : ''}</Text>
            </View>

            <View style={styles.inputFieldParent}>
              {/* Old Password */}
              <AuthInput
                placeholder={t('old_password')}
                value={oldPassword}
                onChangeText={value => setOldPassword(value)}
              />

              {/* New Password */}
              <AuthInput
                placeholder={t('new_password')}
                value={newPassword}
                onChangeText={value => setNewPassword(value)}
              />

              {/* Confirm Password */}
              <AuthInput
                placeholder={t('confirm_password')}
                value={confirmPassword}
                onChangeText={value => setConfirmPassword(value)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.btnConatiner}>
          <GradiantButton title={t('change_password')} onPress={changepass} loading={loading} />
        </View>

        {success && <SuccessModal open={success} setOpen={setSuccess} message="Your Password has been changed successfully!" />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20),
    flex: 1
  },
  title: {
    fontSize: textScale(13),
    fontWeight: '500',
    color: '#576B74',
  },
  inputFieldParent: {
    marginTop: moderateScaleVertical(20),
    alignSelf: 'center',
    width: scale(310),
    gap: 10
  },

  btnConatiner: {
    width: moderateScale(310),
    alignSelf: 'center',
    paddingBottom: moderateScaleVertical(30)
  },
  errorTxt: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
});

export default CreateNewPassword;
