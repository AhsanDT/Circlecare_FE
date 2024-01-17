// DatePicker.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// import Colors from '../../constants/Colors';

const DatePicker = ({ date, onDateChange, onCalendarIconPress }) => {
    const { t } = useTranslation();
    // const isRTL = I18nManager.isRTL;

    return (
        <View style={styles.datePickerContainer}>
            <Text style={{ color: !date ? '#576B7480' : 'black' }}>
                {date || t('select_date')}
            </Text>
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.calendarIcon}
                onPress={onCalendarIconPress}>
                <Image
                    source={require('../../assets/calender.png')}
                    resizeMode="contain"
                    style={{ width: '100%', height: '100%' }}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '90%',
        // marginHorizontal: 20,
    },
    calendarIcon: {
        width: 20,
        height: 20,
    },
});

export default DatePicker;
