import { useCallback, useContext, useState } from 'react';
import { Image, Text, View, Pressable, TouchableOpacity, FlatList, I18nManager } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import ImageResizer from '@bam.tech/react-native-image-resizer';

import { AppContext } from '../../../context/AppContext';
import { GetProfile, uploadAvatar } from '../../../redux/actions/user.action';
import { moderateScale } from '../../../utils/responsiveSizes';
import ConfirmationModal from '../../../components/Modal/ConfirmationModal';
import SuccessModal from '../../../components/Modal/SuccessModal';
import DeleteAccountModal from '../../../components/Modal/DeleteAccount';
import { media_base_Url } from '../../../config/config';
import styles from './styles';
import useLogout from '../../../hooks/useLogout';

const ProfileOption = ({ option, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.singleItem}>
                <View style={styles.iconCover}>
                    <Image style={styles.icon} resizeMode='contain' source={option?.icon} />
                </View>
                <Text style={styles.singleItemTxt}>{option?.name}</Text>
            </View>
        </Pressable>
    );
};

const Profile = () => {
    const { t } = useTranslation();
    const isRTL = I18nManager.isRTL;

    const dispatch = useDispatch()
    const navigation = useNavigation();

    const user = useSelector((state) => state?.auth?.profile)
    // console.log("User ===> ", user);

    const { socket } = useContext(AppContext);
    const { logout } = useLogout(socket);

    const options = [
        {
            section: t('profile'),
            items: [
                {
                    name: t('edit_profile'),
                    icon: require('../../../../assets/user03.png'),
                    onPress: 'EditProfile'
                },
                {
                    name: t('change_password'),
                    icon: require('../../../../assets/hugeiconfinance-and-paymentoutlineshield.png'),
                    onPress: 'ChangePasswordProfile'
                }
            ]
        },
        {
            section: t('support'),
            items: [
                {
                    name: t('change_language'),
                    icon: require('../../../../assets/hugeiconinterfaceoutlinehelp.png'),
                    onPress: 'languageChange'
                },
                {
                    name: t('tutorial'),
                    icon: require('../../../../assets/videolesson-1.png'),
                    onPress: 'TutorialProfile'
                },
                {
                    name: t('help_and_support'),
                    icon: require('../../../../assets/hugeiconinterfaceoutlinehelp.png'),
                    onPress: 'Support'
                },
                // {
                //     name: t('disclamer_terms'),
                //     icon: require('../../../../assets/hugeiconinterfaceoutlinehelp.png'),
                //     onPress: 'PrivacyPolicy'
                // },
                {
                    name: t('terms_and_conditions'),
                    icon: require('../../../../assets/hugeiconinterfaceoutlinehelp.png'),
                    onPress: 'TermsConditions'
                },
                {
                    name: t('log_out'),
                    type: 'log out',
                    icon: require('../../../../assets/hugeiconinterfaceoutlinelogout.png'),
                },
                {
                    name: t('close_the_account'),
                    type: 'close the account',
                    icon: require('../../../../assets/hugeiconinterfaceoutlineremovecircle.png'),
                },
            ]
        }
    ]

    useFocusEffect(useCallback(() => {
        dispatch(GetProfile())
    }, []))

    const [isModified, setIsModified] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isReqRelete, setIsReqRelete] = useState(false);

    const handleImagePicker = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response?.assets?.[0]) {
                setSelectedImage(response?.assets?.[0])
                setIsModified(true)
            }
        });
    };

    const handleImageConfirmation = async () => {
        try {
            const resizedImage = await ImageResizer.createResizedImage(
                selectedImage.uri,
                800,  // New width
                800,  // New height
                'JPEG',
                80,   // Quality
                0,    // Rotation
            );

            dispatch(uploadAvatar(resizedImage.uri, setSuccess));

            setTimeout(() => {
                setIsModified(false);
            }, 1000);
        } catch (error) {
            console.error('Error resizing image:', error);
        }
    };

    const handleImageCancle = () => {
        setSelectedImage(null);
        setIsModified(false);
    };

    const handleNavigate = (elem) => {
        if (elem.type == 'log out') {
            logout()
        } else if (elem.type == 'close the account') {
            setIsReqRelete(true)
        } else {
            navigation.navigate(elem.onPress);
        }
    }

    function renderOptionSection() {
        return (
            <>
                <FlatList
                    data={options}
                    keyExtractor={(_, index) => `section-${index}`}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.section}>
                                <Text style={[styles.profileSubTitle, isRTL && { textAlign: 'left' }]}>{item.section}</Text>
                                {item.items.map((elem, itemIndex) => (
                                    <View key={`item-${itemIndex}`}>
                                        <ProfileOption
                                            option={elem}
                                            onPress={() => handleNavigate(elem)}
                                        />
                                        {itemIndex !== item.items.length - 1 && (
                                            <View style={{ height: 12 }} />
                                        )}
                                    </View>
                                ))}
                            </View>
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                    ListFooterComponent={() => <View style={{ height: 150 }} />}
                    contentContainerStyle={{ paddingHorizontal: moderateScale(20), paddingTop: 20 }}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    overScrollMode='never'
                />
            </>
        );
    }

    return (
        <View flex={1}>
            <Text style={styles.title}>{t('profile')}</Text>
            <View style={styles.profileInfo}>
                <View style={{ flex: 1, paddingRight: 10, }}>
                    <Text style={[styles.profileTitle, isRTL && { textAlign: 'left' }]}>{`${user?.first_name} ${user?.last_name}`}</Text>
                    <Text style={styles.profileSubTitle}>{t('personal_account')}</Text>
                    <Text style={[styles.profileSubTitle, { marginTop: -10 }, isRTL && { textAlign: 'left' }]}>{`${t('health_score')} ${user?.score}`}</Text>
                </View>
                <View style={[styles.profileImage, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <FastImage
                        style={styles.profilePlaceholderImage}
                        source={{ uri: selectedImage?.uri || (user?.avatar && user?.avatar.startsWith('http' || 'https') ? user?.avatar : `${media_base_Url}${user?.avatar}`) }}
                        // source={{ uri: selectedImage?.uri || `${media_base_Url}${userProfile?.avatar}` }}
                        resizeMode='cover'
                    />
                    <TouchableOpacity style={styles.imageBtn} onPress={handleImagePicker}>
                        <Image
                            style={styles.imageBtnIcon}
                            source={require('../../../../assets/camera.png')}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {renderOptionSection()}

            {isModified && <ConfirmationModal
                open={isModified}
                setOpen={setIsModified}
                message='Are you sure want to update profile photo!'
                onCancle={handleImageCancle}
                onConfirm={handleImageConfirmation} />}
            {success && <SuccessModal open={success} setOpen={setSuccess} message='Your Profile Photo has been updated successfully!' />}
            {isReqRelete && <DeleteAccountModal
                open={isReqRelete}
                setOpen={setIsReqRelete}
                logout={logout}
                userId={user?._id || user?.id}
            />}
        </View>
    );
};

export default Profile;
