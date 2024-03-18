import { StyleSheet } from 'react-native'

import Colors from '../../../constants/Colors';
import { moderateScale, scale, textScale } from '../../../utils/responsiveSizes';
import { FontFamily } from '../../../../GlobalStyles';


export default styles = StyleSheet.create({
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