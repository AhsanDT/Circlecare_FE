import { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Keyboard, ActivityIndicator, I18nManager } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { moderateScale, scale, textScale } from '../../utils/responsiveSizes';
import { Color, FontFamily } from '../../../GlobalStyles';
import { showError } from '../../helper/customToast';
import { appUserDelete } from '../../redux/actions/user.action';
import Colors from '../../constants/Colors';

const DeleteAccountModal = ({ open, setOpen, userId, logout }) => {
    const { t } = useTranslation();
    const isRTL = I18nManager.isRTL;

    const dispatch = useDispatch();
    const language = useSelector(state => state.auth.language)

    const [value, setValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isConfirm, setIsConfirm] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    const handleClose = () => {
        setOpen(false);
        setIsConfirm(false)
    };

    const handleDelete = async () => {
        Keyboard.dismiss();

        if (!userId || userId == undefined || userId == "" || userId == null) {
            showError("Not able to delete user profile this time. Try again Later")
            return
        }

        let response = await dispatch(appUserDelete(setIsLoading, logout))
        return response;
    }

    const handleModalConfirm = async () => {
        if (!isConfirm) {
            setIsConfirm(true);
        } else if (isConfirm && (value.trim().toLowerCase() === 'حذف' || value.trim().toLowerCase() === 'delete')) {
            let response = await handleDelete();
            if (response) setIsDeleted(true);
        } else {
            // showError(`Confirmation is required to ${confirmationWord} the account!`);
            showError(`Confirmation is required to delete the account!`);
        }
    };

    return (
        <Modal
            transparent={true}
            visible={open}
            animationType="slide"
            // onRequestClose={handleClose}
            // onBackdropPress={handleClose}
            backgroundColor="#0003"
            backdropOpacity={0.64}
            style={{ margin: 0, padding: 0, justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={styles.centerBox}>
                {!isConfirm ?
                    <>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text style={styles.titleTxt}>{t('are_you_sure_you_want_to_close_your_account')}</Text>
                            <Text style={styles.txt}>{t('once_you_close_your_account_you_will_not_be_able')}</Text>
                        </View>
                        <View style={[styles.row, isRTL && { flexDirection: 'row-reverse' }]}>
                            <TouchableOpacity activeOpacity={0.6} onPress={handleClose} style={styles.btn}>
                                <Text style={styles.btnTxt}>{t('cancle')}</Text>
                            </TouchableOpacity>
                            <View style={styles.centerLine} />
                            <TouchableOpacity activeOpacity={0.6} onPress={handleModalConfirm} style={styles.btn}>
                                <Text style={[styles.btnTxt, { fontWeight: '600' }]}>{t('confirm')}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    : isConfirm && !isDeleted ?
                        <>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Text style={styles.titleTxt}>{t('confirmation')}</Text>
                                <Text style={styles.txt}>{t('please_enter_the_word_delete')}</Text>

                                <TextInput
                                    placeholder={t('delete')}
                                    placeholderTextColor={'lightgrey'}
                                    value={value}
                                    onChangeText={value => setValue(value)}
                                    autoCapitalize="characters"
                                    style={styles.input}
                                />
                            </View>

                            <View style={[styles.row, isRTL && { flexDirection: 'row-reverse' }]}>
                                <TouchableOpacity activeOpacity={0.6} onPress={handleClose} style={styles.btn}>
                                    <Text style={styles.btnTxt}>{t('cancle')}</Text>
                                </TouchableOpacity>
                                <View style={styles.centerLine} />
                                <TouchableOpacity activeOpacity={0.6} onPress={handleModalConfirm} style={styles.btn}>
                                    <Text style={[styles.btnTxt, { fontWeight: '600' }]}>{t('confirm')}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        : isConfirm && isDeleted ?
                            <>
                                <View style={{ paddingHorizontal: 20 }}>
                                    {!isLoading ?
                                        <>
                                            <Text style={styles.titleTxt}>{t('account_deleted')}</Text>
                                            <Text style={styles.txt}>{t('your_account_has_been_deleted_successfully')}</Text>
                                        </>
                                        : <ActivityIndicator size={'large'} color={Colors.purple} style={{ marginTop: 20 }} />
                                    }
                                </View>

                                <View style={styles.row}>
                                    <TouchableOpacity disabled={isLoading} activeOpacity={0.6} onPress={handleModalConfirm} style={styles.btn}>
                                        <Text style={[styles.btnTxt, { fontWeight: '600' }]}>{t('done')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            : null
                }
            </View>
        </Modal >
    );
};

export default DeleteAccountModal;


const styles = StyleSheet.create({
    centerBox: {
        width: scale(300),
        borderRadius: scale(10),
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleTxt: {
        paddingTop: 20,
        paddingHorizontal: moderateScale(20),
        fontSize: textScale(17),
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: '700',
        color: 'black',
        textAlign: 'center',
    },
    txt: {
        fontSize: textScale(13),
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: '400',
        color: 'black',
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.6,
        borderTopColor: Color.gray_600,
        width: '100%',
        marginTop: 20
    },
    centerLine: {
        borderLeftWidth: 0.6,
        borderTopColor: Color.gray_600,
        height: '100%'
    },
    btn: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        flex: 1
    },
    btnTxt: {
        fontSize: textScale(17),
        // fontFamily: FontFamily.poppinsMedium,
        fontWeight: '400',
        color: '#007AFF',
        textAlign: 'center'
    },
    input: {
        marginTop: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        height: scale(40),
        color: 'black'
    }
})