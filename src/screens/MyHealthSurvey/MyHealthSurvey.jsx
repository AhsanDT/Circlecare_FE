import { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Colors from '../../constants/Colors';
import CalenderModal from '../../components/Modal/CalenderModal';
import { moderateScale } from '../../utils/responsiveSizes';
import Header from '../../components/Header';
import TabBar from '../../components/TabBar';
import DatePicker from '../../components/DatePicker';
import SurveyList from './SurveyList';
import useHealth from './useHealth';
import CompleteSurveyList from './CompleteSurveyList';

const MyHealthSurvey = () => {
  const { t } = useTranslation();
  // const isRTL = I18nManager.isRTL;

  const { _getSurvey, loading } = useHealth();

  useEffect(() => {
    _getSurvey();
  }, []);

  const survey = useSelector(state => state.health.survey)

  const [date, setDate] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const tabs = [
    { name: t('available') },
    { name: t('completed') },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />

      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header title={t('my_health_survey')} />

        <View style={{ flex: 1, marginTop: 20, paddingHorizontal: moderateScale(20) }}>
          <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

          <View style={{ marginTop: 10 }}>
            <DatePicker
              date={date}
              onDateChange={(newDate) => setDate(newDate)}
              onCalendarIconPress={() => setOpen(true)}
            />
          </View>

          <View style={styles.tabContent}>
            {activeTab === 0 && (
              <SurveyList data={survey?.filter(f => !f.is_completed)} loading={loading} />
            )}
            {activeTab === 1 && (
              <CompleteSurveyList data={survey?.filter(f => f.is_completed)} loading={loading} />
            )}
          </View>
        </View>

        {open && <CalenderModal open={open} setOpen={setOpen} date={date} setDate={setDate} />}
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
  tabContent: {
    flex: 1,
    marginTop: 20,
  },
});
