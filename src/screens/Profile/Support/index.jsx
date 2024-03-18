import React, { useState, useEffect, useCallback, useContext } from 'react';
import { I18nManager, Image, Keyboard, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialIcons'
import IonicIcon from 'react-native-vector-icons/Ionicons'
import { launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import Header from '../../../components/Header';
import { getChat, uploadChatImage } from '../../../redux/actions/user.action';
import { useFocusEffect } from '@react-navigation/native';
import { scale } from '../../../utils/responsiveSizes';
import Colors from '../../../constants/Colors';
import { AppContext } from '../../../context/AppContext';
// import { media_base_Url } from '../../../config/config';

const Support = () => {
    const { t } = useTranslation();
    const isRTL = I18nManager.isRTL;

    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth?.profile)
    const support = useSelector(state => state.health?.support)

    const { socket } = useContext(AppContext);

    const [chat, setChat] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useFocusEffect(useCallback(() => {
        // for user active
        socket.on("connected", (res) => {
            res(true);
        });

        // for message Received
        socket.on("message received", (msg) => {
            // console.log("message recieved", msg);
            setChat(prev => ([...prev, msg]))
        });

        socket.on("new notification", (msg) => {
            console.log("new notification", msg);
        });

        return () => {
            socket.off("message received");
        };
    }, []))

    useEffect(() => {
        const handleGetChats = async () => {
            try {
                let response = await dispatch(getChat(support?._id));
                // console.log("GET MESSAges ===> ", response?.data);
                setChat(response?.data || []);
            } catch (error) {
                console.error("Error getting chat:", error);
            }
        };

        handleGetChats();
    }, []);

    const handleImagePicker = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response?.assets?.[0]) {
                setShowModal(true)
                setSelectedImage(response.assets[0].uri);
            }
        });
    };

    const handleImageUpload = async (data) => {
        try {
            let response = await uploadChatImage(data, setIsUploading)
            console.log("FILE UPLOAD ===> ", response?.data);
            return response;
        } catch (error) {
            console.log("Error while uploading chat image ===> ", error);
        }
    }

    const handleSendImageMessage = async () => {
        try {
            // let response = await handleImageUpload(selectedImage)
            // if (response) {
            //     let chatData = {
            //         id: userData?._id,
            //         chatId: support?._id,
            //         message: '',
            //         file: response
            //     };

            //     Socket.emit("new message", chatData, (res) => {
            //         console.log("SENDING IMAGE MESSAGE ===>", res);
            //     });
            // }
        } catch (error) {
            console.log("Error while sending image ===> ", error);
        }
    }

    const handleSendMessage = (msg = []) => {
        Keyboard.dismiss();
        let chatData = {
            id: userData?._id,
            chatId: support?._id,
            message: msg[0]?.text,
            file: ""
        };

        socket.emit("new message", chatData);
    };

    const renderActions = useCallback(() => {
        return (
            <TouchableOpacity style={{ marginLeft: 8, alignSelf: 'center' }} activeOpacity={0.6} onPress={handleImagePicker}>
                {/* images-outline */}
                <IonicIcon name='images' size={24} color='gray' />
            </TouchableOpacity>
        )
    }, [])

    const isUserMessage = (message) => message.sender === userData?._id;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />
            <View style={{ flex: 1 }}>
                <Header title={t('support')} />

                <GiftedChat
                    placeholder={t('type_here')}
                    textInputProps={{
                        style: {
                            flex: 1,
                            color: 'black',
                            paddingHorizontal: 10,
                            textAlign: isRTL ? 'right' : 'left'
                        },
                    }}
                    renderBubble={props => {
                        return (
                            <Bubble
                                {...props}
                                textStyle={{
                                    right: {
                                        color: 'white',
                                        fontFamily: "CerebriSans-Book"
                                    },
                                    left: {
                                        color: '#24204F',
                                        fontFamily: "CerebriSans-Book"
                                    },
                                }}
                                wrapperStyle={{
                                    left: {
                                        backgroundColor: '#E6E5EB',
                                    },
                                    right: {
                                        marginRight: 6,
                                        backgroundColor: "#BF6BBB",
                                    },
                                }}
                                position={props.currentMessage.user._id === userData?._id ? 'right' : 'left'}
                            />
                        );
                    }}
                    messages={chat.map((elem) => ({
                        ...elem,
                        text: elem.message,
                        user: {
                            _id: isUserMessage(elem) ? userData?._id : elem?.chatId?.chatSupport,
                            name: isUserMessage(elem) ? userData?.name : support?.chatName,
                            avatar: isUserMessage(elem) ? null : support?.avatar,
                        },
                    })).reverse()}
                    onSend={(newMessages) => handleSendMessage(newMessages)}
                // renderActions={renderActions}
                />

                {showModal && <ImageModal open={showModal} setOpen={setShowModal} image={selectedImage} setImage={setSelectedImage} />}
            </View>
        </SafeAreaView>
    );
};


const ImageModal = ({ open, setOpen, image, setImage, handleSend }) => {
    const handleClose = () => {
        setOpen(false)
        setImage(null)
    }

    return (
        <Modal
            transparent={true}
            visible={open}
            animationIn="fadeIn"
            onRequestClose={handleClose}
            // onBackdropPress={hideCalendar}
            // backgroundColor="#000"
            backdropOpacity={0.8}
            style={styles.modal}
        >

            <TouchableOpacity style={styles.closeIcon} activeOpacity={0.6} onPress={handleClose}>
                <Icon name='close' size={scale(28)} color='white' />
            </TouchableOpacity>

            <Image
                source={{ uri: image }}
                resizeMode='contain'
                style={{ height: '100%', width: '100%' }}
            />

        </Modal>
    )
}

export default Support;

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        padding: 0,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    closeIcon: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        height: scale(40),
        width: scale(40),
        borderRadius: scale(40 / 2),
        backgroundColor: '#0004',
        justifyContent: 'center',
        alignItems: 'center'

    }

})
