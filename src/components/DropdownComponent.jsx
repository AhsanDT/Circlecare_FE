import React, { useState } from 'react';
import { Dimensions, I18nManager, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons'

const DropdownComponent = (props) => {
    const isRTL = I18nManager.isRTL;

    const { required = false, label, placeholder, value, setValue, data, allowArabic, error, ...rest } = props;
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.labelTxt, isFocus || value && { color: 'lightgrey' }]}>
                    {label}
                </Text>
            );
        }
        return null;
    };

    const renderPlaceholder = () => {
        return (
            <Text style={styles.placeholder}>
                {' ' + placeholder + ' '}
                {required && <Text style={{ color: 'red' }}>*</Text>}
            </Text>
        );
    };

    const renderRightIcon = () => (
        !isRTL ? <Icon
            style={styles.icon}
            color={'black'}
            name={isFocus ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={20}
        /> : null
    );
    const renderLeftIcon = () => (
        isRTL ? <Icon
            style={styles.icon}
            color={'black'}
            name={isFocus ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={20}
        /> : null
    );

    return (
        <View style={styles.container}>
            {/* {renderLabel()} */}
            <Dropdown
                style={[styles.dropdown,
                isFocus && { borderColor: 'lightgrey' },
                isRTL && styles.rtlDropdown
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{
                    color: 'black',
                }}
                data={data}
                maxHeight={300}
                labelField={isRTL && allowArabic ? "arabic" : "label"}
                valueField="value"
                placeholder={!isFocus ? renderPlaceholder() : '...'}
                // placeholder={!isFocus ? placeholder : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
                renderRightIcon={renderRightIcon}
                renderLeftIcon={renderLeftIcon}
                {...rest}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

export default DropdownComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    dropdown: {
        // width: Dimensions.get('window').width - 60,
        height: 50,
        borderColor: 'lightgrey',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    rtlDropdown: {

    },
    icon: {
        marginRight: 5,
    },
    labelTxt: {
        position: 'absolute',
        backgroundColor: 'white',
        color: 'lightgray',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'lightgrey'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    itemText: {
        fontSize: 16,
        color: 'black',
    },
    selectedItemText: {
        color: 'blue',
    },

    error: {
        color: 'red',
        marginBottom: 10,
    },
});