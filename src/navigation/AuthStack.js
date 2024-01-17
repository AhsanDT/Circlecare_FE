import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { CardStyleInterpolators } from '@react-navigation/stack';

import SplashScreen from '../screens/Auth/SplashScreen';
import LanguageChange from '../screens/Auth/LanguageChange';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import OTP from '../screens/Auth/OTP';
import VerifyEmail from '../screens/Auth/VerifyEmail';
import CreateNewPassword from '../screens/Auth/CreateNewPassword';
import Demographics from '../screens/Auth/Demographics';
import Demographics2 from '../screens/Auth/Demographics2';
import Acknowledgement from '../screens/Auth/Acknowledgement';
import PrivacyPolicy from '../screens/Auth/PrivacyPolicy';
import TermsConditions from '../screens/Auth/TermsConditions';

const Authstack = () => {
    const Stack = createSharedElementStackNavigator();
    const options = {
        // gestureEnabled: true,
        // gestureDirection: 'horizontal',
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
    }

    return (
        <Stack.Navigator screenOptions={options}
        // initialRouteName='Demographics'
        >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LanguageChange" component={LanguageChange} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
            <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
            <Stack.Screen name="Demographics" component={Demographics} />
            <Stack.Screen name="Demographics2" component={Demographics2} />
            <Stack.Screen name="Acknowledgement" component={Acknowledgement} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TermsConditions" component={TermsConditions} />
        </Stack.Navigator>
    )
}

export default Authstack