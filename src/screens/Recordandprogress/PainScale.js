import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, I18nManager, SafeAreaView, StatusBar, } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Colors from '../../constants/Colors';
import { Color, FontFamily } from '../../../GlobalStyles';
import Slider from '@react-native-community/slider';
import { painscaleSet } from '../../redux/actions/user.action';
import Header from '../../components/Header';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../../utils/responsiveSizes';
import GradiantButton from '../../components/GradiantButton';
import { showError } from '../../helper/customToast';

export const emojis = [
  {
    id: 1,
    image: require('../../../assets/no-hurt.png'),
    label: '(0-1) No Hurt',
    arabic: '1-0 أنا بخير',
    value: 'No Hurt',
    start: 0,
    end: 1
  },
  {
    id: 2,
    image: require('../../../assets/hurts-little-bit.png'),
    label: `(2-3) Hurts a\nlittle bit`,
    arabic: '3-2 أشعر بالألم',
    value: 'Hurts a little bit',
    start: 2,
    end: 3
  },
  {
    id: 3,
    image: require('../../../assets/hurts-little-more.png'),
    label: `(3-4) Hurts\nlittle more`,
    arabic: '4-3 يؤلم أكثر قلي ًل',
    value: 'Hurts a little more',
    start: 3,
    end: 4
  },
  {
    id: 4,
    image: require('../../../assets/hurts-even-more.png'),
    label: `(5-6) Hurts\neven more`,
    arabic: '6-5 يؤلمني أكثر',
    value: 'Hurts a even more',
    start: 5,
    end: 6
  },
  {
    id: 5,
    image: require('../../../assets/hurts-whole-lot.png'),
    label: `(7-8) Hurts\nwhole lot`,
    arabic: '8-7 يؤلمني كثي ًرا',
    value: 'Hurts whole lot',
    start: 7,
    end: 8
  },
  {
    id: 6,
    image: require('../../../assets/hurts-worst1.png'),
    label: `(9-10) Hurts\nworst`,
    arabic: '10-9 مؤلم ج ًدا',
    value: 'Hurts worst',
    start: 9,
    end: 10
  }
]

const PainScale = ({ navigation, route }) => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const dispatch = useDispatch()
  const name = route?.params?.data

  const [painLevel, setPainLevel] = useState(0);
  const [scaleTitle, setScaleTitle] = useState("No Hurt");
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    if (!name) {
      showError('Go back and select body part again!')
      return;
    } else if (!painscale) {
      showError('Select a number from slider to rate your pain')
      return;
    } else if (!scaleTitle) {
      showError('Select emoji')
      return;
    }

    const body = {
      category: name,
      scale: painLevel,
      scale_title: scaleTitle
    }
    // console.log("Body ===> ", body);

    dispatch(painscaleSet(body, setIsLoading, navigation))
  }

  const painscale = [
    {
      id: 0,
      name: "No Pain"
    },
    {
      id: 1,
      name: null
    }, {
      id: 2,
      name: null
    }, {
      id: 3,
      name: null
    }, {
      id: 4,
      name: null
    }, {
      id: 5,
      name: "Distressing Pain"
    }, {
      id: 6,
      name: null
    }, {
      id: 7,
      name: null
    }, {
      id: 8,
      name: null
    }, {
      id: 9,
      name: null
    },
    {
      id: 10,
      name: "Unbearable Pain"
    },
  ]

  const calculateImageIndex = (level) => {
    if (level == 0 || level == 1) {
      setScaleTitle('No Hurt')
      return 1;
    } else if (level == 2 || level == 3) {
      setScaleTitle('Hurts a little bit')
      return 2;
    } else if (level == 3 || level == 4) {
      setScaleTitle('Hurts a little more')
      return 3;
    } else if (level == 5 || level == 6) {
      setScaleTitle('Hurts a even more')
      return 4;
    } else if (level == 7 || level == 8) {
      setScaleTitle('Hurts whole lot')
      return 5;
    } else if (level == 9 || level == 10) {
      setScaleTitle('Hurts worst')
      return 6;
    } else {
      setScaleTitle('No Hurt')
      return 1
    }
  };

  const renderItem = useCallback(({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.6}
        onPress={() => {
          setPainLevel(item?.end)
          setScaleTitle(item?.value)
        }}
        style={[
          styles.imageContainer,
          // styles.selectedImageContainer,
          calculateImageIndex(painLevel) === item.id && styles.selectedImageContainer,
          { gap: 6 }
        ]}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.imgTxt}>{isRTL ? item.arabic : item.label}</Text>
      </TouchableOpacity>
    );
  }, [painLevel])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />

      <View flex={1} style={{ backgroundColor: Colors.white }}>
        <Header title={t('pain_scale')} />

        <View style={{ marginTop: 20, }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginHorizontal: moderateScale(20) }}>
            <Text style={styles.bottomTxt}>{name?.toUpperCase()}</Text>
            <Image source={require('../../../assets/close.png')} resizeMode='contain' style={{ width: scale(12), height: scale(12) }} />
          </View>
          <View style={styles.bottomLine} />
        </View>

        <View style={{ flex: 1, marginTop: 20, paddingHorizontal: moderateScale(20) }}>
          <Text style={styles.title}>{t('choose_number_from_0_to_10')}</Text>

          {/* Slider */}
          <View style={{ marginTop: 20 }}>
            <Slider
              style={{ marginLeft: -5 }}
              minimumValue={0}
              maximumValue={10}
              step={1}
              minimumTrackTintColor={'#BF6BBB'}
              thumbTintColor={'#BF6BBB'}
              maximumTrackTintColor={Color.darkslategray_200}
              value={painLevel}
              onValueChange={(value) => setPainLevel(value)}
            />
            <View style={{ flexDirection: isRTL ? "row-reverse" : 'row', marginHorizontal: 10, justifyContent: "space-between" }}>
              {painscale?.map((i) => {
                return (
                  <Text key={`count-${i.id}`} style={styles.count}>{i?.id}</Text>
                )
              })}
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: 10, justifyContent: "space-between" }}>
              <Text style={[styles.painname, { textAlign: 'left' }]}>No Pain</Text>
              <Text style={[styles.painname, { textAlign: 'center' }]}>{`Distressing\nPain`}</Text>
              <Text style={[styles.painname, { textAlign: 'right' }]}>{`Unbearable\nPain`}</Text>
            </View>
          </View>

          {/* Emoji's */}
          <FlatList
            data={emojis}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20, flexDirection: isRTL ? 'row-reverse' : 'row' }}
            contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            ListHeaderComponent={() => (
              <View style={{ paddingBottom: 20 }}>
                <Text style={styles.title}>{`You Select ${painLevel}`}</Text>
                <Text style={[styles.title]}>{t('pain_rating_scale')}</Text>
              </View>
            )
            }
          />

          {/* Button */}
          <View style={styles.btnConatiner}>
            <GradiantButton title={t('done')} onPress={handlePress} loading={isLoading} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default PainScale

const styles = StyleSheet.create({
  bottomTxt: {
    color: "#BF6BBB",
    fontWeight: 'bold',
    fontSize: textScale(15)
  },
  bottomLine: {
    marginTop: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    borderColor: '#B8B8B8',
  },
  title: {
    textAlign: 'left',
    fontSize: textScale(13),
    fontWeight: '400',
    fontFamily: FontFamily.poppinsRegular,
    color: '#3C3C3C'
  },
  count: {
    fontSize: textScale(10),
    color: '#BF6BBB',
  },
  painname: {
    fontSize: textScale(10),
    color: '#9C9EB9',
  },

  imageContainer: {
    width: scale(104),
    height: scale(122),
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedImageContainer: {
    borderWidth: 1,
    borderColor: Colors.purple,
  },
  image: {
    width: scale(70),
    height: scale(70),
    resizeMode: 'contain',
  },
  imgTxt: {
    fontSize: textScale(12),
    fontWeight: '400',
    fontFamily: FontFamily.rubikRegular,
    color: '#9C9EB9',
    textAlign: 'center',
    // marginTop: 6
  },

  btnConatiner: {
    width: moderateScale(310),
    alignSelf: 'center',
    marginTop: moderateScaleVertical(10),
    marginBottom: moderateScaleVertical(30)
  },
})