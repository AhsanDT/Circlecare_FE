import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from '../screens';

import AnimTab2 from './AnimTab2';

import BottomHome from '../screens/BottomScreens/BottomHome';
import Discover from '../screens/BottomScreens/Discover';
import Relax from '../screens/BottomScreens/Relax';

import Care from '../screens/BottomScreens/Care';
import LanguageChange from '../screens/Auth/LanguageChange';

// My Health Survey Questions
import HealthQuestionnaire from '../screens/HealthQuestionnaire';

// import Profile from './screens/BottomScreens/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import ChangePasswordProfile from '../screens/Profile/ChangePasswordProfile';

import Support from '../screens/Profile/Support';
import MyHealthSurvey from '../screens/MyHealthSurvey/MyHealthSurvey';
import Recordandprog from '../screens/Recordandprogress/Recordandprog';
import DailyReflection1 from '../screens/DailyReflection/DailyReflection1';
import DailyReflection2 from '../screens/DailyReflection/DailyReflection2';
import DailyTask1 from '../screens/DailyTask/DailyTask1';
import PainAnalog from '../screens/Recordandprogress/PainAnalog';
import PainScale from '../screens/Recordandprogress/PainScale';
import Records from '../screens/Recordandprogress/Records';
import Done from '../screens/QuestionLES/Done';
import Preview from '../screens/Preview';
import Tutorial from '../screens/Auth/Tutorial';
import Amal from '../screens/Amal';
import PrivacyPolicy from '../screens/Auth/PrivacyPolicy';
import TermsConditions from '../screens/Auth/TermsConditions';
import VideoPlayer from '../components/VideoPlayer';
import ViewDailyTask from '../screens/DailyTask/ViewDailyTask';
import ViewArticle from '../screens/ViewArticle';
import Notification from '../screens/Notification';

const Appstack = () => {
    const Stack = createStackNavigator();
    const options = {
        // gestureEnabled: true,
        // gestureDirection: 'horizontal',
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
    }

    return (
        <Stack.Navigator screenOptions={options} initialRouteName='Tutorial'>
            <Stack.Screen name="Tab2" component={AnimTab2} />
            <Stack.Screen name="Home" component={BottomHome} />
            <Stack.Screen name="Discover" component={Discover} />
            <Stack.Screen name="languageChange" component={LanguageChange} />
            <Stack.Screen name="Relax" component={Relax} />
            <Stack.Screen name="Care" component={Care} />
            <Stack.Screen name="HealthQuestionnaire" component={HealthQuestionnaire} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ChangePasswordProfile" component={ChangePasswordProfile} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="MyHealthSurvey" component={MyHealthSurvey} />
            <Stack.Screen name="Recordandprog" component={Recordandprog} />
            <Stack.Screen name="DailyReflection1" component={DailyReflection1} />
            <Stack.Screen name="DailyReflection2" component={DailyReflection2} />
            <Stack.Screen name="DailyTask1" component={DailyTask1} />
            <Stack.Screen name="PainAnalog" component={PainAnalog} />
            <Stack.Screen name="PainScale" component={PainScale} />
            <Stack.Screen name="Records" component={Records} />
            <Stack.Screen name="Done" component={Done} />
            <Stack.Screen name="Preview" component={Preview} />
            <Stack.Screen name="Amal" component={Amal} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TermsConditions" component={TermsConditions} />
            <Stack.Screen name="Tutorial" component={Tutorial} />
            <Stack.Screen name="TutorialProfile" component={Tutorial} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
            <Stack.Screen name="ViewDailyTask" component={ViewDailyTask} />
            <Stack.Screen name="ViewArticle" component={ViewArticle} />
            <Stack.Screen name="Notification" component={Notification} />
        </Stack.Navigator>
    )
}

export default Appstack