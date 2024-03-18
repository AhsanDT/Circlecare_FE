import React, { useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    FlatList,
    Image,
    I18nManager,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'

import { scale, textScale, width } from '../../../utils/responsiveSizes';
import { media_base_Url } from '../../../config/config';
import { CareMarkAsDone } from '../../../redux/actions/user.action';
import { useNavigation } from '@react-navigation/native';

const CareList = ({ data = [], loading = false }) => {
    const { t } = useTranslation();
    const isRTL = I18nManager.isRTL;

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const language = useSelector((state) => state.auth.language)

    const handleNavigate = (elem) => {
        navigation.navigate('ViewArticle', { article: elem })

        setTimeout(() => {
            dispatch(CareMarkAsDone(elem?._id, language))

            // if (!elem?.is_watched) dispatch(CareMarkAsDone(elem?._id))
        }, 1000);
    }

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
            <TouchableOpacity activeOpacity={0.6} onPress={() => handleNavigate(item)}>
                <View style={styles.card}>
                    <View style={styles.imagePlaceholder}>
                        <FastImage
                            style={styles.img}
                            source={{
                                uri: `${media_base_Url}${item?.media_url}`,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                    <View style={{ gap: 4, flex: 1 }}>
                        <View style={styles.statusRow}>
                            <Text style={styles.articleType}>{item?.article_type == "Article" ? t('article') : t('videos')}</Text>
                            {item?.is_watched &&
                                <Image source={isRTL ? require('../../../../assets/done_ar.png') : require('../../../../assets/done.png')} style={styles.doneIcon} />}
                        </View>
                        <Text numberOfLines={2} style={styles.titleTxt}>{item?.title?.toUpperCase()}</Text>
                        <View>
                            <Text style={styles.descTxt}>{truncatedDescription}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }, [])

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => `care-${item?._id}`}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={listEmptyComponent}
            ListFooterComponent={() => <View style={{ height: 110 }} />}
        // contentContainerStyle={{ marginHorizontal: moderateScale(20) }}
        />
    )
}

const SkeletonCard = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    const imageRef = React.createRef()
    const titleLineRef = React.createRef()
    const descLineRef = React.createRef()
    const secondLineRef = React.createRef()
    const thirdLineRef = React.createRef()

    React.useEffect(() => {
        const facebookAnimated = Animated.stagger(
            400,
            [
                Animated.parallel([
                    imageRef.current.getAnimated(),
                    titleLineRef.current.getAnimated(),
                    descLineRef.current.getAnimated(),
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
                ref={imageRef}
                style={styles.imagePlaceholder} autoRun={true} />
            <View style={{ gap: 4, flex: 1, }}>
                <ShimmerPlaceholder
                    ref={titleLineRef}
                    style={styles.titlePlaceholder} autoRun={true} />
                <View style={{ gap: 3 }}>
                    <ShimmerPlaceholder
                        ref={descLineRef}
                        style={[styles.descPlaceholder, { width: '96%' }]} autoRun={true} />
                    <ShimmerPlaceholder
                        ref={secondLineRef}
                        style={[styles.secondLinePlaceholder, { width: '96%' }]} autoRun={true} />
                    <ShimmerPlaceholder
                        ref={thirdLineRef}
                        style={[styles.secondLinePlaceholder, { width: '80%' }]} autoRun={true} />
                </View>
            </View>
        </View>
    );
};

export default CareList;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        gap: 10,
        borderWidth: 1,
        borderRadius: scale(10),
        borderColor: '#F1F1F1',
        padding: 15,
        minHeight: scale(100),
        width: width - scale(20)

    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    articleType: {
        fontSize: textScale(10),
        textAlign: 'left',
        fontWeight: '600',
        color: '#8B8B8B'
    },
    doneIcon: {
        width: scale(72),
        height: scale(26),
        resizeMode: 'contain'
    },
    titleTxt: {
        fontSize: textScale(18),
        textAlign: 'left',
        color: 'black',
        fontWeight: '700',
        // color: '#4E4E4E',
        // fontFamily: FontFamily.satoshiVariableBold,
    },
    descTxt: {
        fontSize: textScale(12),
        textAlign: 'left',
        color: 'black',
        // color: '#8B8B8B'
    },


    imagePlaceholder: {
        width: scale(85),
        height: scale(80),
        borderRadius: scale(10),
        borderWidth: 1,
        borderColor: 'transparent',
        // borderColor: Colors.purple,
        // backgroundColor: Colors.purpleAlpha,
        padding: 1
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: scale(10),
    },
    titlePlaceholder: {
        height: scale(18),
        width: '100%'
    },
    descPlaceholder: {
        height: scale(12),
    },
    secondLinePlaceholder: {
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
})