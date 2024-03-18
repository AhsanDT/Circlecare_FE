import { useRef } from 'react'
import { I18nManager, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import BottomHome from './BottomScreens/BottomHome';
import Discover from './BottomScreens/Discover';
import Relax from './BottomScreens/Relax';
import Care from './BottomScreens/Care';
import Profile from './BottomScreens/Profile';

import Colors from '../constants/Colors';
import { Color, FontFamily } from '../../GlobalStyles';
import { moderateScale, scale, textScale } from '../utils/responsiveSizes';
import useDetermineLogo from '../utils/logoUtils';

export default function ColorScreen({ route }) {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const navigation = useNavigation();

  const data = useSelector((state) => state?.auth?.profile);
  const notifications = useSelector(state => state?.health?.notifications)

  let userId = data?.id || data?._id
  const unreadNotificationsCount = notifications.filter(notification =>
    !notification.read.includes(userId)
  ).length;

  const viewRef = useRef(null);
  // const [bgColor, setBgColor] = useState();

  let logo = useDetermineLogo();

  // useEffect(() => {
  //   switch (route.name) {
  //     case 'Home': { setBgColor(Colors.white); break; }
  //     case 'Discover': { setBgColor(Colors.white); break; }
  //     case 'Care': { setBgColor(Colors.white); break; }
  //     case 'Relax': { setBgColor(Colors.white); break; }
  //     case 'Profile': { setBgColor(Colors.white); break; }
  //     default: setBgColor(Colors.white);
  //   }
  // }, [])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'transparent'} />

      <ImageBackground
        style={[{ height: scale(160), }, Platform.OS == 'ios' ? { paddingBottom: 40 } : { paddingBottom: 10 }]}
        resizeMode="cover"
        source={require("../../assets/image-4.png")}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
          <Surface style={styles.header}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: moderateScale(14) }}>
              <View style={styles.headerCenter}>
                <Image
                  style={styles.groupIcon}
                  resizeMode="contain"
                  source={logo}
                />
                <View flex={1}>
                  <Text style={styles.welcomeTxt}>{t('welcome_back')}</Text>
                  <Text numberOfLines={2} style={styles.nameTxt}>{`${data?.first_name?.toUpperCase()} ${data?.last_name?.toUpperCase()}`}</Text>
                </View>
              </View>
              <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Notification')}>
                  <Image
                    style={styles.bellIcon}
                    resizeMode="cover"
                    source={require("../../assets/bell01.png")}
                  />
                  {unreadNotificationsCount ?
                    <View style={[styles.circle, isRTL && { left: -2 }]}>
                      <Text style={styles.circleTxt}>{unreadNotificationsCount}</Text>
                    </View> : null}
                </TouchableOpacity>
              </View>
            </View>
          </Surface>
        </SafeAreaView>
      </ImageBackground>

      <Animatable.View
        ref={viewRef}
        easing={'ease-in-out'}
        style={{
          top: -24,
          flex: 1,
          backgroundColor: Color.labelColorDarkPrimary,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View flex={1}>
          {route.name === 'Home' ?
            <ScrollView
              overScrollMode="never"
              contentContainerStyle={[styles.contentContainer, { paddingBottom: 110 }]}
              showsVerticalScrollIndicator={false}>
              <BottomHome />
            </ScrollView> : null}
          {route.name === 'Discover' ?
            <View style={styles.container}>
              <Discover />
            </View> : null}
          {route.name === 'Care' ?
            <View style={styles.container}>
              <Care />
            </View> : null}
          {route.name === 'Relax' ?
            <ScrollView
              overScrollMode="never"
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}>
              <Relax />
            </ScrollView> : null}
          {route.name === 'Profile' ?
            <View flex={1} style={styles.contentContainer}>
              <Profile />
            </View> : null
          }
        </View>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: Color.labelColorDarkPrimary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  // header
  header: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10
  },
  groupIcon: {
    width: scale(68),
    height: scale(68),
    tintColor: 'white'
  },
  bellIcon: {
    width: scale(30),
    height: scale(30),
  },
  circle: {
    height: scale(18),
    width: scale(18),
    borderRadius: scale(18 / 2),
    borderColor: 'white',
    borderWidth: 0.8,
    backgroundColor: '#BF6BBB',
    // backgroundColor: Colors.purple,
    position: 'absolute',
    top: -4,
    right: -2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleTxt: {
    fontSize: textScale(10),
    fontWeight: '700',
    color: 'white',
    textAlign: 'left'
  },
  welcomeTxt: {
    fontSize: textScale(15),
    fontFamily: FontFamily.satoshiVariableMedium,
    color: '#F6BBFF',
    fontWeight: '500',
    textAlign: 'left'
  },
  nameTxt: {
    fontSize: textScale(24),
    fontFamily: FontFamily.satoshiVariableBold,
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'left'
  }
})
