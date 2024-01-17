import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import { moderateScale, scale, textScale } from '../../utils/responsiveSizes';
import Header from '../../components/Header';
import { media_base_Url } from '../../config/config';
import { Color } from '../../../GlobalStyles';

const ReadModal = ({ open, setOpen, type }) => {
    const navigation = useNavigation();

    const handleClose = () => setOpen(null)

    function renderMedia() {
        return (
            <>
                {open?.article_type == 'Article' && open?.media_url?.includes('media') && <FastImage
                    style={styles.img}
                    source={{
                        uri: `${media_base_Url}${open?.media_url}`,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                // onLoadStart={() => setIsLoading(true)}
                // onLoadEnd={() => setIsLoading(false)}
                />}

                {open?.article_type == 'Video' && open?.media_url?.includes('media') &&
                    <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage
                            style={styles.img}
                            source={{
                                uri: `${media_base_Url}${open?.media_url}`,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('VideoPlayer', { source: `${media_base_Url}${open?.media_url}` })} activeOpacity={0.6} style={{ position: 'absolute' }}>
                            <Icon name='play-circle' color={Color.purple} size={scale(48)} />
                        </TouchableOpacity>
                    </View>
                }
            </>
        )
    }

    return (
        <Modal
            transparent={true}
            visible={Boolean(open)}
            animationIn="slideInRight"
            animationInTiming={1000}
            onRequestClose={handleClose}
            // onBackdropPress={handleClose}
            backgroundColor="#0008"
            backdropOpacity={0.6}
            style={styles.modal}>
            <View style={styles.container}>
                <Header title='Article' onPress={handleClose} />
                {/* <Header title={type[0]?.toUpperCase() + type?.slice(1)} onPress={handleClose} /> */}

                <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.title}>{open?.title}</Text>
                    {renderMedia()}

                    <Text style={styles.content}>{open?.description}</Text>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default ReadModal;

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        padding: 0,
    },
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
});
