import { useCallback, useMemo, useState } from 'react'
import { StyleSheet, Text, View, } from 'react-native';
import { FontFamily } from '../../../GlobalStyles';
import { moderateScaleVertical, textScale } from '../../utils/responsiveSizes';
import Colors from '../../constants/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons'

const MultipleChoice = ({ handleAnswers, question, currentIndex, length }) => {
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
            <Text style={styles.question}>{question.question}</Text>
            <Text style={styles.totalQues}>{`${++currentIndex}/${length}`}</Text>
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
    question: {
        fontSize: textScale(18),
        fontWeight: '700',
        lineHeight: textScale(20),
        fontFamily: FontFamily.interBold,
        color: Colors.purple
    },
    totalQues: {
        paddingVertical: moderateScaleVertical(14),
        fontSize: textScale(18),
        lineHeight: textScale(20),
        fontFamily: FontFamily.interRegular,
        color: Colors.purple
    },


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