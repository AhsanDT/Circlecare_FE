import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  I18nManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../../constants/Colors';
import { FORMTHREE } from '../../redux/const/const';
import Header from '../../components/Header';
import GradiantButton from '../../components/GradiantButton';
import { moderateScale, moderateScaleVertical, textScale } from '../../utils/responsiveSizes';
import { showError } from '../../helper/customToast';
import DropdownComponent from '../../components/DropdownComponent';
import MultiSelectComponent from '../../components/MultiSelectComponent';

const Demographics2 = () => {
  const { t } = useTranslation()
  const isRTL = I18nManager.isRTL;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const cancerTypeList = [
    { label: 'None', arabic: 'شئ اخر', value: 'None' },
    { label: 'Bladder Cancer', arabic: 'سرطان المثانه', value: 'Bladder Cancer' },
    { label: 'Breast Cancer', arabic: 'سرطان الثدي', value: 'Breast Cancer' },
    { label: 'Kidney Cancer', arabic: 'سرطان الكلي', value: 'Kidney Cancer' },
    { label: 'Thyroid Cancer', arabic: 'سرطان الغده الدرقية', value: 'Thyroid Cancer' },
    { label: 'Cervical Cancer', arabic: 'سرطان عنق الرحم', value: 'Cervical Cancer' },
    { label: 'Colorectal Cancer', arabic: 'سرطان القولون و المستقيم', value: 'Colorectal Cancer' },
    { label: 'Gynecological Cancer', arabic: 'سرطان امراض النساء', value: 'Gynecological Cancer' },
    { label: 'Head and neck cancers', arabic: 'سرطان الرأس و العنق', value: 'Head and neck cancers' },
    { label: 'Liver cancer', arabic: 'سرطان الكبد', value: 'Liver cancer' },
    { label: 'Lung Cancer', arabic: 'سرطان الرئه', value: 'Lung Cancer' },
    { label: 'Lymphoma', arabic: 'سرطان الغدد الليمفاويه', value: 'Lymphoma' },
    { label: 'Mesothelioma', arabic: 'ورم الظهارة المتوسطة', value: 'Mesothelioma' },
    { label: 'Myeloma', arabic: 'ورم النخاع الشوكي', value: 'Myeloma' },
    { label: 'Ovarian cancer', arabic: 'سرطان المبيض', value: 'Ovarian cancer' },
    { label: 'Prostate cancer', arabic: 'سرطان البروستات', value: 'Prostate cancer' },
    { label: 'Skin cancer', arabic: 'سرطان الجلد', value: 'Skin cancer' },
    { label: 'Uterine cancer', arabic: 'سرطان الرحم', value: 'Uterine cancer' },
    { label: 'Vaginal and vulvar cancers', arabic: 'سرطانات المهبل والفرج', value: 'Vaginal and vulvar cancers' },
  ];
  const tumorStageList = [
    { label: 'None', arabic: 'غير محددة', value: 'None' },
    { label: 'Stage I', arabic: 'مرحله اولي', value: 'Stage I' },
    { label: 'Stage II', arabic: 'مرحله ثانيه', value: 'Stage II' },
    { label: 'Stage III', arabic: 'مرحله رابعة', value: 'Stage III' },
    { label: 'Stage IV', arabic: 'مرحلة خامسه', value: 'Stage IV' },
  ];
  const cancerTreatmentList = [
    { label: 'Radiotherapy', arabic: 'علاج بالإشعاع', value: 'Radiotherapy' },
    { label: 'Chemotherapy', arabic: 'علاج كيماوي', value: 'Chemotherapy' },
    { label: 'Hormonal treatment', arabic: 'علاج هورموني', value: 'Hormonal treatment' },
    { label: 'No Treatments', arabic: 'خطة العلاج غير موجوده', value: 'No Treatments' },
    { label: 'Other', arabic: 'شئ آخر غير ما ذكر سابقا', value: 'other' }
  ];
  const otherConditionsList = [
    { label: 'Hypertension', arabic: 'ضغط الدم المرتفع', value: 'Hypertension' },
    { label: 'Diabetes', arabic: 'سكر', value: 'Diabetes' },
    { label: 'Heart conditions', arabic: 'أمراض قلب', value: 'Heart conditions' },
    { label: 'HIV', arabic: 'فيورس نقص المناعة المكتسب', value: 'HIV' },
    { label: 'HBV', arabic: 'التهاب الكبد الوبائي - بي', value: 'HBV' },
    { label: 'HCV', arabic: 'التهاب الكبد الوبائي - سي', value: 'HCV' },
    { label: 'Bipolar Disorder', arabic: 'اضطراب ثنائي القطب', value: 'Bipolar Disorder' },
    { label: 'Depression', arabic: 'الإكتئاب', value: 'Depression' },
    { label: 'Schizophrenia', arabic: 'الفصام', value: 'Schizophrenia' },
    { label: 'Respiratory diseases', arabic: 'امراض في الجهاز التنفسي', value: 'Respiratory diseases' },
    { label: 'Cerebrovascular disease', arabic: 'مرض الأوعية الدموية الدماغية', value: 'Cerebrovascular disease' },
    { label: 'Kidney disease', arabic: 'أمراض الكلي', value: 'Kidney disease' },
    { label: 'Liver disease', arabic: 'أمراض الكبد', value: 'Liver disease' },
    { label: 'Lung diseases', arabic: 'أمراض الرئه', value: 'Lung diseases' },
    { label: 'Disabilities', arabic: 'إعاقه', value: 'Disabilities' },
    { label: 'Obesity', arabic: 'سمنه او بدانة', value: 'Obesity' },
    { label: 'Blood diseases', arabic: 'أمراض الدم', value: 'Blood diseases' },
    { label: 'Pregnancy or recent pregnancy', arabic: 'حامل او حمل من وقت قريب', value: 'Pregnancy or recent pregnancy' },
    { label: 'Smoking (current and former)', arabic: 'مدخن ( حاليا او سابقا)', value: 'Smoking (current and former)' },
    { label: 'Solid organ or blood stem cell transplantation', arabic: 'زراعة الأعضاء الصلبة أو زراعة خلايا الدم الجذعية', value: 'Solid organ or blood stem cell transplantation' },
    { label: 'Use of corticosteroids or other immunosuppressive medications', arabic: 'استخدام الكورتيكوستيرويدات أو غيرها من الأدوية المثبطة للمناعة', value: 'Use of corticosteroids or other immunosuppressive medications' },
  ];
  const severitySymptomList = [
    { label: 'Depression', arabic: 'الاكتئاب', value: 'Depression' },
    { label: 'Anxiety', arabic: 'القلق', value: 'Anxiety' },
    { label: 'Distress', arabic: 'الضيق', value: 'Distress' },
    { label: 'Impact on quality of life', arabic: 'التأثير على جودة الحياة', value: 'Impact on quality of life' },
    { label: 'Psychosocial impact', arabic: 'التأثير النفسي الاجتماعي', value: 'Psychosocial impact' },
  ];
  const checkupReminderList = [
    { label: 'None', arabic: 'غير محددة', value: 'None' },
    { label: 'Per Week', arabic: 'اسبوعيا', value: 'Per Week' },
    { label: 'Per Month', arabic: 'شهريا', value: 'Per Month' },
    { label: 'Every 3 Months', arabic: 'كل ثلاثة شهور', value: 'Every 3 Months' },
    { label: 'Every 4-6 Months', arabic: 'كل آربعة اشهر', value: 'Every 4-6 Months' },
  ];
  const appointmentList = [
    { label: 'None', arabic: 'غير محددة', value: 'None' },
    { label: 'Per Week', arabic: 'اسبوعيا', value: 'Per Week' },
    { label: 'Per 2 Weeks', arabic: 'كل اسبوعين', value: 'Per 02 Week' },
    { label: 'Per Month', arabic: 'كل شهر', value: 'Per Month' },
    { label: 'Per 2 Month', arabic: 'كل شهرين', value: 'Per 02 Month' },
    { label: 'Per 3-4 Month', arabic: 'كل ثلاثة الي اربعة اشهر', value: 'Per 3-4 Month' },
    { label: 'Per 6 Month', arabic: 'كل ستة اشهر', value: 'Per 6 Month' },
  ];

  const [cancerType, setCancerType] = useState(null);
  const [tumorStage, setTumorStage] = useState(null);
  const [currentCancerTreatment, setCurrentCancerTreatment] = useState([]);
  const [otherConditions, setOtherConditions] = useState([]);
  const [yod, setYod] = useState("");
  const [severityOfSymptoms, setSeverityOfSymptoms] = useState(null);
  const [regularCheckupReminder, setRegularCheckupReminder] = useState(null);
  const [regularDoctorsAppointments, setRegularDoctorsAppointments] = useState(null);
  const [error, setError] = useState('');

  const validateForm = () => {
    return (
      cancerType === '' ||
      tumorStage === '' ||
      currentCancerTreatment === '' ||
      otherConditions === '' ||
      yod === '' ||
      severityOfSymptoms === '' ||
      regularCheckupReminder === '' ||
      regularDoctorsAppointments === ''
    );
  };

  const onNext = () => {
    if (toggleCheckBox == false) {
      if (validateForm()) {
        setError('Please answer the questions');
        showError('Please answer the questions');
      } else {
        setError("")
        const body = {
          cancer_type: cancerType,
          tumor_stage: tumorStage,
          current_cancer_treatment: currentCancerTreatment,
          other_conditions: otherConditions,
          year_of_diagnose: Number(yod),
          severity_of_symptoms: severityOfSymptoms,
          regular_checkup_reminders: regularCheckupReminder,
          regular_doctors_appointments: regularDoctorsAppointments,
        };
        // console.log("Body ============", body);
        dispatch({ type: FORMTHREE, payload: body });
        navigation.navigate('Acknowledgement');
      }
    } else {
      setError("")
      const body = {
        cancer_type: 'None',
      };
      dispatch({ type: FORMTHREE, payload: body });
      navigation.navigate('Acknowledgement');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <Header onPress={() => navigation.goBack()} />
        <ScrollView overScrollMode='never' contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View flex={1}>
            <View style={{ marginTop: 15, paddingHorizontal: moderateScale(20) }}>
              <Text style={styles.title}>{t('general_health_information')}</Text>
              <Text style={styles.errorTxt}>{error !== '' ? error : ''}</Text>
            </View>

            <View style={[styles.row, { gap: 10, paddingHorizontal: moderateScale(20) }]}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
                style={{ borderRadius: textScale(10), height: textScale(26), width: textScale(26) }}
                tintColors={{ true: 'purple', false: 'lightgrey' }}
              />
              <Text style={styles.subTxt}>{t('no_cancer')}</Text>
            </View>

            {toggleCheckBox == false ? (
              <View style={{ gap: 14, marginTop: 14, marginHorizontal: moderateScale(20) }}>
                <DropdownComponent
                  placeholder={t('cancer_type')}
                  value={cancerType}
                  setValue={setCancerType}
                  data={cancerTypeList}
                  allowArabic={true}
                />

                <DropdownComponent
                  placeholder={t('stage_of_tumor')}
                  value={tumorStage}
                  setValue={setTumorStage}
                  data={tumorStageList}
                  allowArabic={true}
                />

                <MultiSelectComponent
                  placeholder={t('current_cancer_treatments')}
                  value={currentCancerTreatment}
                  setValue={setCurrentCancerTreatment}
                  data={cancerTreatmentList}
                  allowArabic={true}
                />

                <DropdownComponent
                  placeholder={t('other_conditions')}
                  value={otherConditions}
                  setValue={setOtherConditions}
                  data={otherConditionsList}
                  allowArabic={true}
                />

                {/* Year Of Diagnosis */}
                <View
                  style={{
                    height: 50,
                    backgroundColor: 'transparent',
                    borderRadius: 10,
                    justifyContent: "center",
                    borderWidth: 0.5,
                    borderColor: 'lightgrey',
                  }}>
                  <TextInput
                    style={{
                      textAlign: isRTL ? 'right' : 'left',
                      fontSize: 16, color: 'black',
                      paddingHorizontal: 5,
                    }}
                    keyboardType="numeric"
                    placeholder={' ' + t('year_of_diagnosis')}
                    placeholderTextColor={'lightgrey'}
                    value={yod}
                    onChangeText={value => setYod(value)}
                  />
                </View>

                <DropdownComponent
                  placeholder={t('severity_of_symptoms')}
                  value={severityOfSymptoms}
                  setValue={setSeverityOfSymptoms}
                  data={severitySymptomList}
                  dropdownPosition='top'
                  allowArabic={true}
                />

                <DropdownComponent
                  placeholder={t('regular_checkup_reminders')}
                  value={regularCheckupReminder}
                  setValue={setRegularCheckupReminder}
                  data={checkupReminderList}
                  dropdownPosition='top'
                  allowArabic={true}
                />

                <DropdownComponent
                  placeholder={t('regular_doctor_appointments')}
                  value={regularDoctorsAppointments}
                  setValue={setRegularDoctorsAppointments}
                  data={appointmentList}
                  dropdownPosition='top'
                  allowArabic={true}
                />
              </View>
            ) : null}
          </View>

          <View style={styles.btnConatiner}>
            <GradiantButton title={t('the_next')} onPress={onNext} />
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: moderateScale(20),
    flex: 1,
    backgroundColor: Colors.white
  },
  title: {
    textAlign: 'left',
    fontSize: textScale(18),
    fontWeight: '600',
    color: Colors.purple,
  },
  subTxt: {
    fontSize: textScale(13),
    fontWeight: '400',
    color: Colors.black
  },
  btnConatiner: {
    width: moderateScale(310),
    alignSelf: 'center',
    marginTop: moderateScaleVertical(60),
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
    alignItems: 'center',
  },
});

export default Demographics2;
