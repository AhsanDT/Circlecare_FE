import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Swipeable from 'react-native-swipeable';

import Colors from '../../constants/Colors';
import { Color, FontFamily, Border, FontSize, Padding } from '../../../GlobalStyles';
import { deleteReflection, getreflection } from '../../redux/actions/user.action';
import Header from '../../components/Header';
import { moderateScale } from '../../utils/responsiveSizes';
import DatePicker from '../../components/DatePicker';
import CalenderModal from '../../components/Modal/CalenderModal';
import { ActivityIndicator } from 'react-native-paper';

const DailyReflection1 = () => {
  const { t } = useTranslation();
  // const isRTL = I18nManager.isRTL;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSwipeToDelete = id => {
    console.log('deleting with array', id);
    dispatch(deleteReflection(id));
    setTimeout(() => {
      getDetails()
    }, 500);
  };

  useFocusEffect(useCallback(() => {
    getDetails()
  }, [date]))

  const getDetails = async () => {
    const momentDate = moment(date, 'DD-MM-YYYY');
    const convertedDate = momentDate.format('YYYY-MM-DD');
    const tarekh = moment(new Date).format('YYYY-MM-DD');

    const body = {
      dated: date ? convertedDate : tarekh,
    };

    const details = await dispatch(getreflection(body, setIsLoading))
    setData(details?.data?.data)
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />

      <View flex={1} style={{ backgroundColor: Color.labelColorDarkPrimary }}>
        <Header title={t('daily_refleaction')} rightBtnTxt={t('add')} rightBtn={() => navigation.navigate('DailyReflection2')} onPress={() => navigation.goBack()} />

        <View style={{ marginTop: 20, paddingHorizontal: moderateScale(20) }}>
          <View style={{ marginTop: 10 }}>
            <DatePicker
              date={date || moment(new Date).format('DD-MM-YYYY')}
              onDateChange={(newDate) => setDate(newDate)}
              onCalendarIconPress={() => setOpen(true)}
            />
          </View>

          <ScrollView
            overScrollMode='never'
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
            <View style={{ paddingTop: 30, }}>
              {!isLoading && !data.length ?
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, }}>
                  "Nothing on this date"
                </Text>
                : isLoading && <ActivityIndicator size='small' color="black" />
              }

              {data?.length ? (
                data?.map((item, index) => (
                  <Swipeable
                    key={item._id}
                    rightButtons={[
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleSwipeToDelete(item._id)}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>,
                    ]}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                    // onPress={() => navigation.navigate('Question1')}
                    >
                      <View
                        style={{
                          borderWidth: 0.5,
                          borderRadius: 10,
                          borderColor: 'lightgrey',
                          marginTop: 20,
                          backgroundColor: 'white',
                          elevation: 5,
                          width: '100%',
                        }}>
                        <View
                          style={{ padding: 15, marginTop: 10, marginBottom: 10 }}>
                          <Text
                            style={{
                              color: 'black',
                              fontWeight: 'bold',
                              fontSize: 16,
                              letterSpacing: 1,
                            }}>
                            REFLECTION {index + 1}
                          </Text>
                          <Text style={{ fontSize: 13, color: 'black' }}>
                            {item?.thoughts}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
                ))
              ) : null}
            </View>
          </ScrollView>
        </View>

        {open && <CalenderModal open={open} setOpen={setOpen} date={date} setDate={setDate} />}
      </View>
    </SafeAreaView>
  );
};

export default DailyReflection1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '85%',
    marginTop: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
