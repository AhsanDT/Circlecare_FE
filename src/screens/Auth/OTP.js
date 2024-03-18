import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Colors from '../../constants/Colors';
import { FontFamily } from "../../../GlobalStyles";
import { OTTP } from '../../redux/actions/auth.actions';
import Header from '../../components/Header';
import GradiantButton from '../../components/GradiantButton';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../../utils/responsiveSizes';
import { showMessage } from 'react-native-flash-message';

const CELL_COUNT = 6

const OTP = () => {
  const { t } = useTranslation()
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [timer, setTimer] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false);

  const startTimer = () => {
    setIsActive(true);
  };

  const getuser = async () => {
    let emailll = await AsyncStorage.getItem('emailforgot')
    setEmail(emailll)
  }

  useEffect(() => {
    getuser()

    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setIsActive(false);
            return 10; // Reset the timer to 10 seconds
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  const handleSendOtp = async () => {
    if (!email || value?.length < 6) {
      showMessage({
        message: "6 digit otp code is required!",
        type: "danger",
      });
      return;
    }

    const body = {
      "email": email,
      "otp": value
    }
    AsyncStorage.setItem('otp', value)
    dispatch(OTTP(body, navigation, setLoading))
  }

  const regenerate = async () => {
    setIsActive(true);

    await fetch('http://3.87.229.85:8080/appuser/regenerate-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
      .then(response => response.json())
      .then(responseJson => {

        if (responseJson?.success === 1) {
          console.log(responseJson?.success, '=====================')
          console.log(responseJson, 'aaaaaa')

        }
        else {
          alert('Error')
        }

      })
      .catch(error => {
        // alert('failed')

        return error;

      })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ backgroundColor: Colors.white, flex: 1, }}>
        <Header />
        <View style={styles.container}>
          <Text style={styles.title}>{t('lets_verify_you')}</Text>
          <Text style={styles.txt}>{t('we_sent_a_digital_verification')}</Text>
          <Text style={[styles.txt, { color: Colors.black, fontWeight: '500' }]}>{email}</Text>

          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View style={[styles.cell, isFocused && { borderColor: Colors.purple }]}>
                <Text
                  key={index}
                  style={styles.codeTxt}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />

          {/* <View style={{}}>
          <Text>{t('did_not_get_the_code')}{' '}</Text>
          <Text>{t('resend_it')}{' '}{time}</Text>
        </View> */}
        </View>

        <View style={styles.btnConatiner}>
          <GradiantButton title={t('confirm')} onPress={handleSendOtp} loading={loading} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default OTP

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
    lineHeight: textScale(18),
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

  codeFieldRoot: {
    marginTop: 60,
    marginHorizontal: moderateScale(20)
  },
  cell: {
    width: scale(40),
    height: scale(56),
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center'
  },
  codeTxt: {
    color: Colors.purple,
    textAlign: 'center',
    fontSize: textScale(24)
  }
});