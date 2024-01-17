import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, I18nManager } from 'react-native'
import Colors from '../constants/Colors';
import { scale, textScale } from '../utils/responsiveSizes';
import LinearGradient from 'react-native-linear-gradient';
import { Border, Color, FontFamily, FontSize } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window')

const Header = ({ onPress = null, title, rightBtnTxt = "", rightBtn = null, custumStyles }) => {
    const isRTL = I18nManager.isRTL;
    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={[styles.row, isRTL && styles.rtlRow, custumStyles]}>
            <View flex={0.6} alignItems={isRTL ? 'flex-end' : 'flex-start'}>
                <TouchableOpacity style={styles.backBtn} onPress={handlePress}>
                    <Image source={require('../../assets/back_arrow.png')} resizeMode='contain' style={styles.backIcon} />
                </TouchableOpacity>
            </View>

            <Text flex={2} style={styles.txt}>{title}</Text>

            <View flex={0.6}>
                {rightBtnTxt && rightBtn && <LinearGradient
                    style={styles.buttons}
                    locations={[0, 1]}
                    colors={["#bf6bbb", "#716eaa"]}
                    useAngle={true}
                    angle={180}
                >
                    <TouchableOpacity style={[styles.pressable, styles.parentFlexBox]} onPress={rightBtn}>
                        <Text style={styles.btnTxt}>{rightBtnTxt}</Text>
                    </TouchableOpacity>
                </LinearGradient>}
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    rtlRow: {
        flexDirection: 'row-reverse',
    },
    backBtn: {
        width: scale(18),
        height: scale(18),
    },
    backIcon: {
        width: '100%',
        height: '100%'
    },
    txt: {
        fontSize: textScale(18),
        fontWeight: '600',
        // fontFamily: FontFamily.interBold,
        color: Colors.purple,
        textAlign: 'center',
    },

    // Right Button
    buttons: {
        height: 34,
        minWidth: scale(70),
        maxWidth: scale(80),
        // paddingHorizontal: 10,
        borderRadius: Border.br_47xl,
        alignSelf: 'flex-end'
    },
    pressable: {
        height: "100%",
        width: "100%",
        borderRadius: Border.br_47xl,
        alignSelf: 'center'
    },
    parentFlexBox: {
        alignItems: "center",
        justifyContent: "center",
    },
    btnTxt: {
        fontSize: textScale(13),
        fontFamily: FontFamily.poppinsSemibold,
        color: Color.labelColorDarkPrimary,
        fontWeight: "500",
        textAlign: "center",
    },
})