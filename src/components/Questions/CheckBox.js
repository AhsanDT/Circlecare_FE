import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RadioButtonRN from 'radio-buttons-react-native';
import { useTranslation } from 'react-i18next';

import { commonStyles } from './styles';

const CheckBox = ({ handleAnswers, question, currentIndex, length }) => {
    const { t } = useTranslation();
    // const isRTL = I18nManager.isRTL;

    const handleChangeValue = (selectedValue) => {
        handleAnswers(question?.question, question?.qid, selectedValue);
    }

    return (
        <>
            <Text style={commonStyles.totalQues}>{`${t('question')} ${++currentIndex}/${length}`}</Text>
            <Text style={commonStyles.question}>
                {question.question}
                {question?.is_required && <Text style={{ color: 'red' }}> * </Text>}
            </Text>
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
})