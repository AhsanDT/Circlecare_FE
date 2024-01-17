import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';

import { moderateScale, scale, textScale } from '../../utils/responsiveSizes';
import Header from '../../components/Header'
import { media_base_Url } from '../../config/config';
import { Color } from '../../../GlobalStyles';
import Colors from '../../constants/Colors';
// import { readDailyTaskArticle } from '../../redux/actions/user.action';

const ViewDailyTask = () => {
    // const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const { task = {} } = route?.params;
    // console.log("Route ===========> ", open?.task);

    const [isLoading, setIsLoading] = useState(false)
    // const [article, setArticle] = useState(null)

    // useEffect(() => {
    //     const getArticle = async () => {
    //         let response = await dispatch(readDailyTaskArticle(task?.article_id, setIsLoading))
    //         response?.data && setArticle(response?.data?.data[0] || null)
    //     }
    //     getArticle();
    // }, [task?.article_id])

    function renderMedia() {
        return (
            <>
                {task?.task_type == 'Article' && task?.media_url?.includes('media') && <FastImage
                    style={styles.img}
                    source={{
                        uri: `${media_base_Url}${task?.media_url}`,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                // onLoadStart={() => setIsLoading(true)}
                // onLoadEnd={() => setIsLoading(false)}
                />}

                {task?.task_type == 'Video' && task?.media_url?.includes('media') &&
                    <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage
                            style={styles.img}
                            source={{
                                uri: `${media_base_Url}${task?.media_url}`,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('VideoPlayer', { source: `${media_base_Url}${task?.media_url}` })} activeOpacity={0.6} style={{ position: 'absolute' }}>
                            <Icon name='play-circle' color={Color.purple} size={scale(48)} />
                        </TouchableOpacity>
                    </View>
                }
            </>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle={'dark-content'} />
            <View style={styles.container}>
                <Header title='Daily Task' />

                {!isLoading && !task && <Text style={{ marginTop: 40, fontSize: 18, textAlign: 'center', color: 'black' }}>No Article Found</Text>}
                {isLoading && <ActivityIndicator size='small' color="black" style={{ marginTop: 40, alignSelf: 'center' }} />}

                <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.title}>{task?.title}</Text>
                    {renderMedia()}

                    <Text style={styles.content}>{task?.description}</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ViewDailyTask

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: moderateScale(20),
        paddingTop: 20,
        paddingBottom: 40,
        gap: 16
    },
    title: {
        fontSize: textScale(24),
        textAlign: 'center',
        color: '#4E4E4E',
        fontWeight: '900'
    },
    img: {
        height: scale(214),
        width: scale(330),
        borderRadius: scale(10),
        alignSelf: 'center'
    },
    content: {
        fontSize: textScale(14),
        color: '#8B8B8B',
        fontWeight: '500'
    }
})