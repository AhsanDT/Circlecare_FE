import { useCallback, useMemo, useState } from 'react'
import { StyleSheet, Text, View, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';

import Icon from 'react-native-vector-icons/MaterialIcons'

import { commonStyles } from './styles';

const MultipleChoice = ({ handleAnswers, question, currentIndex, length }) => {
    const { t } = useTranslation();
    // const isRTL = I18nManager.isRTL;

    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);

    const handleChangeValue = useCallback((selectedValue) => {
        handleAnswers(question?.question, question?.qid, selectedValue);
        setIsFocus(false)
        setValue(value)
    }, [handleAnswers, question]);

    // Memoize the dropdown items
    const dropdownItems = useMemo(
        () =>
            question?.options.map((option) => ({
                label: option?.label,
                value: option?.label,
                ...option
            })),
        [question]
    );

    return (
        <>
            <Text style={commonStyles.totalQues}>{`${t('question')} ${++currentIndex}/${length}`}</Text>
            <Text style={commonStyles.question}>
                {question.question}
                {question?.is_required && <Text style={{ color: 'red' }}> * </Text>}
            </Text>

            <View style={{ marginTop: 10 }}>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'lightgrey', backgroundColor: '##F6F6F6' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={{ color: 'black' }}
                    iconStyle={styles.iconStyle}
                    data={dropdownItems || []}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Choose Answer' : '...'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={handleChangeValue}
                    renderRightIcon={() => (
                        <Icon
                            style={styles.icon}
                            color={'black'}
                            name={isFocus ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                            size={20}
                        />
                    )}
                />
            </View>
        </>
    )
}

export default MultipleChoice

const styles = StyleSheet.create({
    // New DropDown
    dropdown: {
        height: 50,
        borderColor: 'lightgrey',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    labelTxt: {
        position: 'absolute',
        backgroundColor: 'white',
        color: 'lightgray',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'lightgrey'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});