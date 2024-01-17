import { Image, StatusBar, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';

import GradiantButton from "../../components/GradiantButton";
import { moderateScale, moderateScaleVertical, scale } from "../../utils/responsiveSizes";
import PoweredBy from "../../components/PoweredBy";
import useDetermineLogo from "../../utils/logoUtils";
import Colors from "../../constants/Colors";

const SplashScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  let logo = useDetermineLogo()

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View flex={1} justifyContent="center">
        <Image
          style={{
            width: scale(260),
            height: scale(260),
            alignSelf: 'center',
          }}
          resizeMode="contain"
          source={logo}
        // source={isRTL ? require('../../../assets/logos/logo_ar.png') : require('../../../assets/logos/logoNew.png')}
        />
        <View style={styles.btnContainer}>
          <GradiantButton title={t('get_started')} onPress={() => navigation.navigate('LanguageChange')} />
        </View>
      </View>
      <PoweredBy />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30
  },
  btnContainer: {
    width: moderateScale(310),
    marginTop: moderateScaleVertical(60),
    alignSelf: 'center',
  },
});

export default SplashScreen;
