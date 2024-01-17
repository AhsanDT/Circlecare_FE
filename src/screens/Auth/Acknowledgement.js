import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, SafeAreaView, StatusBar, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

import Colors from '../../constants/Colors';
import { Register, googleLogin } from '../../redux/actions/auth.actions';
import Header from '../../components/Header';
import GradiantButton from '../../components/GradiantButton';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../../utils/responsiveSizes';
import AuthInput from '../../components/Auth/Input';
import { Color } from '../../../GlobalStyles';

const Acknowledgement = () => {
  const { t } = useTranslation()

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const data = useSelector(state => state?.auth);
  const [sig, setSig] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(true);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  const onNext = () => {
    if (sig == '' || toggleCheckBox == false) {
      setError('Your acknowledgement is required');
    } else {
      onComplete();
    }

    // onComplete();
  };

  const onComplete = () => {
    setLoading(true);
    const body = {
      ...data?.formone,
      user_type: data?.formtwo?.user_type,
      linguistic_prefrences: data?.formtwo?.linguistic_prefrences,
      education_level: data?.formtwo?.education_level,
      cancer_type: data?.formthree?.cancer_type,
      tumor_stage: data?.formthree?.tumor_stage,
      current_cancer_treatment: data?.formthree?.current_cancer_treatment,
      other_conditions: data?.formthree?.other_conditions,
      year_of_diagnose: data?.formthree?.year_of_diagnose,
      regular_checkup_reminders: data?.formthree?.regular_checkup_reminders,
      signature: sig,
      privacy_policy: toggleCheckBox,
      send_agreement_to_email: toggleCheckBox1,
      severity_of_symptoms: data?.formthree?.severity_of_symptoms,
      regular_doctors_appointments:
        data?.formthree?.regular_doctors_appointments,
    };

    // console.log('BODY ===> ', body);

    if (data?.formone?.type == 'google' || data?.formone?.type == 'apple') {
      dispatch(googleLogin(body, setLoading))
    } else {
      dispatch(Register(body, navigation, setLoading));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ backgroundColor: Color.labelColorDarkPrimary, flex: 1 }}>
        <Header title={t('acknowledgement')} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {error && <Text style={styles.errorTxt}>{error}</Text>}
            <Text style={styles.txt}>{t('signature_acknowledge_text')}</Text>

            <View style={{ marginTop: 28 }}>
              <Text style={styles.title}>{t('signature')}</Text>
              <View style={styles.inputFieldParent}>
                <AuthInput
                  placeholder={t('signature')}
                  value={sig}
                  onChangeText={value => setSig(value)}
                />
              </View>

              {/* <View style={styles.signatureContainer}>
              <TextInput
                style={styles.signatureTxt}
                placeholder=" Enter Signature"
                placeholderTextColor="#CECECE"
                value={sig}
                onChangeText={value => setSig(value)}
              /> */}
            </View>

            <View style={[styles.row, styles.agreementContainer, { marginTop: 14, gap: 10 }]}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
                // onFillColor='red'
                // onCheckColor='red'
                // tintColor='#FFFF'
                tintColors={{ true: 'purple', false: 'lightgrey' }}
              />
              <Text style={styles.agreementTxt}>{t('i_accept_the_terms_of_use')}</Text>
            </View>

            <View style={[styles.row, styles.agreementContainer, { alignItems: 'flex-start', marginTop: 10, gap: 10 }]}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox1}
                onValueChange={newValue => setToggleCheckBox1(newValue)}
                // onFillColor='red'
                // onCheckColor='red'
                // tintColor='#FFFF'
                tintColors={{ true: 'purple', false: 'lightgrey' }}
              />
              <Text style={styles.agreementTxt}>{t('automatically_send_the_signature_agreement_to_my_email')}</Text>
            </View>
          </View>

          <View style={styles.btnConatiner}>
            <GradiantButton title={t('completed')} onPress={onNext} loading={loading} />
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                backgroundColor: '#8BB561',
                height: 80,
                width: '90%',
                justifyContent: 'center',
                alignSelf: 'center',
                position: 'absolute',
                bottom: 40,
                borderRadius: 10,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  style={{ marginLeft: 20 }}
                  name="checkmark-circle"
                  size={65}
                  color={'white'}
                />

                <View style={{}}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 12,
                      textAlign: 'center',
                    }}>
                    You have successfully created an account
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20),
    paddingTop: 20,
    flex: 1
  },
  txt: {
    textAlign: 'left',
    fontSize: textScale(13),
    fontWeight: '500',
    color: '#576B74',
    lineHeight: textScale(18)
  },
  title: {
    textAlign: 'left',
    fontSize: textScale(20),
    fontWeight: '500',
    color: Colors.purple,
  },
  inputFieldParent: {
    marginTop: moderateScaleVertical(10),
    // alignSelf: 'center',
    width: scale(310),
    // gap: 10
  },
  signatureContainer: {
    // width: '94%',
    height: scale(140),
    borderWidth: 1,
    borderColor: "#CECECE",
    marginTop: 10,
    borderRadius: 10,
  },
  signatureTxt: {
    fontSize: textScale(14),
    fontWeight: '400',
    color: Colors.black,
    height: '100%',
    textAlignVertical: 'top'
  },
  agreementContainer: {
    alignItems: 'center'
  },
  agreementTxt: {
    textAlign: 'left',
    fontSize: textScale(14),
    fontWeight: '400',
    color: "#576B74",
    flex: 1,
    lineHeight: textScale(18)
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
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
});

export default Acknowledgement;
