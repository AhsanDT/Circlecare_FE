import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';

import navigationService from "./navigationService";
import Appstack from './AppStack'
import Authstack from './AuthStack'

const Main = () => {
    const token = useSelector((state) => state?.auth?.Access_token)

    return (
        <NavigationContainer ref={(ref) => navigationService.setTopLevelNavigator(ref)}>
            {token ? <Appstack /> : <Authstack />}
        </NavigationContainer>
    )
}

export default Main