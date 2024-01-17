import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { SwipeListView } from "react-native-swipe-list-view";
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import { moderateScale, scale, textScale } from '../../utils/responsiveSizes';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { readNotification } from '../../redux/actions/user.action';
import { NOTIFICATIONS } from '../../redux/const/const';

const NotificationList = ({ loading, data }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const user = useSelector((state) => state?.auth?.profile)
    let userId = user?.id || user?._id

    const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const [markedAsReadItems, setMarkedAsReadItems] = useState([]);
    const [swipedKey, setSwipedKey] = useState(null);
    const [buttonOpacity] = useState(new Animated.Value(0));

    const handleNoticationClick = (item) => {
        // console.log("handleNoticationClick ==> ", item);
        // Handle navigation based on the item's route
        if (item.route.startsWith("questionnaire")) {
            navigation.navigate('HealthQuestionnaire', { data: item?._id })
        } else if (item.route.startsWith("articles")) {
            navigation.navigate('DailyTask1')
        } else if (item.route.startsWith("chat")) {
            navigation.navigate('Support')
        }
    }

    const fadeInButton = useCallback(() => {
        Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [buttonOpacity]);

    const fadeOutButton = useCallback(() => {
        Animated.timing(buttonOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [buttonOpacity]);

    const renderItem = ({ item }) => {
        const isRead = item.read?.includes(userId) || markedAsReadItems.includes(item?._id);
        const formattedDate = moment(item?.createdAt).format('MMM D [at] hh:mm A');

        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleNoticationClick(item)}            >
                <View style={styles.card}>
                    <View style={[styles.noticationCircle, !isRead && { backgroundColor: '#BF6BBB' }]} />
                    <View flex={1}>
                        <Text style={[styles.noticationTxt, isRead && { color: 'gray' }]}>{item?.content}</Text>
                        <Text style={styles.dateTime}>{formattedDate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderHiddenItem = (elem, rowMap) => {
        const isRead = elem?.item?.read?.includes(user?.id || user?._id) || markedAsReadItems.includes(elem?.item?._id);

        return (
            <View style={styles.hiddenItem}>
                {elem.index == swipedKey && !isRead ? (
                    <Animated.View style={{ opacity: buttonOpacity }}>
                        <TouchableOpacity
                            style={styles.markAsReadButton}
                            onPress={() => markAsRead(elem, rowMap, elem.index)}
                        >
                            <Text style={styles.markAsReadButtonText}>
                                Mark as Read
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : null}
            </View>
        );
    };

    const markAsRead = async (elem, rowMap, rowKey) => {
        let response = await dispatch(readNotification(elem?.item?._id))

        if (response) {
            const updatedNotifications = data.map(notification => {
                if (notification._id === elem?.item?._id) {
                    return { ...notification, read: [...notification.read, userId] };
                }
                return notification;
            });

            setMarkedAsReadItems((prevItems) => [...prevItems, elem?.item?._id]);
            dispatch({ type: NOTIFICATIONS, payload: updatedNotifications })
            onRowClose(rowMap, rowKey)
        }
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const onRowOpen = (rowKey) => {
        setSwipedKey(rowKey);
        fadeInButton();
    };

    const onRowClose = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }

        setSwipedKey(null);
        fadeOutButton();
    };

    return (
        <SwipeListView
            keyExtractor={(item, index) => index}
            data={sortedData}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            overScrollMode="never"
            ListFooterComponent={() => <View style={{ height: 20 }} />}
            ListHeaderComponent={() => <View style={{ paddingTop: 20, height: 20 }} />}
            contentContainerStyle={{ flexGrow: 1 }}
            renderHiddenItem={renderHiddenItem}
            stopLeftSwipe={true}
            leftOpenValue={0}
            rightOpenValue={-100}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowOpen={onRowOpen}
            onRowDidOpen={onRowDidOpen}
        />
    )
}

const SkeletonCard = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    const firstLineRef = React.createRef()
    // const secondLineRef = React.createRef()
    // const thirdLineRef = React.createRef()

    useEffect(() => {
        const facebookAnimated = Animated.stagger(
            400,
            [
                Animated.parallel([
                    firstLineRef.current.getAnimated(),
                    // secondLineRef.current.getAnimated(),
                    // thirdLineRef.current.getAnimated(),
                ])
            ]
        );
        Animated.loop(facebookAnimated).start();
    }, [])

    return (
        <View style={styles.card}>
            <ShimmerPlaceholder
                ref={firstLineRef}
                style={styles.titlePlaceholder} autoRun={true} />
            {/* <View style={{ gap: 4 }}>
                <ShimmerPlaceholder
                    ref={secondLineRef}
                    style={styles.descFullPlaceholder} autoRun={true} />
                <ShimmerPlaceholder
                    ref={thirdLineRef}
                    style={styles.descPlaceholder} autoRun={true} />
            </View> */}
        </View>
    );
};

export default NotificationList

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: scale(10),
        borderColor: '#F1F1F1',
        padding: 15,
        marginHorizontal: moderateScale(20),
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        position: 'relative',
    },
    noticationCircle: {
        height: scale(18),
        width: scale(18),
        borderRadius: scale(18 / 2),
        borderWidth: 1,
        borderColor: '#BF6BBB',
    },
    dateTime: {
        fontSize: textScale(12),
        color: 'black',
        textAlign: 'right'
    },
    noticationTxt: {
        // flex: 1,
        color: 'black',
        fontSize: textScale(14)
    },

    hiddenItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    markAsReadButton: {
        backgroundColor: '#BF6BBB',
        padding: 10,
        borderRadius: 5,
    },
    markAsReadButtonText: {
        color: 'white',
    },

    rowBack: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    backRightBtn: {
        alignItems: "center",
        bottom: 0,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        width: 75,
        borderRadius: 5
    },
    backRightBtnRight: {
        backgroundColor: "white",
        right: 0,
        marginBottom: 4
    },
    txtRead: {
        color: '#BF6BBB',
    },

    // Skeleton Cards
    titlePlaceholder: {
        height: scale(20),
        marginBottom: 8,
        width: '100%'
    },
    descFullPlaceholder: {
        height: scale(12),
        width: '100%'
    },
    descPlaceholder: {
        height: scale(12),
    },
})