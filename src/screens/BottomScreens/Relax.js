import * as React from "react";
import { Image, StyleSheet, Text, View, ScrollView, I18nManager } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color, FontFamily, Border, FontSize, Padding } from "../../../GlobalStyles";
import Colors from "../../constants/Colors";
import GradiantButton from "../../components/GradiantButton";
import { moderateScale } from "../../utils/responsiveSizes";
import { useTranslation } from "react-i18next";


const Relax = () => {
  const { t } = useTranslation();
  // const isRTL = I18nManager.isRTL;

  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: Color.labelColorDarkPrimary, marginBottom: 100 }}>
      <ScrollView overScrollMode='never' contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#CBC3EB', width: '100%' }}>
          <View style={{ marginTop: '10%', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, color: Colors.purple, fontWeight: 'bold', marginBottom: 25, }}>{t('meditate')}</Text>
            <Image
              style={{ height: 240, width: 240, marginBottom: 20, }}
              resizeMode="contain"
              source={require("../../../assets/group-1000005767.png")}
            />
          </View>
        </View>
        <View style={{ backgroundColor: 'white' }}>
          <View style={{ alignItems: 'center', marginTop: 20, }}>
            <Text style={{ color: Colors.purple, fontWeight: 'bold', fontSize: 26, }}>{t('meet_amal')}</Text>
          </View>

          <View style={styles.btnContainer}>
            <GradiantButton title={t('start_the_journey')} onPress={() => navigation.navigate("Amal")} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  navPosition: {
    width: '100%',
    left: 0,
    position: "absolute",
  },
  timeLayout: {
    height: 21,
    width: 54,
    position: "absolute",
  },
  buttonsPosition: {
    borderRadius: 40,
    width: 343,
    alignSelf: 'center',
    position: "absolute",
  },
  meditateTypo: {
    color: Color.mediumpurple,
    fontFamily: FontFamily.interSemibold,
    fontWeight: "bold",
    left: "50%",
    top: "50%",
    textAlign: "center",
    letterSpacing: 1,
    position: "absolute",
  },
  tabsPosition: {
    // marginLeft: -187.5,
    left: "40%",
    width: 375,
    position: "absolute",
  },
  homeLayout: {
    borderRadius: Border.br_81xl,
    position: "absolute",
  },
  parentFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  homeIconLayout: {
    height: 24,
    width: 24,
  },
  labelTypo: {
    color: Color.plum_200,
    fontFamily: FontFamily.regularFootnote13pt,
    fontSize: FontSize.size_2xs,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0,
  },
  rightSideIcon: {
    top: 17,
    right: 15,
    width: 67,
    height: 11,
    position: "absolute",
  },
  text: {
    top: 1,
    fontSize: FontSize.defaultBoldSubheadline_size,
    fontFamily: FontFamily.interMedium,
    color: Color.systemBlack,
    height: 20,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 20,
    width: 54,
    left: 0,
    position: "absolute",
  },
  time: {
    borderRadius: Border.br_5xl,
    left: 0,
    width: 54,
    top: 0,
  },
  leftSide: {
    left: 24,
    top: 12,
  },
  statusBarIphoneXOrNewe: {
    height: 44,
    top: 0,
    overflow: "hidden",
  },
  relaxChild: {
    top: 184,
    // left: 57,
    width: 18,
    height: 18,
    position: "absolute",
  },
  meditate: {
    marginTop: -10,
    marginLeft: -36.5,
    fontSize: FontSize.size_lg,
    lineHeight: 20,
    color: Color.mediumpurple,
    fontFamily: FontFamily.interSemibold,
  },
  meditateWrapper: {
    top: 20,
    height: 44,
  },
  relaxItem: {
    top: 402,
    height: 402,
    backgroundColor: Color.labelColorDarkPrimary,
  },
  navChild: {
    height: "11.82%",
    width: "26.13%",
    top: "0%",
    right: "13.6%",
    bottom: "88.18%",
    left: "60.27%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  homeIndicator: {
    // marginLeft: -66.5,
    bottom: 8,
    width: 134,
    height: 5,
    backgroundColor: Color.labelColorDarkPrimary,
    left: "50%",
  },
  homeindicator: {
    top: 65,
    height: 32,
  },
  homeIcon: {
    overflow: "hidden",
  },
  label: {
    marginTop: 1,
  },
  homeParent: {
    top: 14,
    left: 21,
    position: "absolute",
  },
  tabbarHome: {
    width: 74,
    height: 64,
  },
  smileParent: {
    marginTop: -20.12,
    marginLeft: -14,
    left: "50%",
    top: "50%",
    alignItems: "center",
    position: "absolute",
  },
  tabbarHome1: {
    width: 76,
    height: 64,
  },
  searchRefractionParent: {
    marginTop: -19.12,
    marginLeft: -21.5,
    left: "50%",
    top: "50%",
    alignItems: "center",
    position: "absolute",
  },
  tabbarHome2: {
    width: 75,
    height: 64,
  },
  tabbarHomeChild: {
    top: 4,
    left: 10,
    backgroundColor: Color.plum_300,
    width: 55,
    height: 55,
  },
  vectorIcon: {
    width: 25,
    height: 25,
  },
  label3: {
    color: Color.plum_100,
    width: 37,
    fontFamily: FontFamily.regularFootnote13pt,
    fontSize: FontSize.size_2xs,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0,
    height: 11,
  },
  vectorParent: {
    left: 12,
    width: 51,
    top: 12,
    position: "absolute",
  },
  label4: {
    marginTop: 2,
  },
  iconlycurvedprofileParent: {
    top: 13,
    left: 22,
    position: "absolute",
  },
  tabbarHomeParent: {
    flexDirection: "row",
    justifyContent: "center",
    left: 0,
    top: 0,
    position: "absolute",
  },
  tabs: {
    height: 65,
    top: 0,
    overflow: "hidden",
  },
  tabbar: {
    height: "88.18%",
    top: "11.82%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.purple,
    position: "absolute",
    width: "100%",
  },
  nav: {
    top: 702,
    height: 110,
  },
  meetKalyana: {
    marginTop: 230,
    marginLeft: -105,
    fontSize: FontSize.size_13xl,
  },
  button1: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.labelColorDarkPrimary,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    alignSelf: "stretch",
    // paddingHorizontal: Padding.p_98xl,
    paddingVertical: 0,
    flex: 1,
  },
  pressable: {
    borderRadius: Border.br_47xl,
    height: "100%",
    backgroundColor: "transparent",
    width: "100%",
  },
  buttons: {
    top: '165%',
    height: 49,
  },
  relaxInner: {
    top: 70,
    // left: 29,
    width: 250,
    height: 270,
    alignSelf: 'center',
    position: "absolute",
  },
  relax: {
    borderRadius: Border.br_11xl,
    // top:20,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: "#cbc3eb",
    height: '64%',
    // overflow: "hidden",
    width: "100%",
    // flex: 1,
  },

  btnContainer: {
    width: moderateScale(310),
    alignSelf: 'center',
    marginTop: 20
    // paddingBottom: moderateScaleVertical(30)
  },
});

export default Relax;
