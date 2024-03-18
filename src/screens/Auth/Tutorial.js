import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Padding, Color, Border, FontSize, FontFamily, } from '../../../GlobalStyles';
import GradiantButton from '../../components/GradiantButton';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../../utils/responsiveSizes';
import { getNotifications } from '../../redux/actions/user.action';
import Colors from '../../constants/Colors';

let data = [
  {
    id: 1,
    text: [
      "Welcome to your trusted companion for enhancing your mental well-being during your oncology journey",
      "Circle care is a trusted, informative, and supportive platform that patients and caregivers can rely on to help improve patient's quality of life.",
      "It's a platform that helps them assess their physical and psychological condition and gives them the tips and support they need.",
      "On contrary to the majority of health mobile applications, Circle Care provides both mental health and oncological support, in addition to regular symptoms assessments, also some practical tools to make their life better.",
      "This application combines the two parts that both genders need, the rational and emotional ones. It empowers both genders in the ways they need and provide them both the type of support they are willing to accept."
    ],
    arabicTxt: [
      'مر حبا بك في التطبيق الذي سيكون بمثابة رفيق موثوق به خلال رحلة العلاج.',
      'Circlecare هي منصة موثوقة وغنية بالمعلومات هدفها تقديم الدعم للمرضى ومقدمي الرعاية لتحسين جودة حياة كل منهما.',
      'فهي توفر لك سبل تقييم حالتك البدنية والنفسية، وتزودك بالنصائح والمساندة التي تحتاجها.',
      'عن غيرها من التطبيقات أنها لا تقتصر على تقييم الأعراض الجسدية، بل تتفرد بدعمها المتكامل Circlecare ما يميز لصحتك النفسية والجسدية جنبًا إلى جنب، وتقدم كذلك اختبارات تمكنك من تقييم الأعراض التي تواجهها بالإضافة إلى أدوات عملية تساعدك على تحسين حياتك.',
      'يجمع هذا التطبيق بين الجزء العقلاني والعاطفي. فهو يعمل على توفير الدعم الكامل الذي يحتاج إليه كلا الجنسين.'
    ],
    image: require('../../../assets/rectangle-22608.png')
  },
  {
    id: 2,
    text: [
      "To begin, let's get you started with the app.",
      "Download Circle care from the App Store or Google Play Store.",
      "Sign up with your email and create a secure password.",
      "This is your app's home screen.",
      "Access different sections through the menu at the bottom.",
      "Swipe left and right to explore various features.",
      "Explore the app's key features.",
      "Goal Setting: Set personalized mental health goals.",
      "Mood Tracking& Assessment: Monitor your emotional and mental well-being",
      "CBT Exercises: Access cognitive behavior therapy tools.",
      "Mindfulness: Practice relaxation and mindfulness exercises.",
      "Make Circle care truly yours!",
      "Personalize your goals, preferences, and reminders in the settings menu.",
      "The Initial phase, only filled once",
      "Adjusting the App options to fit the needs.",
      "Building reliance",
    ],
    arabicTxt: [
      'تمارين العلاج السلوكي المعرفي تسهيل الوصول إلى الأدوات اللازمة.',
      'اليقظة الكاملة ممارسة تمارين الاسترخاء واليقظة الذهنية.',
      'قم بضبط تطبيق Circlecare ليتناسب مع احتياجاتك.',
      'قم بضبط أهدافك وتفضيلاتك وتنبيهاتك من قائمة الإعدادات.',
      'تملأ بيانات المرحلة الأولى مرة واحدة فقط.',
      'قم بضبط خيارات التطبيق لتناسب احتياجاتك.',
      'تعزيز الاعتماد على النفس.',
      'يجمع هذا التطبيق بين الجانب العقلاني والعاطفي، حيث يقدم لكلا الجنسين الدعم الذي يحتاجون إليه بالطريقة التي تتلاءم مع استعدادهما لاستقباله.',
      'فلنبدأ بتشغيل التطبيق',
      'قم بتنزيل "Circlecare" من App Store أو Google Play.',
      'قم بالتسجيل باستخدام بريدك الإلكتروني وأنشئ كلمة مرور آمنة.',
      'هذه هي شاشة التطبيق الرئيسية الخاصة بك.',
      'ستجد الأقسام المختلفة من خلال القائمة في الأسفل.',
      'اسحب لليسار واليمين لاستكشاف المزيد من المميزات المختلفة',
      'استكشف ميزات التطبيق الرئيسية.',
      'وضع الأهداف: حدد أهداف الصحة العقلية الشخصية.',
      'تتبع المزاج والتقييم راقب حالتك العاطفية والعقلية.',
      'تمارين العلاج السلوكي المعرفي تسهيل الوصول إلى الأدوات اللازمة',
      'اليقظة الكاملة ممارسة تمارين الاسترخاء واليقظة الذهنية.',
      'خصص تطبيق "Circlecare" ليكون جزءاً مهم من حياتك!'
    ],
    image: require('../../../assets/rectangle-226081.png')
  },
  {
    id: 3,
    text: [],
    arabicTxt: [],
    image: require('../../../assets/rectangle-226082.png')
  }
]

const Tutorial = () => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications())
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      <ScrollView overScrollMode="never" contentContainerStyle={[styles.flexCenter, { flexGrow: 1 }]} showsVerticalScrollIndicator={false}>
        <View style={[styles.flexCenter, { marginVertical: 24 }]}>
          <Image
            style={{
              width: scale(260),
              height: scale(260),
              alignSelf: 'center',
            }}
            resizeMode="contain"
            source={require('../../../assets/logos/logoNew.png')}
          />
        </View>

        {data.map(elem => (
          <View key={`tutorial-${elem.id}`} style={{ width: '80%', marginTop: 10 }}>
            <View style={{ backgroundColor: Color.whitesmoke_300, padding: 20, borderRadius: 10, }}>
              {isRTL ? elem.arabicTxt.map((txt, txtIndex) => (
                <Text key={`txt-${txtIndex}`} style={{ textAlign: 'left', margin: 2, color: 'black' }}>{`• ${txt}`}</Text>
              )) : elem.text.map((txt, txtIndex) => (
                <Text key={`txt-${txtIndex}`} style={{ margin: 2, color: 'black' }}>{`• ${txt}`}</Text>
              ))}
              <Image
                style={{ width: '100%', height: scale(155), marginTop: 10, borderRadius: 10 }}
                resizeMode="cover"
                source={elem.image}
              />
            </View>
          </View>
        ))}

        <View style={styles.btnContainer}>
          <GradiantButton txtStyle={isRTL && { fontSize: textScale(18) }} title={t('done')} onPress={() => navigation.navigate('Tab2')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  groupSpaceBlock: {
    padding: Padding.p_xl,
    backgroundColor: Color.whitesmoke_300,
    borderRadius: Border.br_mid,
  },
  rightSideIcon: {
    top: 17,
    right: 15,
    width: 67,
    height: 11,
  },
  frameParent: {
    marginTop: 30,
    alignItems: 'center',
  },
  loremIpsumDolor: {
    fontSize: FontSize.size_sm,
    lineHeight: 19,
    fontFamily: FontFamily.regularFootnote13pt,
    color: Color.dimgray_100,
    textAlign: 'left',
    width: 280,
    fontWeight: '500',
  },
  groupFrame: {
    marginTop: 24,
  },
  btnContainer: {
    width: moderateScale(310),
    alignSelf: 'center',
    marginTop: 26,
    paddingBottom: moderateScaleVertical(30)
  },
});

export default Tutorial;
