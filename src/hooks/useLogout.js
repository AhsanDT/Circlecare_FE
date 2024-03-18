import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT } from '../redux/const/const';

const useLogout = (socket) => {
    const dispatch = useDispatch()
    const loginType = useSelector((state) => state?.auth?.loginType)

    const logout = async () => {
        try {
            if (loginType === 'google') {
                const currentUser = await GoogleSignin.getCurrentUser();
                // Sign out from Google if logged in with Google
                currentUser && await GoogleSignin.signOut();
            }

            await dispatch({ type: LOG_OUT });
            socket.disconnect();
            console.log('User successfully logged out.');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return {
        logout
    }
}

export default useLogout