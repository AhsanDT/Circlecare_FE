import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

const MultiSelectDropDown = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Pear', value: 'pear' },
    ]);

    const handleSelect = (item) => {
        const newValue = value.includes(item.value)
            ? value.filter((val) => val !== item.value)
            : [...value, item.value];

        setValue(newValue);
        setOpen(false);
    };

    const renderSelectedItemLabel = (item) => (
        <View style={styles.selectedItemContainer}>
            <Text style={styles.selectedItemText}>{item.label}</Text>
        </View>
    );


    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={handleSelect}
            setItems={setItems}
            placeholder={'Choose a fruit.'}
            multiple={true}
            listItemLabelStyle={{ color: 'black' }}
            listItemContainerStyle={(item, index, isSelected) =>
                isSelected ? styles.highlightedItem : null
            }
            selectedItemLabelStyle={{ color: 'white' }}
            selectedItemContainerStyle={styles.selectedItemContainer}
            renderSelectedItem={renderSelectedItemLabel}
        />
    )
}

export default MultiSelectDropDown

const styles = StyleSheet.create({
    highlightedItem: {
        backgroundColor: '#7EC8E3',
    },
    selectedItemContainer: {
        backgroundColor: '#2A93D5',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    selectedItemText: {
        color: 'white',
    },
})