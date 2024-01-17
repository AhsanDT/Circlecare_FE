import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, BackHandler, SafeAreaView, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import Colors from '../../constants/Colors';
import { get_Records_Body } from '../../redux/actions/user.action';
import Header from '../../components/Header';
import { moderateScale, scale, textScale } from '../../utils/responsiveSizes';
import { emojis } from './PainScale';

const Records = ({ navigation }) => {
  const { t } = useTranslation();
  // const isRTL = I18nManager.isRTL;

  const dispatch = useDispatch()

  const [records, setrecords] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    listing()
  }, [])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      // Cleanup the back handler on component unmount
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    // Navigate back to the previous screen
    navigation.navigate('PainAnalog');
    return true; // Prevent default back action
  };

  const listing = async () => {
    const response = await dispatch(get_Records_Body(setIsLoading))
    setrecords(response?.data?.data)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />

      <View flex={1} style={{ backgroundColor: Colors.white }}>
        <Header title={t('records')} onPress={() => handleBackPress()} />

        <View style={{ flex: 1, marginTop: 20, paddingHorizontal: moderateScale(20) }}>
          <View style={{
            flexDirection: 'row', alignItems: 'center', padding: 5, borderRadius: 5,
            justifyContent: 'space-between', backgroundColor: '#BF6BBB'
          }}>
            <Text style={{ fontSize: textScale(15), color: 'white', fontWeight: 'bold' }}> Date</Text>
            <Text style={{ fontSize: textScale(15), color: 'white', fontWeight: 'bold' }}>   Category</Text>
            <Text style={{ fontSize: textScale(15), color: 'white', fontWeight: 'bold' }}>  Time</Text>
            <Text style={{ fontSize: textScale(15), color: 'white', fontWeight: 'bold' }}>  Scale</Text>
            <Text style={{ fontSize: textScale(15), color: 'white', fontWeight: 'bold' }}>Pain</Text>
          </View>

          {isLoading && <ActivityIndicator size={'large'} color="black" style={{ marginTop: 20 }} />}

          {records?.map((i) => {
            let painEmoji = emojis.find(e => e.end == i?.scale || e.start == i?.scale).image
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, }}>
                <Text style={{ fontSize: textScale(10), color: 'black' }}>{moment(i?.createdAt).format('DD-MM-YYYY')}</Text>
                <Text style={{ fontSize: textScale(12), color: 'black' }}>{i?.category[0].toUpperCase() + i?.category.slice(1)}</Text>
                <Text style={{ fontSize: textScale(12), color: 'black' }}>{moment(i?.createdAt).format('HH:MM A')}</Text>
                <Text style={{ fontSize: textScale(12), color: 'black' }}>{i?.scale}</Text>
                <View>
                  <Image style={{ width: scale(25), height: scale(25) }} source={painEmoji} />
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Records