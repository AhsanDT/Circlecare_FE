import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { I18nManager, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Icon, { Icons } from '../components/Icons';
import Colors from '../constants/Colors';
import ColorScreen from '../screens/ColorScreen';
import { useTranslation } from 'react-i18next';
import { scale, textScale } from '../utils/responsiveSizes';

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const isRTL = I18nManager.isRTL;

  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef?.current?.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef?.current?.transitionTo({ scale: 0.4 });
    }
  }, [focused])

  const getFontSize = () => {
    return isRTL ? textScale(11) : textScale(14);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, focused && { flex: 1.4 }]}>
      <Animatable.View
        ref={viewRef}
        duration={500}
        style={[styles.container, focused && { flex: 1.4 }]}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.purple} />
        </View>
        {focused && <Animatable.Text
          ref={textRef}
          style={[styles.text, { fontSize: getFontSize() }]}>
          {item.label}
        </Animatable.Text>}
      </Animatable.View>
    </TouchableOpacity>
  )
}

const Tab = createBottomTabNavigator();
export default function AnimTab1() {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const TabArr = [
    { route: 'Home', label: t('home'), type: Icons.Feather, icon: 'home', component: ColorScreen },
    { route: 'Discover', label: t('discover'), type: Icons.Feather, icon: 'search', component: ColorScreen },
    { route: 'Care', label: t('care'), type: Icons.Fontisto, icon: 'smiley', component: ColorScreen },
    { route: 'Relax', label: t('relax'), type: Icons.MaterialCommunityIcons, icon: 'hands-pray', component: ColorScreen },
    { route: 'Profile', label: t('profile_tab'), type: Icons.FontAwesome, icon: 'user-circle-o', component: ColorScreen },
  ];

  const determineTabArray = (isRTL) => (isRTL ? TabArr.slice().reverse() : TabArr);
  const array = determineTabArray(isRTL);

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
      }}
    >
      {array.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: scale(70),
    position: 'absolute',
    bottom: scale(22),
    right: scale(14),
    left: scale(14),
    borderRadius: scale(16),
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
    borderRadius: 25,
  },
  text: {
    fontSize: textScale(14),
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.purple,
  }
})
