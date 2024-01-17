import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import Colors from '../../constants/Colors';
import CalenderModal from '../../components/Modal/CalenderModal';
import Header from '../../components/Header';
import { moderateScale } from '../../utils/responsiveSizes';
import TabBar from '../../components/TabBar';
import DatePicker from '../../components/DatePicker';
import DailyList from './DailyList';
import useDaily from './useDaily';

const DailyTask1 = () => {
  const { t } = useTranslation();
  // const isRTL = I18nManager.isRTL;

  const { _getDaily, loading } = useDaily();

  const dailyArticles = useSelector(state => state.health.daily_articles)
  const dailyVideos = useSelector(state => state.health.daily_videos)

  // console.log("dailyArticles =====>", dailyArticles);

  const [date, setDate] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);

  // Get the current date
  var currentDate = new Date();
  // Subtract 7 days
  currentDate.setDate(currentDate.getDate() - 7);
  // Format the result as a string (e.g., "YYYY-MM-DD")
  var formattedDate = currentDate.toISOString().slice(0, 10);
  const tarekh = moment(new Date).format('YYYY-MM-DD');

  const momentDate = moment(date, 'DD-MM-YYYY');
  const convertedDate = momentDate.format('YYYY-MM-DD');

  let body = {
    taskType: activeTab == "tasks" ? "Article" : "Video",
    // from_date: formattedDate,
    to_date: date ? convertedDate : tarekh,
  }

  useEffect(() => {
    _getDaily(body);
  }, [activeTab, date])

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const tabs = [
    { name: t('tasks') },
    { name: t('videos') },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />

      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header title={t('daily_task')} />

        <View style={{ marginTop: 20, paddingHorizontal: moderateScale(20) }}>
          <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

          <View style={{ marginTop: 10 }}>
            <DatePicker
              date={date || moment(new Date).format('DD-MM-YYYY')}
              onDateChange={(newDate) => setDate(newDate)}
              onCalendarIconPress={() => setOpen(true)}
            />
          </View>
        </View>

        <View style={styles.tabContent}>
          {activeTab === 0 && (
            <DailyList data={dailyArticles} loading={loading} />
          )}
          {activeTab === 1 && (
            <DailyList data={dailyVideos} loading={loading} />
          )}
        </View>

        {open && <CalenderModal open={open} setOpen={setOpen} date={date} setDate={setDate} />}
      </View>
    </SafeAreaView>
  );
};

export default DailyTask1;

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    marginTop: 20,
  },
});
