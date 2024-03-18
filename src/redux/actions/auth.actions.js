import { base_Url } from '../../config/config';
import * as types from '../const/const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../config/httpservice';
import { showError, showSuccess } from '../../helper/customToast';

// ***************************Auth Screen ************************************
// Email Check
export const EmailCheck = (email, setError) => async dispatch => {
    try {
        const response = await instance.get(`/appuser/is-email-duplicate?email=${email}`);
        if (response) {
            return response?.data?.data
        }
    } catch (error) {
        setError(error?.response?.msg)
        console.log("email check error ===>", JSON.stringify(error?.response));
    }
};

// Login
export const userLogin = (data, setLoginError, setLoading) => async dispatch => {
    try {
        setLoading(true);
        const response = await instance.post(`/appuser/login`, data);
        if (response) {
            await AsyncStorage.setItem('Token', response?.data?.access_token);
            dispatch({
                type: types.PROFILE,
                payload: response?.data?.user,
            });
            dispatch({
                type: types.LOG_IN,
                payload: response?.data?.access_token,
            });
            // console.log("Login===================", response?.data?.user)
        }
    } catch (error) {
        setLoginError(error?.response?.msg || error?.response?.data?.error || 'Something went wrong!')
        showError(error?.response?.msg || error?.response?.data?.error || 'Something went wrong!')
        console.log("Error on login ===> ", JSON.stringify(error));
    } finally {
        setLoading(false)
    }
};

// Signup
export const Register = (data, navigation, setLoading) => async dispatch => {
    try {
        setLoading(true)
        const response = await instance.post(`/appuser/register`, data);
        console.log("SIgup Response ===> ", response);
        if (response) {
            showSuccess(response?.data?.msg)
            dispatch({
                type: types.ACTIVATION_TOKEN,
                payload: response?.data?.activation_token,
            });
            navigation.navigate('VerifyEmail');
        }
    } catch (error) {
        showError(error?.response?.data?.error || "Something went wrong!");
        console.log(JSON.stringify(error));
        console.log('EROROROOR', JSON.stringify(error?.response?.data?.error));
    } finally {
        setLoading(false)
    }
};

// Signup Activating Account
export const Activating = (data, setLoading) => async dispatch => {
    try {
        setLoading(true)
        const response = await instance.post(`/appuser/activate`, data);
        if (response) {
            await AsyncStorage.setItem('Token', response?.data?.access_token);
            dispatch({
                type: types.LOG_IN,
                payload: response?.data?.access_token,
            });
            dispatch({
                type: types.PROFILE,
                payload: response?.data?.user,
            });

            showSuccess("You have Successfully Registered!")
        }
    } catch (error) {
        showError(error?.response?.data?.error || "Something went wrong!");
        console.log('EROROROOR', JSON.stringify(error.response));
    } finally {
        setLoading(false)
    }
};

// Forgot Password Request
export const forgetPass = (body, navigation, setLoading) => async dispatch => {
    try {
        setLoading(true)
        const response = await instance.post(`/appuser/forgot`, body);
        if (response) {
            navigation.navigate('OTP')
            console.log("response: " + JSON.stringify(response));
        }
    } catch (error) {
        showError(error?.response?.data?.error || "Something went wrong!");
        console.log(JSON.stringify(error));
    } finally {
        setLoading(false)
    }
};

// Forgot OTP Verify
export const OTTP = (body, navigation, setLoading) => async dispatch => {
    try {
        setLoading(true)
        const response = await instance.post(`/appuser/verifyotp`, body);
        if (response) {
            navigation.navigate("CreateNewPassword")
            console.log("response: " + JSON.stringify(response));
        }
    } catch (error) {
        showError(error?.response?.data?.error || "Something went wrong!");
        console.log(JSON.stringify(error?.response));
    } finally {
        setLoading(false)
    }
};

// Create New Password
export const createNewPass = (body, navigation, setLoading) => async dispatch => {
    try {
        setLoading(true)
        const response = await instance.patch(`/appuser/reset`, body);
        if (response) {
            navigation.navigate('Login')
            console.log("response: " + JSON.stringify(response));
        }
    } catch (error) {
        showError(error?.response?.data?.error || "Something went wrong!");
        console.log(JSON.stringify(error?.response));
    } finally {
        setLoading(false)
    }
};


// *************************** SOCIAL AUTH ************************************
// Google Login
export const googleLogin = (data, setLoading) => async dispatch => {
    try {
        setLoading(true);
        const response = await instance.post(`/appuser/api/google`, data);
        if (response) {
            await AsyncStorage.setItem('Token', response?.data?.token || response?.data?.access_token);
            dispatch({
                type: types.LOG_IN,
                payload: response?.data?.token || response?.data?.access_token,
            });
            dispatch({
                type: types.SOCIAL_PROFILE,
                payload: { user: response?.data?.user, type: 'google' },
            });
        }
    } catch (error) {
        showError(
            error?.response?.msg ||
            error?.response?.data?.error ||
            'Something went wrong!',
        );
        console.log("Error on google login ===> ", JSON.stringify(error));
    } finally {
        setLoading(false);
    }
};

// Facebook Login
// Apple Login