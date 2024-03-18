import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    FlatList,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import { useNavigation } from '@react-navigation/native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

import { FontFamily } from '../../../GlobalStyles';
import { scale, textScale } from '../../utils/responsiveSizes';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';


const SurveyList = ({ data = [], loading = false, completed }) => {
    const navigation = useNavigation()
    const swipeableRef = React.useRef(null);

    const [deleteCall, setDeleteCall] = useState(false)
    const [deleteId, setDeleteId] = useState("")

    const handleNavigate = (elem) => {
        navigation.navigate('HealthQuestionnaire', { data: elem?._id })
    }

    const handleSwipeToDelete = item => {
        setDeleteCall(true)
        setDeleteId(item?._id)
    };

    const handleCancle = () => {
        setDeleteCall(false)
        if (swipeableRef.current) {
            swipeableRef.current.recenter();
        }
    };

    const handleConfirm = () => {
        setDeleteCall(false)
        if (swipeableRef.current) {
            swipeableRef.current.recenter();
        }
    };

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
            item?.description && item?.description?.length > 200
                ? `${item.description.slice(0, 200)}...`
                : item?.description;
        return (
            <Swipeable
                ref={swipeableRef}
            // rightButtons={[
            //     <TouchableOpacity
            //         style={styles.deleteButton}
            //         onPress={() => handleSwipeToDelete(item)}>
            //         <Text style={styles.deleteButtonText}>Delete</Text>
            //     </TouchableOpacity>
            // ]}
            >
                <TouchableOpacity activeOpacity={0.6} onPress={() => handleNavigate(item)}>
                    <View style={styles.card}>
                        <Text style={styles.titleTxt}>{item?.title}</Text>
                        <Text style={styles.descTxt}>{truncatedDescription}</Text>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    }, [])

    return (
        <>
            <FlatList
                data={data}
                keyExtractor={(item) => `item-${item?._id}`}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={listEmptyComponent}
                ListFooterComponent={() => <View style={{ height: 18 }} />}
            // ListHeaderComponent={() => <View style={{ height: 18 }} />}
            />

            {deleteCall && <ConfirmationModal
                open={deleteCall}
                setOpen={setDeleteCall}
                message='Are you sure you want to delete this questionnaire?'
                onCancle={handleCancle}
                onConfirm={handleConfirm}
            />}
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
            ],
            {
                useNativeDriver: false,
            }
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

export default SurveyList

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: scale(10),
        borderColor: '#F1F1F1',
        padding: 15,
        minHeight: scale(100)
    },
    titleTxt: {
        fontSize: textScale(18),
        color: 'black',
        fontWeight: '700',
        // color: '#4E4E4E',
        // fontFamily: FontFamily.satoshiVariableBold,
    },
    descTxt: {
        fontSize: textScale(12),
        color: '#8B8B8B'
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '85%',
        marginTop: 20,
        borderRadius: 10,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
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