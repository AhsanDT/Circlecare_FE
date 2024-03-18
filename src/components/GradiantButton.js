import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Border, Color, FontFamily, FontSize } from '../../GlobalStyles';
import { scale, textScale } from '../utils/responsiveSizes';

const GradiantButton = ({ title, onPress, style, txtStyle, loading = false }) => {
  return (
    <LinearGradient
      style={[styles.buttons, style]}
      locations={[0, 1]}
      colors={["#bf6bbb", "#716eaa"]}
      useAngle={true}
      angle={180}
    >
      <TouchableOpacity disabled={loading} style={[styles.pressable, styles.parentFlexBox]} onPress={onPress}>
        {loading ?
          <ActivityIndicator size='small' color="white" />
          : <Text style={[styles.txt, txtStyle]}>{title}</Text>
        }
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default GradiantButton

const styles = StyleSheet.create({
  buttons: {
    height: scale(50),
    width: '100%',
    borderRadius: Border.br_47xl,
  },
  pressable: {
    height: "100%",
    width: "100%",
    borderRadius: Border.br_47xl,
    borderWidth: 2,
    borderColor: '#716EAA'
  },
  parentFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontSize: textScale(16),
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.labelColorDarkPrimary,
    fontWeight: "600",
    textAlign: "center",
  },
})