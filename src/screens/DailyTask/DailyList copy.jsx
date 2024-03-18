import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, FlatList, Image, } from 'react-native';
import Swipeable from 'react-native-swipeable';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { FontFamily } from '../../../GlobalStyles';
import { moderateScale, scale, textScale } from '../../utils/responsiveSizes';
import useDaily from './useDaily';
import SuccessModal from '../../components/Modal/SuccessModal';

{/* <ViewDailyTask open={readArticle} setOpen={setReadArticle} /> */ }

const DailyList = ({ data = [], loading = false }) => {
    const { t } = useTranslation();

    const navigation = useNavigation();
    const { _handleSwipeToComplete, _handleSwipeToDelete } = useDaily();
    const [success, setSuccess] = useState(false)

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

    const renderItem = useCallback(({ item }) => {
        const truncatedDescription =
            item?.description && item.description.length > 140
                ? `${item.description.slice(0, 140)}...`
                : item?.description;
        return (
            <Swipeable
                rightButtonWidth={item?.is_completed ? 170 / 2 : 170}
                rightButtons={[
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.6} style={styles.deleteButton}
                            onPress={() => _handleSwipeToDelete(item)}>
                            <Text style={styles.deleteButtonText}>{t('delete')}</Text>
                        </TouchableOpacity>

                        {!item?.is_completed && <TouchableOpacity activeOpacity={0.6} style={styles.doneButton}
                            onPress={() => _handleSwipeToComplete(item, setSuccess)}>
                            <Text style={styles.doneButtonText}>{t('done')}</Text>
                        </TouchableOpacity>}
                    </View>
                ]}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ViewDailyTask', { task: item })}>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.titleTxt}>{item?.title?.toUpperCase()}</Text>
                            {item?.is_completed && <Image source={require('../../../assets/done.png')} style={styles.doneIcon} />}
                        </View>
                        <Text style={styles.descTxt}>{truncatedDescription}</Text>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    }, [data])

    return (
        <>
            <FlatList
                data={data}
                keyExtractor={(item) => `item-${item?.task_id}`}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={listEmptyComponent}
                ListFooterComponent={() => <View style={{ height: 18 }} />}
                contentContainerStyle={{ marginHorizontal: moderateScale(20) }}
            // ListHeaderComponent={() => <View style={{ height: 18 }} />}
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
        borderWidth: 1,
        borderRadius: scale(10),
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


    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: '109%',
        marginTop: 20,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    doneButton: {
        backgroundColor: '#93D84E',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '109%',
        marginTop: 20,
    },
    doneButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    doneIcon: {
        width: scale(72),
        height: scale(26),
        resizeMode: 'contain'
    },
})