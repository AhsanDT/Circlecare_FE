import React, { useState } from 'react';
import { I18nManager, StyleSheet, Text, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { moderateScale, textScale } from '../utils/responsiveSizes';
import Icon from 'react-native-vector-icons/MaterialIcons'

const MultiSelectComponent = (props) => {
    const isRTL = I18nManager.isRTL;

    const { required = false, label, placeholder, value, setValue, data, allowArabic, ...rest } = props;
    const [isFocus, setIsFocus] = useState(false);

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{isRTL && allowArabic ? item?.arabic : item.label}</Text>
                {value.some(e => e == item.value) && (
                    <Icon
                        style={styles.icon}
                        color={'black'}
                        name={"done"}
                        size={20}
                    />
                )}
            </View>
        );
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
            <MultiSelect
                style={[styles.dropdown, isFocus && { borderColor: 'lightgrey' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{
                    color: 'black',
                }}
                iconStyle={styles.iconStyle}
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
                    setValue(item);
                    setIsFocus(false);
                }}
                renderItem={renderItem}
                renderRightIcon={renderRightIcon}
                renderLeftIcon={renderLeftIcon}
                {...rest}
            />
        </View>
    );
};

export default MultiSelectComponent

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        backgroundColor: 'white',
        // padding: 16,
        // paddingHorizontal: moderateScale(20),
    },
    dropdown: {
        height: 50,
        borderColor: 'lightgrey',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
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

    item: {
        paddingVertical: 14,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textItem: {
        fontSize: textScale(16),
        color: 'black'
    }
});