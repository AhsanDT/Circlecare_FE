import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, BackHandler, SafeAreaView, StatusBar, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';

import Colors from '../../constants/Colors';
import { Color, FontFamily } from '../../../GlobalStyles';
import CheckBox from '../../components/Questions/CheckBox';
import MultipleChoice from '../../components/Questions/MultipleChoice';
import DropDown from '../../components/Questions/Dropdown';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../../utils/responsiveSizes';
import useQuestion from './useQuestion';
import Header from '../../components/Header';
import GradiantButton from '../../components/GradiantButton';
import { showError } from '../../helper/customToast';

const HealthQuestionnaire = ({ navigation, route }) => {
    const mainId = route?.params;

    const { t } = useTranslation();
    // const isRTL = I18nManager.isRTL;

    const { _getQuestions, _submitSurvey, loading, surveyLoading } = useQuestion();

    useEffect(() => {
        const fetchData = async () => {
            if (mainId?.data) {
                let response = await _getQuestions(mainId?.data);
                if (response?.data?.data) {
                    setQuestions(response?.data?.data[0]?.questions);
                }
            }
        };

        fetchData();
    }, [mainId]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []);

    const [survey, setSurvey] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [surveyCompleted, setSurveyCompleted] = useState(false);
    const [questions, setQuestions] = useState([]);

    const buttonText = currentIndex < questions?.length - 1 ? t('next') : t('submit');

    const handleBackButton = () => {
        if (currentIndex === 0 || surveyCompleted == true) {
            navigation.goBack();
            return true;
        } else {
            setCurrentIndex(currentIndex - 1);
            return true;
        }

        // if (currentIndex === 0) {
        //   navigation.goBack();
        //   return true;
        // } else if (surveyCompleted == true) {
        //   setSurveyCompleted(false)
        //   return true;
        // } else {
        //   setCurrentIndex(currentIndex - 1);
        //   return true;
        // }
    };

    const handleAnswerChange = (question, qid, answer) => {
        // Check if the question is already in the survey
        const existingQuestionIndex = survey.findIndex((q) => q?.qid === qid);

        if (existingQuestionIndex !== -1) {
            // Question already exists, update the answer
            const updatedSurvey = [...survey];
            updatedSurvey[existingQuestionIndex].answer = answer;
            setSurvey(updatedSurvey);
        } else {
            // Question doesn't exist, add it to the survey
            setSurvey([...survey, { question, qid, answer }]);
        }
    };

    // console.log("SURVEY ===> ", survey[2]?.answer);

    const handleNext = () => {
        const currentQuestion = questions[currentIndex];
        const isCurrentQuestionRequired = currentQuestion?.is_required;

        if (isCurrentQuestionRequired) {
            const isAnswered = survey.some((item, index) => item?.qid === currentQuestion?.qid);
            if (!isAnswered) {
                showError('Required Question', 'Please answer the current question before proceeding.');
                return;
            }
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setSurveyCompleted(true);

            setTimeout(() => {
                _submitSurvey(mainId?.data, survey)
            }, 1000);
        }
    };

    function renderQuestions() {
        return (
            <>
                <View style={styles.questionContainer}>
                    {/* Render the current question based on the currentIndex */}
                    {questions?.map((elem, index) => {
                        if (index === currentIndex) {
                            return (
                                <View key={`question-${index}`}>
                                    {elem.type === 'Checkboxes' && <CheckBox handleAnswers={handleAnswerChange} question={elem} currentIndex={currentIndex} length={questions?.length} />}
                                    {elem.type === 'Multiple Choice' && <MultipleChoice handleAnswers={handleAnswerChange} question={elem} currentIndex={currentIndex} length={questions?.length} />}
                                    {elem.type === 'Dropdown' && <DropDown handleAnswers={handleAnswerChange} question={elem} currentIndex={currentIndex} length={questions?.length} />}
                                </View>
                            );
                        }
                        return null;
                    })}
                </View>

                {questions?.length ? <View style={styles.btnContainer}>
                    <GradiantButton title={buttonText} onPress={handleNext} />
                </View> : null}
            </>
        )
    }

    function renderCompleteSurvey() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {surveyLoading ? <ActivityIndicator size='large' color={Colors.purple} />
                    : <>
                        <Image
                            style={{
                                height: scale(80),
                                width: scale(200),
                                alignSelf: 'center',
                            }}
                            resizeMode='contain'
                            source={require('../../../assets/done.png')}
                        />
                        <Text style={styles.completeTxt}>{`You have Successfully\ncompleted Survey!`}</Text>
                    </>
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle={'dark-content'} />
            <View flex={1} style={{ backgroundColor: Colors.white }}>
                <Header onPress={handleBackButton} />
                <ScrollView overScrollMode='never' contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    {loading && <ActivityIndicator size='large' color={Colors.purple} />}
                    {!loading && !questions?.length ? <Text style={styles.listEmptyTxt}>No data available.</Text> : null}
                    {!surveyCompleted ? renderQuestions() : renderCompleteSurvey()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    questionContainer: {
        flex: 1,
        paddingHorizontal: moderateScale(20),
        paddingTop: 20
    },
    question: {
        fontSize: textScale(18),
        fontWeight: '700',
        lineHeight: textScale(20),
        fontFamily: FontFamily.interBold,
        color: Colors.purple
    },
    btnContainer: {
        width: moderateScale(310),
        alignSelf: 'center',
        paddingVertical: moderateScaleVertical(30)
    },
    completeTxt: {
        fontSize: textScale(20),
        textAlign: 'center',
        marginTop: 10,
        fontStyle: 'italic',
        color: Color.darkslategray_200,
        fontWeight: '700'
    },

    listEmptyTxt: {
        marginTop: 20,
        fontSize: textScale(18),
        fontWeight: '500',
        color: '#8B8B8B',
        textAlign: 'center'
    },
});

export default HealthQuestionnaire;
