import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, FlatList, Image, } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { SwipeListView } from "react-native-swipe-list-view";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { FontFamily } from '../../../GlobalStyles';
import { moderateScale, scale, textScale } from '../../utils/responsiveSizes';
import useDaily from './useDaily';
import SuccessModal from '../../components/Modal/SuccessModal';
import Colors from '../../constants/Colors';

const DailyList = ({ data = [], loading = false }) => {
    const { t } = useTranslation();

    const navigation = useNavigation();
    const { _handleSwipeToComplete, _handleSwipeToDelete } = useDaily();
    const [success, setSuccess] = useState(false)
    const [buttonOpacity] = useState(new Animated.Value(0));
    const [swipedRow, setSwipedRow] = useState(null);

    const skeletonData = Array.from({ length: 6 }).map((_, index) => ({ _id: `skeleton-${index}` }));
    const listEmptyComponent = () => {
        if (loading) {
            return (
                <FlatList
                    data={skeletonData}
                    keyExtractor={(item) => item?._id}
                    renderItem={() => <SkeletonCard />}
                    ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                />
            );
        }
        return <Text style={styles.listEmptyTxt}>No data available.</Text>;
    };

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


    const onRowOpen = (rowKey) => {
        setSwipedRow(rowKey);
        fadeInButton();
    };

    const onRowClose = () => {
        setSwipedRow(null);
        fadeOutButton();
    };

    const renderHiddenItem = ({ item, index }) => {
        return (
            <View style={styles.hiddenItem}>
                <Animated.View style={{ opacity: buttonOpacity }}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => _handleSwipeToDelete(item)}
                    >
                        <Text style={styles.actionButtonText}>Delete</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{ opacity: buttonOpacity }}>
                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#93D84E' }]}
                        onPress={() => _handleSwipeToComplete(item, setSuccess)}
                    >
                        <Text style={styles.actionButtonText}>Done</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    const renderItem = useCallback(({ item }) => {
        const truncatedDescription =
            item?.description && item.description.length > 140
                ? `${item.description.slice(0, 140)}...`
                : item?.description;
        return (
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ViewDailyTask', { task: item })}>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.titleTxt}>{item?.title?.toUpperCase()}</Text>
                        {item?.is_completed && <Image source={require('../../../assets/done.png')} style={styles.doneIcon} />}
                    </View>
                    <Text style={styles.descTxt}>{truncatedDescription}</Text>
                </View>
            </TouchableOpacity>
        )
    }, [data])

    return (
        <>
            <SwipeListView
                keyExtractor={(_, index) => `dailyTask_${index}`}
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                ListEmptyComponent={listEmptyComponent}
                ListFooterComponent={() => <View style={{ height: 18 }} />}
                ListHeaderComponent={() => <View style={{ height: 18 }} />}
                contentContainerStyle={{ flexGrow: 1, marginHorizontal: moderateScale(20) }}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={0}
                rightOpenValue={-136}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowOpen={onRowOpen}
                onRowClose={onRowClose}
            />

            {success && <SuccessModal open={success} setOpen={setSuccess} message={t('task_successfully_completed')} />}
        </>
    )
}

const SkeletonCard = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    const firstLineRef = React.createRef()
    const secondLineRef = React.createRef()
    const thirdLineRef = React.createRef()

    React.useEffect(() => {
        const facebookAnimated = Animated.stagger(
            400,
            [
                Animated.parallel([
                    firstLineRef.current.getAnimated(),
                    secondLineRef.current.getAnimated(),
                    thirdLineRef.current.getAnimated(),
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
            <View style={{ gap: 4 }}>
                <ShimmerPlaceholder
                    ref={secondLineRef}
                    style={styles.descFullPlaceholder} autoRun={true} />
                <ShimmerPlaceholder
                    ref={thirdLineRef}
                    style={styles.descPlaceholder} autoRun={true} />
            </View>
        </View>
    );
};

export default DailyList;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderRadius: scale(14),
        borderColor: '#F1F1F1',
        padding: 15,
        minHeight: scale(100)
    },
    titleTxt: {
        flex: 1,
        fontSize: textScale(16),
        color: '#4E4E4E',
        fontFamily: FontFamily.satoshiVariableBold,
        fontWeight: '900'
    },
    descTxt: {
        fontSize: textScale(12),
        color: '#8B8B8B'
    },


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

    listEmptyTxt: {
        marginTop: 20,
        fontSize: textScale(18),
        fontWeight: '500',
        color: '#8B8B8B',
        textAlign: 'center'
    },

    doneIcon: {
        width: scale(72),
        height: scale(26),
        resizeMode: 'contain'
    },

    hiddenItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    actionButton: {
        backgroundColor: '#FD003A',
        marginVertical: 4,
        width: 74,
        padding: 10,
        // borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtonText: {
        color: 'white',
    },
})