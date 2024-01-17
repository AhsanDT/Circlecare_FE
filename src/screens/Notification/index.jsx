import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import Colors from '../../constants/Colors'
import { getNotifications } from '../../redux/actions/user.action'
import NotificationList from './notificationList'
import useNotification from './useNotification'

const Notification = () => {
    // const { } = useNotification();
    const dispatch = useDispatch();

    const notifications = useSelector(state => state?.health?.notifications);
    // console.log("NOTIFICATIONS ====>>", notifications);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(getNotifications(setIsLoading))
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />

            <View style={styles.container}>
                <Header title="Notifications" />
                <NotificationList loading={isLoading} data={notifications} />
            </View>
        </SafeAreaView>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
})