import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import { Color } from '../../GlobalStyles';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../utils/responsiveSizes';

// bg images
import top from '../../assets/top.png';
import topBack from '../../assets/topBack.png';
import bottom from '../../assets/bottom.png';
import bottomBack from '../../assets/bottomBack.png';

const Amal = ({ navigation }) => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  let homeCards = [
    {
      id: 1,
      title: t('relaxation_for_inner_tranquility'),
      media:
        'https://firebasestorage.googleapis.com/v0/b/circlecare-a52c7.appspot.com/o/meditationVideos%2FVideo-001-1.mp4?alt=media&token=db2879ab-b82c-4cdf-b733-ee4a4911c769',
    },
    {
      id: 2,
      title: t('proper_breathing_for_calm_assurance'),
      media:
        'https://firebasestorage.googleapis.com/v0/b/circlecare-a52c7.appspot.com/o/meditationVideos%2FVideo-002-1%20(1).mp4?alt=media&token=da3ab98e-0b9d-4988-9fdb-8f7fe2f6decf',
    },
    {
      id: 3,
      title: t('posture_for_self_confidence'),
      media:
        'https://firebasestorage.googleapis.com/v0/b/circlecare-a52c7.appspot.com/o/meditationVideos%2FVideo-003-1.mp4?alt=media&token=e42cdcc7-b2e9-46e5-b3ee-5f9f29e110e6',
    },
    {
      id: 3,
      title: t('meditation_for_serenity'),
      ia:
        'https://firebasestorage.googleapis.com/v0/b/circlecare-a52c7.appspot.com/o/meditationVideos%2FVideo-004-1.mp4?alt=media&token=5ef4304d-c831-4270-8047-d610e645e07d',
    },
  ]

  const handlePress = url => {
    // () => { Linking.openURL(i?.link) }
    navigation.navigate('VideoPlayer', { source: url });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />
      {/* <StatusBar barStyle={'dark-content'} /> */}
      <View style={{ flex: 1, backgroundColor: Color.labelColorDarkPrimary }}>
        <Header title="Amal" />
        <Text style={styles.head}>{t('please_choose_the_path_to_relax')}</Text>
        <ScrollView
          overScrollMode="never"
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {homeCards?.map(e => (
              <TouchableOpacity key={e.id} activeOpacity={0.7} onPress={() => handlePress(e?.media)}>
                <View style={styles.cardGroupLayout}>
                  <Text style={styles.cardTxt}>{e?.title}</Text>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Amal;

const styles = StyleSheet.create({
  head: {
    marginTop: 20,
    color: '#9a5ab1',
    fontSize: 20,
    fontWeight: '800',
    alignSelf: 'center',
  },

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
  cardImage: {
    width: scale(60),
    height: scale(60),
  },
  cardTxt: {
    paddingHorizontal: moderateScale(36),
    fontSize: textScale(20),
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#611088',
    textAlign: 'center',
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
});
