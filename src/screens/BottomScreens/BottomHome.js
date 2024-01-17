import React, { useEffect } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, I18nManager } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { FontFamily, } from '../../../GlobalStyles';
import Colors from '../../constants/Colors';
import { moderateScale, moderateScaleVertical, scale, textScale, } from '../../utils/responsiveSizes';
// import socketService from '../../utils/socketService';

// bg images
import top from '../../../assets/top.png';
import topBack from '../../../assets/topBack.png';
import bottom from '../../../assets/bottom.png';
import bottomBack from '../../../assets/bottomBack.png';
import Socket from '../../utils/Socket';

const BottomHome = () => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const navigation = useNavigation();

  let homeCards = [
    {
      id: 1,
      title: t('my_health_survey'),
      icon: require('../../../assets/home_card_1.png'),
      onPress: 'MyHealthSurvey'
    },
    {
      id: 2,
      title: t('today_engagement'),
      icon: require('../../../assets/home_card_2.png'),
      onPress: 'DailyTask1'
    },
    {
      id: 3,
      title: t('my_records_progress'),
      icon: require('../../../assets/home_card_3.png'),
      onPress: 'Recordandprog'
    },
  ]

  Socket.on("new notification", (msg) => {
    console.log("new notification", msg);
  });

  useEffect(() => {
    Socket.on("new notification", (msg) => {
      console.log("new notification", msg);
    });

  }, [])

  return (
    <>
      <View style={styles.container}>
        {homeCards?.map(e => (
          <TouchableOpacity key={e.id} activeOpacity={0.7} onPress={() => navigation.navigate(e?.onPress)}>
            <View style={styles.cardGroupLayout}>
              <View style={styles.cardContent}>
                <Image
                  style={styles.cardImage}
                  resizeMode="contain"
                  source={e?.icon}
                />
                <Text style={[styles.cardTxt, { flex: 1 }]}>{e?.title}</Text>
              </View>
              <View style={[styles.backgroundImagesContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <Image style={[styles.bgImage, styles.topLeft, { top: -30, width: scale(180) }]} resizeMode="contain" source={top} />
                <Image style={[styles.bgImage, styles.topLeft, { top: -16, width: scale(180) }]} resizeMode="contain" source={topBack} />
                <Image style={[styles.bgImage, styles.bottomRight, { bottom: -34 }]} resizeMode="contain" source={bottom} />
                <Image style={[styles.bgImage, styles.bottomRight]} resizeMode="contain" source={bottomBack} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Gradiant Button */}
      <View style={styles.btnConatiner}>
        <LinearGradient
          style={styles.buttons}
          locations={[0, 1]}
          colors={['#bf6bbb', '#716eaa']}
          useAngle={true}
          angle={180}>
          <TouchableOpacity
            style={styles.pressable}
            onPress={() => navigation.navigate('DailyReflection1')}>
            <Image
              style={styles.settings1Icon}
              resizeMode="contain"
              source={require('../../../assets/settings-1.png')}
            />
            <Text style={styles.btnTxt}>{t('my_daily_reflection')}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(32),
    gap: 20
  },

  cardGroupLayout: {
    height: scale(120),
    width: scale(330),
    borderWidth: scale(0.5),
    borderColor: Colors.purple,
    borderRadius: scale(10),
    backgroundColor: 'rgba(237, 226, 248, 0.4)',
    // backgroundColor: '#EDE2F8',
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(36),
    gap: scale(20)
  },
  cardImage: {
    width: scale(60),
    height: scale(60),
  },
  cardTxt: {
    fontSize: textScale(20),
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#611088',
    textAlign: 'left',
  },

  backgroundImagesContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden'
  },
  bgImage: {
    width: scale(240),
    height: scale(70),
    position: 'absolute',
  },
  topLeft: {
    top: -10,
    left: 0,
  },
  bottomRight: {
    bottom: -10,
    right: 0,
  },

  // Button
  btnConatiner: {
    width: moderateScale(310),
    alignSelf: 'center',
    paddingVertical: moderateScaleVertical(30),
  },
  buttons: {
    height: scale(50),
    width: '100%',
    borderRadius: 50,
  },
  pressable: {
    height: '100%',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#716EAA',
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settings1Icon: {
    width: scale(27),
    height: scale(27),
  },
  btnTxt: {
    fontSize: textScale(16),
    fontFamily: FontFamily.poppinsMedium,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default BottomHome;
