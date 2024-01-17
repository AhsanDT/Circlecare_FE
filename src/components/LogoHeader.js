import { StyleSheet, Text, Image } from 'react-native'
import { scale, textScale } from '../utils/responsiveSizes'
import { Color, FontFamily } from '../../GlobalStyles'

const LogoHeader = () => {
    return (
        <>
            <Image
                style={{
                    width: scale(340),
                    height: scale(260),
                }}
                resizeMode="contain"
                source={require('../../assets/logos/ntlogo.png')}
            />
            <Text style={styles.takingCareOf}>
                taking care of everyone’s needs
            </Text>
        </>
    )
}

export default LogoHeader

const styles = StyleSheet.create({
    takingCareOf: {
        fontSize: textScale(36),
        lineHeight: 35,
        fontFamily: FontFamily.AllisonRegular,
        color: Color.crimson_100,
        textAlign: 'center',
    },
})