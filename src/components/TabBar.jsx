import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, I18nManager } from 'react-native';
import Colors from '../constants/Colors';
import { FontFamily } from '../../GlobalStyles';
import { scale, textScale } from '../utils/responsiveSizes';

const TabBar = ({ tabs, activeTab, onTabChange }) => {
    const isRTL = I18nManager.isRTL;
    return (
        <View style={[styles.tabsContainer, isRTL && { flexDirection: 'row-reverse' }]}>
            {tabs.map((tab, index) => (
                <TouchableOpacity
                    key={tab.name}
                    style={[
                        styles.tabItem,
                        activeTab === index && styles.activeTab,
                    ]}
                    onPress={() => onTabChange(index)}>
                    <Text style={[styles.tabText, { color: activeTab === index ? '#0C212C' : '#576B7480' }]}>
                        {tab.name[0].toUpperCase() + tab.name.slice(1)}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tabsContainer: {
        padding: 2,
        flexDirection: 'row',
        backgroundColor: Colors.light,
        borderRadius: scale(20),
        height: scale(45),
        alignSelf: 'center',
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTab: {
        borderRadius: scale(20),
        backgroundColor: Colors.white,
    },
    tabText: {
        fontSize: textScale(13.4),
        fontFamily: FontFamily.generalSansVariableRegular,
        fontWeight: '500',
        letterSpacing: 1,
        color: Colors.gray_100,
    },
});

export default TabBar;