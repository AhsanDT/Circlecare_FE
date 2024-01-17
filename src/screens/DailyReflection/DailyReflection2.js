import React, { useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Keyboard, StatusBar, SafeAreaView, I18nManager } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Color } from "../../../GlobalStyles";
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { setreflection } from '../../redux/actions/user.action'
import Header from '../../components/Header'
import { moderateScale, moderateScaleVertical, scale } from '../../utils/responsiveSizes';
import GradiantButton from '../../components/GradiantButton';
import SuccessModal from '../../components/Modal/SuccessModal';
import CalenderModal from '../../components/Modal/CalenderModal';
import DatePicker from '../../components/DatePicker';
import Colors from '../../constants/Colors';

const DailyReflection2 = () => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sig, setSig] = useState('')
  const [date, setDate] = useState('')

  const tarekh = moment(new Date).format('YYYY-MM-DD');
  const savethoughts = () => {
    Keyboard.dismiss();

    const momentDate = moment(date, 'DD-MM-YYYY');
    const convertedDate = momentDate.format('YYYY-MM-DD');

    const body = {
      dated: date ? convertedDate : tarekh,
      thoughts: sig
    }
    dispatch(setreflection(body, setIsLoading, setSuccess, navigation))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />

      <View flex={1} style={{ backgroundColor: Color.labelColorDarkPrimary }}>
        <Header title={t('daily_refleaction')} />

        <View style={{ marginHorizontal: moderateScale(20), marginTop: 20 }}>
          <DatePicker
            date={date || tarekh}
            onDateChange={setDate}
            onCalendarIconPress={() => setOpen(true)}
          />
        </View>

        <ScrollView overScrollMode='never' contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View flex={1}>
            <View style={styles.txtContainer}>
              <TextInput
                style={{
                  ...styles.input,
                  paddingHorizontal: 5,
                  textAlign: isRTL ? 'right' : 'left',
                }}
                placeholder={' ' + t('enter_here')}
                placeholderTextColor='#94A5AB'
                value={sig}
                onChangeText={value => setSig(value)}
                multiline={true}
                numberOfLines={16}
              />
            </View>
          </View>
          <View style={styles.btnConatiner}>
            <GradiantButton title={t('save')} onPress={savethoughts} loading={isLoading} />
          </View>
        </ScrollView>


        {success && <SuccessModal open={success} setOpen={setSuccess} message={t('saved_daily_reflection_journal')} />}
        {open ? <CalenderModal open={open} setOpen={setOpen} date={new Date()} setDate={setDate} /> : null}

      </View>
    </SafeAreaView>
  )
}

export default DailyReflection2

const styles = StyleSheet.create({
  txtContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
    borderRadius: scale(12),
    color: 'black',
    marginTop: 5,
    minHeight: 300,
    width: scale(310),
    textAlignVertical: 'top',
    borderColor: "#CECECE",
    alignSelf: 'center',
  },
  inputFieldParent: {
    marginTop: moderateScaleVertical(20),
    width: scale(310),
    gap: 10
  },
  btnConatiner: {
    width: moderateScale(310),
    alignSelf: 'center',
    marginVertical: moderateScaleVertical(30)
  },
})