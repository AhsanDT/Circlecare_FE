import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RadioButtonRN from 'radio-buttons-react-native';
import { moderateScaleVertical, textScale } from '../../utils/responsiveSizes';
import Colors from '../../constants/Colors';
import { FontFamily } from '../../../GlobalStyles';

const CheckBox = ({ handleAnswers, question, currentIndex, length }) => {

    const handleChangeValue = (selectedValue) => {
        handleAnswers(question?.question, question?.qid, selectedValue);
    }


    return (
        <>
            <Text style={styles.question}>{question.question}</Text>
            <Text style={styles.totalQues}>{`${++currentIndex}/${length}`}</Text>
            <View style={{ marginTop: 10 }}>
                <RadioButtonRN
                    activeColor={'white'}
                    // deactiveColor={'transparent'}
                    box={true}
                    boxStyle={{ height: 80, width: '90%', alignSelf: 'center', color: '#424242' }}
                    data={question?.options.map(option => ({
                        label: option?.label,
                        ...option
                    }))}
                    selectedBtn={handleChangeValue}
                    boxActiveBgColor={'#BF6BBB'}
                    textColor={'black'}
                />
            </View>
        </>
    )
}

export default CheckBox

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
})