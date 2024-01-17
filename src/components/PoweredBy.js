import { StyleSheet, Text } from 'react-native'
import { textScale } from '../utils/responsiveSizes'
import { Color } from '../../GlobalStyles'

const PoweredBy = () => {
    return (
        <Text style={styles.poweredBy}>Powered by <Text style={{ color: 'black', fontWeight: 'bold' }}>NTAM Group</Text></Text>
    )
}

export default PoweredBy

const styles = StyleSheet.create({
    poweredBy: {
        alignSelf: 'center',
        color: Color.gray_100,
        paddingBottom: 6,
        fontSize: textScale(8)
    }
})