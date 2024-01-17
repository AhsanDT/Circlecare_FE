import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  I18nManager,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';

import Colors from '../../constants/Colors';
import { Color, FontFamily, Border, FontSize } from '../../../GlobalStyles';
import { get_Records_Body, get_Records_of_health, post_Records_of_health } from '../../redux/actions/user.action';
import Header from '../../components/Header';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../../utils/responsiveSizes';
import CalenderModal from '../../components/Modal/CalenderModal';
import TabBar from '../../components/TabBar';
import DatePicker from '../../components/DatePicker';
import GradiantButton from '../../components/GradiantButton';
import SuccessModal from '../../components/Modal/SuccessModal';
import { showError } from '../../helper/customToast';
import { emojis } from './PainScale';

const MyHealthSurvey = ({ navigation }) => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const dispatch = useDispatch();

  const screenWidth = Dimensions.get('window').width;

  const [activeTab, setActiveTab] = useState(0);
  const [activeTab1, setActiveTab1] = useState('Pain Chart');
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');

  const [parts, setparts] = useState([])
  const [alldata, setalldata] = useState([]);

  const [state, setState] = useState({});
  const [A, setA] = useState([]);
  const [B, setB] = useState([]);
  const [C, setC] = useState([]);
  const [D, setD] = useState([]);
  const [E, setE] = useState([]);

  // Get the current date
  var currentDate = new Date();
  // Subtract 7 days
  currentDate.setDate(currentDate.getDate() - 7);
  // Format the result as a string (e.g., "YYYY-MM-DD")
  var formattedDate = currentDate.toISOString().slice(0, 10);
  const tarekh = moment(new Date).format('YYYY-MM-DD');

  useEffect(() => {
    // if (activeTab == 'Show Reports') {
    listing()
    // }
  }, [activeTab])

  useEffect(() => {
    getMyRecords();
  }, [date]);

  useEffect(() => {
    const systol = [];
    const blood_pressureArr = [];
    const sleep = [];
    const sugar = [];
    const weight = []
    if (alldata) {
      alldata.forEach(item => {
        blood_pressureArr.push(item.blood_pressure);
      });
      alldata.forEach(item => {
        systol.push(item.blood_pressure_systole);
      });
      alldata.forEach(item => {
        sleep.push(item.sleeping_hours);
      });
      alldata.forEach(item => {
        sugar.push(item.sugar_level);
      });
      alldata.forEach(item => {
        weight.push(item.weight);
      });
    }
    setA(systol || [])
    setB(blood_pressureArr || [])
    setC(sleep || [])
    setD(sugar || [])
    setE(weight || [])
  }, [alldata, date])

  const listing = async () => {
    const response = await dispatch(get_Records_Body(setIsLoading))
    setparts(response?.data?.data || [])
  }

  const getMyRecords = async () => {
    const momentDate = moment(date, 'DD-MM-YYYY');
    const convertedDate = momentDate.format('YYYY-MM-DD');

    const body = {
      from_date: formattedDate,
      till_date: date ? convertedDate : tarekh,
    };
    const response = await dispatch(get_Records_of_health(body));
    setalldata(response?.data?.data || []);
  };

  const addMyRecords = async () => {
    const requiredFields = ['blood_pressure_systole', 'blood_pressure', 'sugar_level', 'sleeping_hours', 'weight'];
    const missingFields = requiredFields.filter(field => !state[field] || state[field].trim() === '');

    if (missingFields.length > 0) {
      showError("All Fields are required!")
      return;
    }

    let response = await dispatch(post_Records_of_health(state, setLoading, setSuccess));
    if (response?.data?.success == 1) {
      setState({})
      getMyRecords();
    };
  };

  const data = {
    datasets: [
      {
        data: A,
        color: () => '#8853A7',
        strokeWidth: 1,
      },
    ],
  };
  const data1 = {
    datasets: [
      {
        data: B,
        color: () => 'red',
        strokeWidth: 1,
      },
    ],
  };
  const SLDATA = {
    datasets: [
      {
        data: D,
        color: () => '#8853A7',
        strokeWidth: 1,
      },
    ],
  };
  const SHDATA = {
    datasets: [
      {
        data: C,
        color: () => '#8853A7',
        strokeWidth: 1,
      },
    ],
  };
  const WData = {
    datasets: [
      {
        data: E,
        color: () => '#8853A7',
        strokeWidth: 1,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#aaa',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#aaa',
    backgroundGradientToOpacity: 0.5,
    color: () => "#8853A7",
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, //
    color: () => '#8853A7',
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: 'gray',
    },
    propsForDots: {
      r: '1',
      strokeWidth: '1.5',
      stroke: 'gray',
    },
    labelColor: () => '#8853A7',
  };

  const chartConfig1 = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFF',
    backgroundGradientToOpacity: 0.5,
    color: () => '#8853A7',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, //
    labelColor: () => '#FFF',
    propsForDots: {
      r: '1',
      strokeWidth: '2',
      stroke: '#8853A7',
    },
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
  };

  const handleInputChange = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }))
  }

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const tabs = [
    { name: t('my_records') },
    { name: t('show_reports') },
  ];

  const combinedData = {
    datasets: [
      {
        data: A,
        color: () => '#8853A7',
        strokeWidth: 1,
      },
      {
        data: B,
        color: () => 'red',
        strokeWidth: 1,
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />

      <View style={styles.container}>
        <Header title={t('records_and_progress')} />
        <View style={{ flex: 1, marginTop: 20, paddingHorizontal: moderateScale(20) }}>
          <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

          <View style={styles.tabContent}>
            {activeTab === 0 && (
              <ScrollView overScrollMode='never' contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View flex={1} style={{ gap: 20 }}>
                  {/* Pain Analogue */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('PainAnalog')}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderWidth: 0.5,
                        paddingVertical: 8,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        borderColor: '#aaa',
                      }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          style={{ height: 35, width: 35 }}
                          source={require('../../../assets/headache-1-1.png')}
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontWeight: 'bold',
                            color: Colors.purple,
                          }}>
                          {t('pain_analogue')}
                          {/* "pain_analogue": "التناظرية الألم", */}
                        </Text>
                      </View>
                      <View>
                        <FontAwesome
                          name={isRTL ? 'angle-left' : 'angle-right'}
                          size={25}
                          color={Colors.purple}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* Inputs */}
                  <View style={styles.inputView}>
                    <TextInput
                      style={{ ...styles.input, textAlign: isRTL ? 'right' : 'left' }}
                      placeholder={`${t('update_blood_pressure')} (${t('systole')})`}
                      placeholderTextColor={'lightgrey'}
                      placeholderStyle={{}}
                      value={state?.blood_pressure_systole}
                      keyboardType="numeric"
                      onChangeText={(val) => handleInputChange('blood_pressure_systole', val)}
                    />
                  </View>

                  <View style={styles.inputView}>
                    <TextInput
                      style={{ ...styles.input, textAlign: isRTL ? 'right' : 'left' }}
                      placeholder={`${t('update_blood_pressure')} (${t('diastole')})`}
                      placeholderTextColor={'lightgrey'}
                      placeholderStyle={{}}
                      keyboardType="numeric"
                      value={state?.blood_pressure}
                      onChangeText={(val) => handleInputChange('blood_pressure', val)}
                    />
                  </View>

                  <View style={styles.inputView}>
                    <TextInput
                      style={{ ...styles.input, textAlign: isRTL ? 'right' : 'left' }}
                      placeholder={t('sugar_level')}
                      placeholderTextColor={'lightgrey'}
                      placeholderStyle={{}}
                      keyboardType="numeric"
                      value={state?.sugar_level}
                      onChangeText={(val) => handleInputChange('sugar_level', val)}
                    />
                  </View>

                  <View style={styles.inputView}>
                    <TextInput
                      style={{ ...styles.input, textAlign: isRTL ? 'right' : 'left' }}
                      placeholder={t('sleeping_hours')}
                      placeholderTextColor={'lightgrey'}
                      keyboardType="numeric"
                      value={state?.sleeping_hours}
                      onChangeText={(val) => handleInputChange('sleeping_hours', val)}
                    />
                  </View>

                  <View style={styles.inputView}>
                    <TextInput
                      style={{ ...styles.input, textAlign: isRTL ? 'right' : 'left' }}
                      placeholder={t('weigth')}
                      placeholderTextColor={'lightgrey'}
                      placeholderStyle={{}}
                      keyboardType="numeric"
                      value={state?.weight}
                      onChangeText={(val) => handleInputChange('weight', val)}
                    />
                  </View>
                </View>

                <View style={styles.btnContainer}>
                  <GradiantButton title={t('save')} onPress={addMyRecords} loading={loading} />
                </View>
              </ScrollView>
            )}

            {activeTab === 1 && (
              <>
                <View style={[styles.tabItemsContainer, isRTL && { flexDirection: 'row-reverse' }]}>
                  {['Pain Chart', 'BP', 'SL', 'SH', 'Weight'].map(e => (
                    <TouchableOpacity
                      key={e}
                      style={[
                        styles.tabItemSmall,
                        activeTab1 === e && styles.activeTabSmall,
                      ]}
                      onPress={() => setActiveTab1(e)}>
                      <Text
                        style={[
                          styles.tabTextSmall,
                          {
                            color: activeTab1 === e ? "#BF6BBB" : '#999',
                            borderBottomWidth: activeTab1 === e ? 2 : 0,
                            borderBottomColor: activeTab1 === e ? "#BF6BBB" : 'transparent'
                          },
                        ]}>
                        {e}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Date View */}
                <View style={{ marginBottom: 6 }}>
                  <DatePicker
                    date={date || moment(new Date).format('DD-MM-YYYY')}
                    onDateChange={setDate}
                    onCalendarIconPress={() => setOpen(true)}
                  />
                </View>

                <ScrollView overScrollMode='never' contentContainerStyle={styles.containerContainer} showsVerticalScrollIndicator={false}>
                  {/* Render the tabs' content below the tabs */}
                  <View style={styles.tabContentContainer}>
                    {/* Painchart */}
                    {activeTab1 === 'Pain Chart' && (
                      <>
                        <View style={{ marginTop: 20 }}>
                          <Image
                            style={{
                              height: scale(200),
                              width: '100%',
                              borderRadius: 10,
                            }}
                            source={require('../../../assets/rectangle-22603.png')}
                          />
                          {isLoading && <ActivityIndicator size='small' color="black" style={{ marginTop: 20 }} />}


                          {parts?.map((i, index) => {
                            let painEmoji = emojis.find(e => e.end == i?.scale || e.start == i?.scale).image

                            return (
                              <View key={`part-${index}`}
                                style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: textScale(15), color: 'black', fontWeight: '500' }}>
                                  {`${t('body_part')}: ${i?.category[0].toUpperCase() + i?.category.slice(1)}`}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                  <Text style={{ fontSize: textScale(15), color: 'black', fontWeight: '500', }}>
                                    {t('pain_level')}:
                                  </Text>
                                  <Image style={{ width: scale(25), height: scale(25) }} source={painEmoji} />
                                </View>
                              </View>
                            )
                          })}
                        </View>
                      </>
                    )}

                    {/* BP */}
                    {activeTab1 === 'BP' && (
                      <>
                        {A.length || B.length ? <View style={{ marginTop: 10 }}>
                          <LineChart
                            style={{ borderRadius: 10 }}
                            data={combinedData}
                            width={screenWidth}
                            height={350}
                            verticalLabelRotation={95}
                            chartConfig={chartConfig}
                            bezier
                            withVerticalLines={false}
                          />
                          <View style={[styles.rowCenter, { marginTop: 20, gap: 20 }]}>
                            <View style={[styles.rowCenter, { gap: 6 }]}>
                              <View style={[styles.circleDot, { backgroundColor: '#cf006e' }]} />
                              <Text style={{ color: "#cf006e", fontSize: 14 }}>Diastole</Text>
                            </View>
                            <View style={[styles.rowCenter, { gap: 6 }]}>
                              <View style={[styles.circleDot, { backgroundColor: '#bf6bbb' }]} />
                              <Text style={{ color: "#bf6bbb", fontSize: 14 }}>Systole</Text>
                            </View>
                          </View>
                        </View> : null}

                        <View style={{ marginTop: 20, gap: 6 }}>
                          <Text style={styles.sectionTitle}>Bp Guide</Text>
                          <View style={{ height: scale(164) }}>
                            <Image style={{ width: '100%', height: '100%' }}
                              resizeMode='contain'
                              source={require('../../../assets/bloodPressure.png')}
                            />
                          </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                          <Text style={[styles.sectionTitle, !alldata?.length && { textAlign: 'center' }]}>{alldata?.length ? t('records') : 'No Records Founds'}</Text>
                          {alldata?.map(i => (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10,
                              }}>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {moment(i?.createdAt).format('DD-MM-YYYY')}
                                </Text>
                              </View>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {moment(i?.createdAt).format('HH:MM A')}
                                </Text>
                              </View>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {i?.blood_pressure}/{i?.blood_pressure_systole}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </>
                    )}

                    {/* SL */}
                    {activeTab1 === 'SL' && (
                      <>
                        {D.length ? <View style={{ marginTop: 10 }}>
                          <LineChart
                            data={SLDATA}
                            width={screenWidth}
                            height={250}
                            verticalLabelRotation={80}
                            chartConfig={chartConfig}
                            bezier
                            withVerticalLines={false}
                          />
                        </View> : null}
                        <View style={{ marginTop: 20 }}>
                          <Text style={[styles.sectionTitle, { textAlign: 'left' }, !alldata?.length && { textAlign: 'center' }]}>{alldata?.length ? t('records') : 'No Records Founds'}</Text>
                          {alldata?.map(i => (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10,
                              }}>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {moment(i?.createdAt).format('DD-MM-YYYY')}
                                </Text>
                              </View>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {moment(i?.createdAt).format('HH:MM A')}
                                </Text>
                              </View>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {i?.sugar_level}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </>
                    )}

                    {/* SH */}
                    {activeTab1 === 'SH' && (
                      <>
                        {C.length ? <View style={{ marginTop: 10 }}>
                          <LineChart
                            style={{ borderRadius: 10 }}
                            data={SHDATA}
                            width={screenWidth}
                            height={300}
                            verticalLabelRotation={80}
                            chartConfig={chartConfig}
                            bezier
                            withVerticalLines={false}
                          />
                        </View> : null}

                        <View style={{ marginTop: 20 }}>
                          <Text style={[styles.sectionTitle, { textAlign: 'left' }, !alldata?.length && { textAlign: 'center' }]}>{alldata?.length ? t('records') : 'No Records Founds'}</Text>
                          {alldata?.map(i => (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 20,
                              }}>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {moment(i?.createdAt).format('DD-MM-YYYY')}
                                </Text>
                              </View>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {moment(i?.createdAt).format('HH:MM A')}
                                </Text>
                              </View>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {i?.sleeping_hours}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </>
                    )}

                    {/* WEIGHT */}
                    {activeTab1 === 'Weight' && (
                      <>
                        {E.length ? <View style={{ marginTop: 10 }}>
                          <LineChart
                            // style={{backgroundColor:'red'}}
                            data={WData}
                            width={screenWidth}
                            height={250}
                            verticalLabelRotation={80}
                            chartConfig={chartConfig}
                            bezier
                            withVerticalLines={false}
                          />
                        </View> : null}

                        <View style={{ marginTop: 20 }}>
                          <Text style={[styles.sectionTitle, { textAlign: 'left' }, !alldata?.length && { textAlign: 'center' }]}>{alldata?.length ? t('records') : 'No Records Founds'}</Text>
                          {alldata?.map(i => (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 20,
                              }}>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {moment(i?.createdAt).format('DD-MM-YYYY')}
                                </Text>
                              </View>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {moment(i?.createdAt).format('HH:MM A')}
                                </Text>
                              </View>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: Color.darkslategray_100 }}>
                                  {i?.weight}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </>
                    )}
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>

        {open && <CalenderModal open={open} setOpen={setOpen} date={date} setDate={setDate} />}
        {success && <SuccessModal open={success} setOpen={setSuccess} message={t('saved_sucessfully')} />}
      </View>
    </SafeAreaView>
  );
};

export default MyHealthSurvey;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerContainer: {
    flexGrow: 1,
    paddingBottom: 40
  },
  tabContent: {
    flex: 1,
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: scale(15),
    fontWeight: '500',
    color: 'black'
    // marginTop: 20,
  },
  circleDot: {
    height: scale(11),
    width: scale(11),
    borderRadius: scale(11 / 2),
  },

  btnContainer: {
    width: moderateScale(310),
    alignSelf: 'center',
    paddingVertical: moderateScaleVertical(30)
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  placeholder: {
    fontSize: FontSize.defaultRegularBody_size,
    lineHeight: 22,
    fontFamily: FontFamily.defaultRegularBody,
    color: Color.labelColorLightSecondary,
    marginLeft: 6,
    textAlign: 'left',
    letterSpacing: 0,
    flex: 1,
  },
  label: {
    marginTop: -8.13,
    lineHeight: 19,
    color: Color.neutral900,
    height: 15,
  },
  text: {
    top: 1,
    fontSize: FontSize.defaultBoldSubheadline_size,
    lineHeight: 20,
    fontFamily: FontFamily.interMedium,
    height: 20,
    color: Color.labelColorDarkPrimary,
    width: 54,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0,
    left: 0,
    position: 'absolute',
  },

  time: {
    borderRadius: Border.br_5xl,
    left: 0,
    top: 0,
  },
  leftSide: {
    top: 12,
    left: 21,
  },
  statusBarIphoneXOrNewe: {
    height: 44,
    top: 0,
    overflow: 'hidden',
  },
  title: {
    fontSize: FontSize.size_13xl,
    letterSpacing: -0.1,
    fontWeight: '700',
    fontFamily: FontFamily.satoshiVariableBold,
    color: Color.labelColorDarkPrimary,
    textAlign: 'left',
  },
  tabs: {
    height: 65,
    left: '50%',
    top: 0,
    overflow: 'hidden',
  },
  buttonsPosition: {
    borderRadius: 40,
    // width: 343,
    width: '100%',
    alignSelf: 'center',
    // position:'absolute',
  },
  buttons: {
    // top: '165%',
    height: 45,
    // marginTop:10
  },
  pressable: {
    borderRadius: Border.br_47xl,
    height: '100%',
    backgroundColor: 'transparent',
    width: '100%',
  },
  parentFlexBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.labelColorDarkPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
  },
  tabItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tabItemSmall: {
    // flex: 1,
    // backgroundColor: 'red',
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTabSmall: {
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  tabTextSmall: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tabContentContainer: {
    // marginTop: 10,
    // Add any additional styling you need for the content container
  },

  inputView: {
    height: 55,
    width: '100%',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: "center",
    paddingLeft: 10
  },
  input: {
    fontSize: textScale(16),
    textAlign: 'left',
    color: Color.systemBlack
  },
});
