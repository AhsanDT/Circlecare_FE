import { useState } from 'react';
import { StyleSheet, View, Text, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../../constants/Colors';
import { scale } from '../../utils/responsiveSizes';

const AuthDropDown = ({
    navigation,
    props,
    placeholder = "Select Option",
    style,
    items,
    value,
    setValue,
    setItems,
    onPress,
    marginLeft,
    marginRight,
    dropDownContainerStyle,
    height,
    onChangeValue,
    custumContainerStyle,
    customStyle,
    textStyle,
    error,
}) => {
    const [open, setOpen] = useState(false)

    return (
        <View>
            <DropDownPicker
                // maxHeight={120}
                placeholder={placeholder}
                items={items}
                onPress={onPress}
                onOpen={() => Keyboard.dismiss()}
                open={open}
                value={value}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={onChangeValue}
                dropDownContainerStyle={{
                    backgroundColor: "white",
                    borderColor: 'transparent',
                    // height: height ? height : 100,
                    zIndex: 999999,
                    position: 'absolute',
                }}
                containerStyle={[styles.container, custumContainerStyle]}
                textStyle={[textStyle, { color: value === null ? 'lightgrey' : 'black' }]}
                style={[styles.dropdown, customStyle, { backgroundColor: open ? '#F6F6F6' : 'transparent' }]}
                placeholderStyle={{ color: open ? 'black' : 'lightgrey' }}
                listItemLabelStyle={{ color: open ? 'black' : 'lightgrey', }}
                listMode='SCROLLVIEW'
            // onSelectItem={items => {
            //   console.log(items.label);
            // }}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

export default AuthDropDown;

const styles = StyleSheet.create({
    dropdown: {
        borderColor: Colors.light,
        borderRadius: scale(7),
        // marginTop: 10,
        height: 56,
        zIndex: -999999999,
    },
    container: {
        // height: 40,
        width: '100%',
        alignSelf: 'center'
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});
