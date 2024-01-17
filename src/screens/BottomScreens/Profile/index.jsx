import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Pressable, TouchableOpacity, FlatList, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useTranslation } from 'react-i18next';

import Colors from '../../../constants/Colors';
import { FontFamily } from '../../../../GlobalStyles';
import { LOG_OUT } from '../../../redux/const/const';
import { GetProfile, uploadAvatar } from '../../../redux/actions/user.action';
import { moderateScale, scale, textScale } from '../../../utils/responsiveSizes';
import ConfirmationModal from '../../../components/Modal/ConfirmationModal';
import SuccessModal from '../../../components/Modal/SuccessModal';
import DeleteAccountModal from '../../../components/Modal/DeleteAccount';
import { media_base_Url } from '../../../config/config';
import FastImage from 'react-native-fast-image';

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

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const user = useSelector((state) => state?.auth?.profile)
    const loginType = useSelector((state) => state?.auth?.loginType)

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
                    name: 'Change Language',
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

    useEffect(() => {
        dispatch(GetProfile())
    }, [])

    const [IsModified, setIsModified] = useState(false);
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

    const handleImageConfirmation = () => {
        dispatch(uploadAvatar(selectedImage, setSuccess));

        setTimeout(() => {
            setIsModified(false);
        }, 1000);
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

    const logout = async () => {
        try {
            if (loginType === 'google') {
                const currentUser = await GoogleSignin.getCurrentUser();
                // Sign out from Google if logged in with Google
                currentUser && await GoogleSignin.signOut();
            }

            await dispatch({ type: LOG_OUT });
            console.log('User successfully logged out.');

        } catch (error) {
            console.error('Logout failed:', error);
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

            {IsModified && <ConfirmationModal
                open={IsModified}
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

const styles = StyleSheet.create({
    title: {
        paddingTop: 10,
        fontSize: textScale(18),
        fontWeight: '600',
        color: Colors.purple,
        textAlign: 'center',
    },
    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingTop: 20
    },
    profileTitle: {
        fontSize: textScale(26),
        fontWeight: '600',
        color: Colors.black,
        paddingBottom: 2
        // lineHeight: 36
    },
    profileSubTitle: {
        textAlign: 'left',
        fontSize: textScale(13),
        fontWeight: '500',
        color: '#576B74',
        paddingBottom: 10,
    },

    singleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14
    },
    iconCover: {
        width: scale(44),
        height: scale(44),
        borderRadius: scale(44 / 2),
        backgroundColor: Colors.purpleAlpha,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: scale(24),
        height: scale(24),
        tintColor: Colors.purple
    },
    singleItemTxt: {
        fontSize: scale(15),
        color: '#0C212C',
        fontFamily: FontFamily.interMedium
    },


    profileImage: {
        position: 'relative',
    },
    profilePlaceholderImage: {
        backgroundColor: Colors.purpleAlpha,
        width: scale(56),
        height: scale(56),
        borderRadius: scale(56 / 2),
        borderWidth: 1,
        borderColor: Colors.purpleAlpha,
        // padding: 0.8,
    },
    imageBtn: {
        position: 'absolute',
        bottom: -6,
        right: 4,
        zIndex: 1,
        width: scale(24),
        height: scale(24),
        borderRadius: scale(24 / 2),
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: '#AF6CB8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBtnIcon: {
        width: scale(12),
        height: scale(12),
    },
});

export default Profile;
