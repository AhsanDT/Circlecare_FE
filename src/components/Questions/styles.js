const { StyleSheet } = require("react-native");

import { FontFamily } from "../../../GlobalStyles";
import Colors from "../../constants/Colors";
import { moderateScaleVertical, textScale } from "../../utils/responsiveSizes";

export const commonStyles = StyleSheet.create({
    totalQues: {
        textAlign: 'left',
        fontSize: textScale(18),
        lineHeight: textScale(20),
        fontFamily: FontFamily.interRegular,
        color: Colors.purple
    },
    question: {
        textAlign: 'left',
        fontSize: textScale(18),
        fontWeight: '700',
        lineHeight: textScale(20),
        fontFamily: FontFamily.interBold,
        color: Colors.purple,
        paddingVertical: moderateScaleVertical(14),
    },
})