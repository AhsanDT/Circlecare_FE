import React, { useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    FlatList,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../constants/Colors';
import { Color, FontFamily } from '../../../GlobalStyles';
import { scale, textScale } from '../../utils/responsiveSizes';


const CompleteSurveyList = ({ data = [], loading = false }) => {
    const navigation = useNavigation()

    const handleNavigate = (elem) => {
        return;
        // navigation.navigate('Question1', { data: elem?._id })
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
            item?.description && item.description.length > 200
                ? `${item.description.slice(0, 200)}...`
                : item?.description;
        return (
            <TouchableOpacity activeOpacity={0.6} onPress={() => handleNavigate(item)}>
                <View style={styles.card}>
                    <Image source={require('../../../assets/done.png')} style={styles.doneImg} />
                    <Text style={styles.titleTxt}>{`(${item?.title})`}</Text>
                    <Text style={styles.descTxt}>{truncatedDescription}</Text>
                </View>
            </TouchableOpacity>
        )
    }, [])

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => `complete-${item?._id}`}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={listEmptyComponent}
            ListFooterComponent={() => <View style={{ height: 18 }} />}
        />
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

export default CompleteSurveyList;

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: scale(10),
        borderColor: '#78A44D',
        padding: 15,
        minHeight: scale(100)
    },
    titleTxt: {
        fontSize: textScale(16),
        color: '#4E4E4E',
        fontFamily: FontFamily.satoshiVariableBold,
        fontWeight: '900'
    },
    descTxt: {
        fontSize: textScale(12),
        color: '#8B8B8B'
    },
    doneImg: {
        height: scale(26),
        width: scale(76)
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
    }
})