import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Questions, updateSurvey } from '../../redux/actions/user.action';
import { SURVEY as TYPE_SURVEY } from '../../redux/const/const';
import { showError } from '../../helper/customToast';

const useQuestions = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const survey = useSelector(state => state.health.survey)

    const [loading, setLoading] = useState(false);
    const [surveyLoading, setSurveyLoading] = useState(true);

    const _getQuestions = async (id) => {
        try {
            setLoading(true)
            const response = await dispatch(Questions(id));
            return response
        } catch (error) {
            showError('Issue In Fetching Questions!')
            console.log('Issue In Fetching Questions!', error)
        } finally {
            setLoading(false)
        }
    };

    const _submitSurvey = async (id, body) => {
        body = {
            survey: body.map(e => e)
        }

        const response = await dispatch(updateSurvey(id, body, setSurveyLoading))
        if (response) {
            dispatch({
                type: TYPE_SURVEY,
                payload: survey.map(e => e._id == id ? { ...e, is_completed: true } : e)
            });
            setTimeout(() => {
                navigation.goBack();
            }, 3000);
        }
    }

    return {
        _getQuestions,
        _submitSurvey,
        loading,
        surveyLoading
    }
}

export default useQuestions