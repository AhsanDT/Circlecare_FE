import React from 'react'
import { StyleSheet, View, SafeAreaView, StatusBar, I18nManager } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Header from '../../components/Header'
import Colors from '../../constants/Colors';
import ArabicContent from '../../components/Terms/arabic';
import EnglishContent from '../../components/Terms/english';

const TermsConditions = () => {
    const { t } = useTranslation();
    const isRTL = I18nManager.isRTL;

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />
            <Header title={t('terms_and_conditions')} onPress={() => navigation.goBack()} />
            <View style={styles.container}>
                {isRTL ? <ArabicContent /> : <EnglishContent />}
            </View>
        </SafeAreaView>
    )
}

export default TermsConditions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})