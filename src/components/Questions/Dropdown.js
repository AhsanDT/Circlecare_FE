import { useCallback, useMemo, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Dropdown as ElementDropdown } from 'react-native-element-dropdown';

import { moderateScale, moderateScaleVertical, textScale } from '../../utils/responsiveSizes';
import Colors from '../../constants/Colors';
import { FontFamily } from '../../../GlobalStyles';

const Dropdown = ({ handleAnswers, question, currentIndex, length }) => {
    const [update, setUpdate] = useState({ question: question?.question, answer: [] })

    return (
        <>
            <Text style={styles.question}>{question?.question}</Text>
            <Text style={styles.totalQues}>{`${++currentIndex}/${length}`}</Text>
            <View style={{ marginTop: 10 }}>
                {question?.options.map((option, ind) => (
                    <CustomDropDown
                        key={ind}
                        subQuestion={option.sub_question}
                        options={option.sub_options}
                        update={update}
                        setUpdate={setUpdate}

                        question={question}
                        handleAnswers={handleAnswers}
                    />
                ))}
            </View>
        </>
    )
}

const CustomDropDown = ({ subQuestion, options, update, setUpdate, question, handleAnswers }) => {
    const [value, setValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);


    const handleDropdownSelect = (item) => {
        const updatedAnswers = [...update.answer];

        // Check if the subQuestion is already in the answer
        const existingAnswerIndex = updatedAnswers.findIndex((ans) => ans.sub_question === subQuestion);

        if (existingAnswerIndex !== -1) {
            // Answer already exists, update the sub_answers
            updatedAnswers[existingAnswerIndex].sub_answers = item;
        } else {
            // Answer doesn't exist, add it to the answer
            updatedAnswers.push({
                sub_question: subQuestion,
                sub_answers: item,
            });
        }

        setUpdate({ ...update, answer: updatedAnswers });
        handleAnswers(question?.question, question?.qid, updatedAnswers);
    };

    return (
        <View>
            <Text style={{ fontSize: 13.5, fontWeight: '600', marginTop: 30, marginBottom: 10, color: 'black', }}>
                {subQuestion}
            </Text>

            <View style={styles.container}>
                <ElementDropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'lightgrey' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={{
                        color: 'black',
                    }}
                    iconStyle={styles.iconStyle}
                    data={options}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Answer' : '...'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={handleDropdownSelect}
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
        </View>
    );
};

export default Dropdown

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

    // Dropdown
    container: {
        // backgroundColor: 'red',
        backgroundColor: 'white',
        // padding: 16,
        paddingHorizontal: moderateScale(20),
    },
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
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    itemText: {
        fontSize: 16,
        color: 'black',
    },
    selectedItemText: {
        color: 'blue',
    },
})