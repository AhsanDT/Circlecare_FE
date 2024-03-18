import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, I18nManager } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { moderateScale, scale, textScale } from '../utils/responsiveSizes';
import Header from '../components/Header';
import { media_base_Url } from '../config/config';
import { Color } from '../../GlobalStyles';
import { useState } from 'react';
import Colors from '../constants/Colors';

const ViewArticle = () => {
    const { t } = useTranslation();
    // const isRTL = I18nManager.isRTL;

    const navigation = useNavigation();
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(false)

    const { article = {} } = route?.params;

    function renderMedia() {
        return (
            <>
                {article?.article_type == 'Article' && article?.media_url?.includes('media') && <FastImage
                    style={styles.img}
                    source={{
                        uri: `${media_base_Url}${article?.media_url}`,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                // onLoadStart={() => setIsLoading(true)}
                // onLoadEnd={() => setIsLoading(false)}
                />}

                {article?.article_type == 'Video' && article?.media_url?.includes('media') &&
                    <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage
                            style={styles.img}
                            source={{
                                uri: `${media_base_Url}${article?.media_url}`,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('VideoPlayer', { source: `${media_base_Url}${article?.media_url}` })} activeOpacity={0.6} style={{ position: 'absolute' }}>
                            <Icon name='play-circle' color={Color.purple} size={scale(48)} />
                        </TouchableOpacity>
                    </View>
                }
            </>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />
            {/* <StatusBar barStyle={'dark-content'} /> */}
            <View style={styles.container}>
                <Header title={t('read')} />
                {/* <Header title={type[0]?.toUpperCase() + type?.slice(1)} onPress={handleClose} /> */}

                {!isLoading && !article && <Text style={{ marginTop: 40, fontSize: 18, textAlign: 'center', color: 'black' }}>No Article Found</Text>}
                {isLoading && <ActivityIndicator size='small' color="black" style={{ marginTop: 40, alignSelf: 'center' }} />}


                <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.title}>{article?.title}</Text>
                    {renderMedia()}

                    <Text style={styles.content}>{article?.description}</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ViewArticle;

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
        textAlign: 'left',
        color: 'black',
        fontWeight: '700',
        // fontWeight: '900',
        // color: '#4E4E4E',
    },
    img: {
        height: scale(214),
        width: scale(330),
        borderRadius: scale(10),
        alignSelf: 'center'
    },
    content: {
        fontSize: textScale(14),
        textAlign: 'left',
        color: 'black',
        // color: '#8B8B8B',
        fontWeight: '500'
    }
});
