import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, SafeAreaView, StatusBar, I18nManager, } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FontFamily } from '../../../GlobalStyles';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../../utils/responsiveSizes';
import GradiantButton from '../../components/GradiantButton';
import Header from '../../components/Header';
import { showError } from '../../helper/customToast';
import Colors from '../../constants/Colors';

const data = [
  {
    id: 1,
    status: true,
    name: null
  },
  {
    id: 2,
    status: false,
    name: "head",
    arabic: "رأس"
  },
  {
    id: 3,
    status: true,
    name: null
  },
  {
    id: 4,
    status: false,
    name: "shoulders",
    arabic: "الأكتاف"
  },
  {
    id: 5,
    status: false,
    name: "neck",
    arabic: "الرقبة"
  },
  {
    id: 6,
    status: true,
    name: null
  },
  {
    id: 7,
    status: false,
    name: "shoulders",
    arabic: "الأكتاف"
  },
  {
    id: 8,
    status: false,
    name: "chest",
    arabic: "الصدر"
  },
  {
    id: 9,
    status: false,
    name: "shoulders",
    arabic: "الأكتاف"
  },
  {
    id: 10,
    status: true,
    name: "right elbow",
    arabic: ""
  },
  {
    id: 11,
    status: false,
    name: "back",
    arabic: ""
  }, {
    id: 12,
    status: true,
    name: "left Elbow",
    arabic: ""
  },
  {
    id: 13,
    status: true,
    name: "right arm",
    arabic: ""
  },
  {
    id: 14,
    status: true,
    name: "stomach",
    arabic: ""
  },
  {
    id: 15,
    status: true,
    name: "left arm",
    arabic: ""
  },
  {
    id: 16,
    status: true,
    name: "right hand",
    arabic: ""
  },
  {
    id: 17,
    status: true,
    name: null
  },
  {
    id: 18,
    status: true,
    name: "left hand",
    arabic: ""
  },
  {
    id: 19,
    status: true,
    name: null
  },
  {
    id: 20,
    status: true,
    name: null
  },
  {
    id: 21,
    status: true,
    name: null
  },
  {
    id: 22,
    status: false,
    name: "knees",
    arabic: "الركبتين"
  },
  {
    id: 23,
    status: false,
    name: "knees",
    arabic: "الركبتين"
  },
  {
    id: 24,
    status: false,
    name: "knees",
    arabic: "الركبتين"
  },
  {
    id: 25,
    status: false,
    name: "right leg",
    arabic: ""
  },
  {
    id: 26,
    status: true,
    status: false,
    name: "legs",
    arabic: "الأرجل"
  },
  {
    id: 27,
    status: false,
    name: "legs",
    arabic: "الأرجل"
  },
  {
    id: 28,
    status: false,
    name: "feet",
    arabic: ""
  },
  {
    id: 29,
    status: false,
    name: "ankles",
    arabic: "الكاحلين"
  },
  {
    id: 30,
    status: false,
    name: "feet",
    arabic: ""
  },

]

const PainAnalog = ({ navigation }) => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const [name, setName] = useState("")

  const handlePress = () => {
    if (!name) {
      showError("Please select any body part!")
      return;
    }

    navigation.navigate('PainScale', { data: name })
  }

  let selectedBodyPart = data.find(e => e.name === name)

  console.log("selectedBodyPart ===>", selectedBodyPart);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />

      <View flex={1}>
        <Header title={t('pain_analog')} rightBtnTxt={t('records')} rightBtn={() => navigation.navigate('Records')} />

        <ScrollView overScrollMode='never' contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          <View flex={1}>
            <View style={styles.container}>
              <Text style={styles.txt}>Choose a region of pain so we can determine what to recommend for you.</Text>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
                <Image style={{ width: scale(342), height: scale(500), resizeMode: 'contain' }} source={require('../../../assets/group-1000005758.png')} />
                <View style={{ position: "absolute", alignSelf: "center", marginTop: 10 }}>
                  <FlatList
                    data={data}
                    style={{ alignSelf: "center" }}
                    numColumns={3}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          key={`bodyParts-${index}`}
                          onPress={() => setName(item?.name)}
                          disabled={item?.status}
                          style={{
                            // backgroundColor: 'red',
                            backgroundColor: "transparent",
                            height: scale(50),
                            width: scale(80),
                            opacity: 0.5,
                          }}
                        />
                      )
                    }}
                  />
                </View>
              </View>
            </View>
            {name && <View style={styles.selected}>
              <TouchableOpacity onPress={() => setName("")}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginHorizontal: moderateScale(20) }}>
                  <Text style={styles.bottomTxt}>{isRTL ? selectedBodyPart?.arabic : selectedBodyPart?.name?.toUpperCase() || ""}</Text>
                  <Image source={require('../../../assets/close.png')} resizeMode='contain' style={{ width: scale(12), height: scale(12) }} />
                </View>
              </TouchableOpacity>
              <View style={styles.bottomLine} />
            </View>}
          </View>
          <View style={styles.btnConatiner}>
            <GradiantButton title={t('continue')} onPress={handlePress} />
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default PainAnalog

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: 20
  },
  txt: {
    fontSize: textScale(13),
    fontWeight: '400',
    color: '#2E2E2E',
    fontFamily: FontFamily.poppinsRegular
  },
  selected: {
    marginVertical: 14,
  },
  bottomLine: {
    marginTop: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    borderColor: '#B8B8B8',
  },
  bottomTxt: {
    color: "#BF6BBB",
    fontWeight: 'bold',
    fontSize: textScale(15)
  },
  btnConatiner: {
    width: moderateScale(310),
    alignSelf: 'center',
    marginTop: moderateScaleVertical(10),
    // marginBottom: moderateScaleVertical(30)
  },
})