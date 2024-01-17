// AuthInput Component
import React from 'react';
import { StyleSheet, Text, View, TextInput, I18nManager } from 'react-native';
import Colors from '../../constants/Colors';
import { scale, textScale } from '../../utils/responsiveSizes';

const AuthInput = ({ value, onChangeText, placeholder, error, leftIcon, containerStyle, ...rest }) => {
    const isRTL = I18nManager.isRTL;

    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={" " + placeholder + " "}
                    placeholderStyle={{ paddingHorizontal: 10 }}
                    placeholderTextColor={'lightgrey'}
                    style={{
                        ...styles.input,
                        textAlign: isRTL ? 'right' : 'left',

                    }}
                    {...rest}
                />
                {leftIcon && <View style={[styles.iconContainer]}>{leftIcon}</View>}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

export default AuthInput;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 56,
        borderColor: Colors.light,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: scale(7),
        alignSelf: 'center',
    },
    rtlContainer: {
        // flexDirection: 'row-reverse', // Change flexDirection for RTL
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: textScale(16),
        color: 'black',
    },
    error: {
        color: 'red',
        textAlign: 'left',
        marginBottom: 10,
    },
});