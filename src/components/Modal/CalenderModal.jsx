import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, I18nManager } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import { moderateScale, scale, textScale } from '../../utils/responsiveSizes';
import { useCallback, useEffect, useRef, useState } from 'react';
import Colors from '../../constants/Colors';
import { showError } from '../../helper/customToast';

const CalenderModal = ({ open, setOpen, date, setDate }) => {
    const { t } = useTranslation();
    const isRTL = I18nManager.isRTL;

    const [selectedDate, setSelectedDate] = useState(date || new Date());
    const [year, setYear] = useState(moment(selectedDate, 'DD-MM-YYYY').year());
    const [active, setActive] = useState(false);
    const [manualYear, setManualYear] = useState('');
    const [error, setError] = useState('');

    const manualYearRef = useRef(null)

    const currentYear = moment().year();
    const disableNextButton = year >= currentYear;

    useEffect(() => {
        setSelectedDate(date || new Date());
        setYear(moment(date || new Date(), 'DD-MM-YYYY').year());
    }, [date]);

    const hideCalendar = () => {
        setOpen(false);
    };

    const handleSelectDate = useCallback(day => {
        const formattedDate = moment(day.dateString).format('DD-MM-YYYY');
        setSelectedDate(formattedDate);
        setDate(formattedDate);
        setOpen(false);
    }, []);

    const goBackOneYear = () => {
        setActive(false)
        const newYear = year - 1;
        setYear(newYear);
        const updatedDate = moment(selectedDate, 'DD-MM-YYYY')
            .year(newYear)
            .format('DD-MM-YYYY');
        setSelectedDate(updatedDate);
    };

    const goForwardOneYear = () => {
        setActive(false)
        const newYear = year + 1;
        setYear(newYear);
        const updatedDate = moment(selectedDate, 'DD-MM-YYYY')
            .year(newYear)
            .format('DD-MM-YYYY');
        setSelectedDate(updatedDate);
    };

    const handleManualYearInput = (text) => {
        setManualYear(text);

        // Check if the entered text is a valid 4-digit year
        const isValidYear = /^\d{4}$/.test(text);

        if (isValidYear) {
            const inputYear = parseInt(text, 10);
            const currentYear = moment().year();

            if (!isNaN(inputYear) && inputYear <= currentYear) {
                setYear(inputYear);
                const updatedDate = moment(selectedDate, 'DD-MM-YYYY')
                    .year(inputYear)
                    .format('DD-MM-YYYY');
                setSelectedDate(updatedDate);
                setError('');
            } else {
                setError('Please enter a valid 4-digit year');
            }
        } else {
            setError('Please enter a valid 4-digit year');
        }
    };

    const handleManualActive = () => {
        setActive(true)

        setTimeout(() => {
            manualYearRef?.current?.focus()
        }, 0);
    }

    const markedDates = {};
    let mySelectedDate;
    if (selectedDate) {
        mySelectedDate = moment(selectedDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        markedDates[mySelectedDate] = { selected: true, selectedColor: '#BF6BBB' };
    }

    const customTheme = {
        monthTextColor: 'purple',
        calendarBackground: '#FFFFF',
    };
    // 'stylesheet.calendar.main': {
    //     week: {
    //         height: 50, // Adjust the week height as needed
    //         flexDirection: 'row',
    //         justifyContent: 'space-around',
    //         // paddingLeft: 10,
    //         // paddingRight: 10,
    //         // marginTop: 15,
    //     },
    //     // Customize the previous and next arrows
    //     // arrow: {
    //     //     padding: 10,
    //     // },
    //     // arrowImage: {
    //     //     width: 20,
    //     //     height: 20,
    //     //     tintColor: 'purple', // Change the color of the next/previous arrows
    //     // },
    // },

    return (
        <Modal
            transparent={true}
            visible={open}
            animationIn="fadeIn"
            onRequestClose={hideCalendar}
            onBackdropPress={hideCalendar}
            backgroundColor="#0008"
            backdropOpacity={0.6}
            style={styles.modal}>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.container}>
                <View style={[styles.header, isRTL && { flexDirection: 'row-reverse' }]}>
                    <TouchableOpacity activeOpacity={0.6} style={[styles.btn, { alignItems: 'flex-start', direction: 'ltr' }]} onPress={goBackOneYear}>
                        <Text style={styles.txtBtn}>Previous</Text>
                    </TouchableOpacity>

                    {active ?
                        <View style={styles.inputView}>
                            <TextInput
                                ref={manualYearRef}
                                style={styles.inputYear}
                                placeholder="Enter year"
                                placeholderTextColor={Colors.purpleAlpha}
                                keyboardType="numeric"
                                value={manualYear}
                                onBlur={() => setActive(false)}
                                onChangeText={handleManualYearInput}
                            />
                        </View> :
                        <TouchableOpacity activeOpacity={0.6} onPress={handleManualActive}>
                            <Text style={styles.txtYear}>{year}</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity activeOpacity={0.6} style={styles.btn} onPress={goForwardOneYear}
                        disabled={disableNextButton} >
                        <Text style={styles.txtBtn}>Next</Text>
                    </TouchableOpacity>
                </View>
                <Calendar
                    initialDate={moment(selectedDate, 'DD-MM-YYYY').format('YYYY-MM-DD')}
                    current={moment(selectedDate, 'DD-MM-YYYY').format('YYYY-MM-DD')}
                    onDayPress={day => {
                        handleSelectDate(day);
                    }}
                    // maxDate={new Date()}
                    hideExtraDays={true}
                    markedDates={markedDates}
                    theme={customTheme}
                    style={{
                        // backgroundColor: 'white',
                        // borderRadius: scale(10),
                        minWidth: scale(310),
                    }}
                />
            </View>
        </Modal>
    );
};

export default CalenderModal;

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        padding: 0,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        // direction: 'ltr',
        backgroundColor: 'white',
        borderRadius: scale(14),
        minWidth: scale(310),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.purple,
    },
    btn: {
        flex: 0.3,
        alignItems: 'flex-end'
    },
    txtYear: {
        // backgroundColor: 'green',
        flex: 1,
        color: Colors.purple,
        fontSize: textScale(16),
        fontWeight: '500',
        textAlign: 'center'
    },
    txtBtn: {
        fontSize: textScale(14),
        color: Colors.purpleAlpha,
    },

    // 
    inputView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    inputYear: {
        borderWidth: 1,
        borderColor: Colors.purple,
        borderRadius: 4,
        height: 30,
        fontSize: textScale(14),
        color: 'black',
        padding: 0,
        paddingHorizontal: 6
    },
    btnSet: {

    },
    txtBtnSet: {
        fontSize: textScale(14),
        color: Colors.purple
    },

    error: {
        fontSize: textScale(14),
        fontWeight: '500',
        color: 'white',
        marginBottom: 10,
        paddingHorizontal: moderateScale(24),
        textAlign: 'center'
    }
});
