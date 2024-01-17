import { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, textScale } from '../../utils/responsiveSizes';
import { FontFamily } from '../../../GlobalStyles';

const SuccessModal = ({ open, setOpen, message }) => {

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                handleClose()
            }, 3000);
        }

        return () => {
            handleClose()
        }
    }, [open])

    function handleClose() {
        setOpen(false)
    }

    return (
        <Modal
            // transparent={true}
            visible={open}
            animationIn="fadeIn"
            onRequestClose={handleClose}
            onBackdropPress={handleClose}
            backgroundColor="#0008"
            backdropOpacity={0.8}
            style={styles.modal}
        >
            <View style={styles.centerBox}>
                <Ionicons name='checkmark-circle' size={44} color={'white'} />
                <Text style={styles.txt}>{message}</Text>
            </View>
        </Modal>
    )
}

export default SuccessModal

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        padding: 0,
        paddingBottom: 20,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    centerBox: {
        paddingVertical: 14,
        paddingHorizontal: 6,
        gap: 10,
        width: scale(300),
        borderRadius: scale(10),
        flexDirection: 'row',
        backgroundColor: '#8BB561',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontSize: textScale(12),
        textAlign: 'left',
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: '600',
        color: 'white',
        flex: 1
    },
})