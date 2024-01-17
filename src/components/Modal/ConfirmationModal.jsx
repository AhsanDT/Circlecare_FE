import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { scale, textScale } from '../../utils/responsiveSizes';
import { FontFamily } from '../../../GlobalStyles';
import Colors from '../../constants/Colors';

const ConfirmationModal = ({ open, setOpen, message, onCancle, onConfirm }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            transparent={true}
            visible={open}
            animationType="slide"
            onRequestClose={handleClose}
            onBackdropPress={handleClose}
            backgroundColor="#0003"
            backdropOpacity={0.6}
            style={{ margin: 0, padding: 0, justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={styles.centerBox}>
                <Text style={styles.txt}>{message}</Text>
                <TouchableOpacity activeOpacity={0.6} onPress={onConfirm} style={styles.btn}>
                    <Text style={styles.btnTxt}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={onCancle} style={styles.btn}>
                    <Text style={styles.btnTxt}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ConfirmationModal;


const styles = StyleSheet.create({
    centerBox: {
        width: scale(300),
        borderRadius: scale(10),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        padding: 20,
        fontSize: textScale(16),
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center'
    },
    btn: {
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: Colors.gray,
        width: '100%'
    },
    btnTxt: {
        fontSize: textScale(16),
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center'
    },
})