import { useDispatch } from 'react-redux';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';

import { FORMONE } from '../../redux/const/const';
import { EmailCheck, googleLogin } from '../../redux/actions/auth.actions';
import { getDataFromStorage, setDataInStorage } from '../../utils/asyncStorage';
import { useNavigation } from '@react-navigation/native';


const useAuth = (setLoading, setLoginError) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const emailChecker = async (email) => {
        const data = await dispatch(EmailCheck(email, setLoginError))
        return data;
    }

    const googleLoginHandler = async () => {
        try {
            await GoogleSignin.hasPlayServices();

            let currentUser = await GoogleSignin.getCurrentUser()
            currentUser && await GoogleSignin.signOut();

            const userInfo = await GoogleSignin.signIn();
            const token = await GoogleSignin.getTokens();
            const fcmToken = await getDataFromStorage('fcmToken');

            let emailchecker = await emailChecker(userInfo?.user?.email);
            if (userInfo && token && emailchecker) {
                let data = {
                    accessToken: token?.accessToken,
                    first_name: userInfo?.user?.name?.split(' ')[0] || '',
                    last_name: userInfo?.user?.name?.split(' ')[1] || '',
                    email: userInfo?.user?.email,
                    nickname: '',
                    avatar: userInfo?.user?.photo || '',
                    FCMToken: fcmToken,
                }
                dispatch(googleLogin(data, setLoading));
                return
            }

            if (token && userInfo) {
                let data = {
                    accessToken: token?.accessToken,
                    googleId: userInfo?.user?.email,
                    FCMToken: fcmToken,
                    first_name: userInfo?.user?.name?.split(' ')[0] || '',
                    last_name: userInfo?.user?.name?.split(' ')[1] || '',
                    email: userInfo?.user?.email,
                    avatar: userInfo?.user?.photo || '',
                    type: 'google'
                }

                dispatch({ type: FORMONE, payload: data });
                navigation.navigate('Demographics');
            }
        } catch (error) {
            console.log("google login error ====>>", error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    const appleLoginHandler = async () => {
        try {
            // Perform login request after logout
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
            });

            const fcmToken = await getDataFromStorage('fcmToken');

            // Get current authentication state for the user
            const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

            if (appleAuthRequestResponse?.email) await setDataInStorage('appleEmail', appleAuthRequestResponse?.email,)
            let appleEmail = await getDataFromStorage('appleEmail') || null

            // console.log("appleEmail =====", appleEmail);

            // Use credentialState response to ensure the user is authenticated
            if (credentialState === appleAuth.State.AUTHORIZED) {
                let emailchecker = await emailChecker(appleEmail || appleAuthRequestResponse?.email);
                if (emailchecker) {
                    let data = {
                        accessToken: appleAuthRequestResponse?.identityToken,
                        appleId: appleEmail || appleAuthRequestResponse?.email,
                        first_name: appleAuthRequestResponse?.fullName?.givenName || 'First Name',
                        last_name: appleAuthRequestResponse?.fullName?.familyName || 'Last Name',
                        email: appleEmail || appleAuthRequestResponse?.email,
                        nickname: '',
                        avatar: '',
                        FCMToken: fcmToken,
                    }
                    dispatch(googleLogin(data, setLoading));
                    return
                }

                let data = {
                    accessToken: appleAuthRequestResponse?.identityToken,
                    appleId: appleEmail || appleAuthRequestResponse?.email,
                    FCMToken: fcmToken,
                    first_name: appleAuthRequestResponse?.fullName?.givenName || 'First Name',
                    last_name: appleAuthRequestResponse?.fullName?.familyName || 'Last Name',
                    email: appleEmail || appleAuthRequestResponse?.email,
                    avatar: '',
                    type: 'apple'
                }

                dispatch({ type: FORMONE, payload: data });
                navigation.navigate('Demographics');
            }
        } catch (error) {
            console.error('Apple Sign-In error:', error);
            // Handle the error appropriately
        }
    }

    return {
        googleLoginHandler,
        appleLoginHandler
    }
}

export default useAuth