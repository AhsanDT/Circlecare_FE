import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

import Colors from '../../constants/Colors';
import { FORMTWO } from '../../redux/const/const';
import { moderateScale, moderateScaleVertical, textScale } from '../../utils/responsiveSizes';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import GradiantButton from '../../components/GradiantButton';

const Demographics = () => {
  const { t } = useTranslation()

  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [iam, setIam] = useState(null)
  const [lang, setLang] = useState(null)
  const [edu, setEdu] = useState(null)
  const [error, setError] = useState('')

  const data = [
    {
      label: t('patient'),
      value: 'Patient'
    },
    {
      label: t('caregiver'),
      value: 'Caregiver'
    }
  ];

  const data1 = [
    {
      label: t('english'),
      value: 'English'
    },
    {
      label: t('arabic'),
      value: 'Arabic'
    }
  ];

  const data2 = [
    {
      label: t('high_school_graduate'),
      value: 'High School Graduate'
    },
    {
      label: t('college_graduate'),
      value: 'College Graduate'
    },
    {
      label: t('prefer_not_to_say'),
      value: 'other'
    },
  ];

  const onNext = () => {
    if (iam == null || lang == null || edu == null) {
      setError('Please answer all questions');
      return
    }

    const body = {
      user_type: iam,
      linguistic_prefrences: lang,
      education_level: edu,
    }
    dispatch({
      type: FORMTWO,
      payload: body
    })
    console.log("Signup form data 222 ====> ", body);

    navigation.navigate("Demographics2")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />
      <View flex={1}>
        <Header onPress={() => navigation.goBack()} />

        <ScrollView overScrollMode='never' contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={{ marginTop: 15, }}>
              <Text style={styles.title}>{t('we_would_like_to_know')}</Text>
              <Text style={styles.errorTxt}>{error !== '' ? error : ''}</Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={styles.subTitle}>{t('ima')}<Text style={styles.required}> *</Text></Text>
              <View style={{ marginTop: 10, }}>
                <RadioButtonRN
                  activeColor={Colors.purple}
                  box={false}
                  // boxStyle={{backgroundColor:Colors.white,border:0,}}
                  data={data}
                  selectedBtn={(e) => setIam(e.value)}
                />
              </View>
            </View>

            <View style={{ marginTop: 30 }}>
              <Text style={styles.subTitle}>{t('choose_your_preferred_language')}<Text style={styles.required}> *</Text></Text>
              <View style={{ marginTop: 10, }}>
                <RadioButtonRN
                  activeColor={Colors.purple}
                  box={false}
                  data={data1}
                  selectedBtn={(e) => setLang(e.value)}
                />
              </View>
            </View>

            <View style={{ marginTop: 30 }}>
              <Text style={styles.subTitle}>{t('education_level')}<Text style={styles.required}> *</Text></Text>
              <View style={{ marginTop: 10, }}>
                <RadioButtonRN
                  activeColor={Colors.purple}
                  box={false}
                  data={data2}
                  selectedBtn={(e) => setEdu(e.value)}
                />
              </View>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <GradiantButton title={t('next')} onPress={onNext} />
          </View>
        </ScrollView>
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
    textAlign: 'left',
    fontSize: textScale(18),
    fontWeight: '600',
    color: Colors.purple,
  },
  subTitle: {
    textAlign: 'left',
    fontSize: textScale(16),
    fontWeight: '500',
    color: Colors.black
  },
  required: {
    fontSize: textScale(18),
    fontWeight: '600',
    color: Colors.red,
  },
  errorTxt: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  btnContainer: {
    width: moderateScale(310),
    alignSelf: 'center',
    paddingBottom: moderateScaleVertical(30)
  },
})

export default Demographics;
