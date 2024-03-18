import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, I18nManager, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import Colors from '../../../constants/Colors';
import {
    Color,
    FontFamily,
    Border,
    FontSize,
} from '../../../../GlobalStyles';
import { cares } from '../../../redux/actions/user.action';
import CareList from './CareList';

const CareScreen = () => {
    const { t } = useTranslation();
    const isRTL = I18nManager.isRTL;

    const dispatch = useDispatch();
    const language = useSelector((state) => state.auth.language)

    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(cares(language, setLoading));
    }, []);

    const care = useSelector(state => state.health.care)

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={styles.searchContainer}>
                <Ionicons
                    name="search"
                    size={22}
                    color="#999"
                    style={styles.searchIcon}
                />
                <TextInput
                    style={[styles.searchInput, isRTL && { textAlign: 'right' }]}
                    placeholder={t('search')}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor={Color.gray_100}
                />
            </View>

            <View style={styles.tabContent}>
                <CareList
                    loading={loading}
                    data={care.filter((item) =>
                        item.title.toLowerCase().includes(searchText.toLowerCase())
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    tabContent: {
        flex: 1,
        marginTop: 20,
    },
    searchContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        // borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: Colors.light,
        width: '90%',
        marginHorizontal: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: 'black',
        paddingVertical: 6,
        fontSize: 16,
    },

    parentPosition: {
        top: 13,
        position: 'absolute',
    },
    childLayout: {
        width: 115,
        height: 110,
    },
    caloriesSpaceBlock: {
        marginTop: 5,
        width: 195,
        textAlign: 'left',
    },
    maskLayout: {
        height: 136,
        width: 343,
    },
    maskShadowBox: {
        borderWidth: 1,
        borderColor: '#f1f1f1',
        elevation: 40,
        shadowRadius: 40,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: Border.br_base,
        left: '-0.15%',
        bottom: '-0.37%',
        right: '-0.15%',
        top: '-0.37%',
        width: '100.29%',
        height: '100.74%',
        borderStyle: 'solid',
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        position: 'absolute',
        backgroundColor: Color.labelColorDarkPrimary,
    },
    frameChild: {
        height: 110,
        borderRadius: Border.br_3xs,
        width: 115,
    },
    calories: {
        fontSize: FontSize.size_3xs,
        fontWeight: '600',
        fontFamily: FontFamily.boldFootnote13pt,
        width: 195,
        color: Color.gray_100,
        textAlign: 'left',
    },
    calories1: {
        fontSize: FontSize.size_base,
        lineHeight: 15,
        textTransform: 'uppercase',
        fontWeight: '900',
        fontFamily: FontFamily.satoshiVariableBlack,
        color: Color.dimgray_200,
    },
    calories2: {
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.generalSansVariableRegular,
        color: Color.gray_100,
        marginTop: 5,
    },
    caloriesParent: {
        marginLeft: 8,
    },
    rectangleParent: {
        left: 13,
        flexDirection: 'row',
    },

    groupParent: {
        marginTop: 16,
    },


    text: {
        top: 1,
        fontSize: FontSize.defaultBoldSubheadline_size,
        lineHeight: 20,
        fontFamily: FontFamily.interMedium,
        height: 20,
        color: Color.labelColorDarkPrimary,
        width: 54,
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: 0,
        left: 0,
        position: 'absolute',
    },
    time: {
        borderRadius: Border.br_5xl,
        left: 0,
        top: 0,
    },
    title: {
        fontSize: FontSize.size_13xl,
        letterSpacing: -0.1,
        fontWeight: '700',
        fontFamily: FontFamily.satoshiVariableBold,
        color: Color.labelColorDarkPrimary,
        textAlign: 'left',
    },
});

export default CareScreen;
