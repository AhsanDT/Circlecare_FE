import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header'
import { moderateScale, textScale } from '../../utils/responsiveSizes'
import Colors from '../../constants/Colors';

let data = [
    "Please note that the contact us form provided on this website is intended for technical support purposes only and is not intended for reporting side effects or seeking medical advice. This form may not be monitored frequently, and responses may not be immediate.",
    "Therefore, we kindly request that you refrain from sharing any personal medical information or submitting medical inquiries through this form. For any medical concerns or side effect reports, please consult your healthcare provider or contact the appropriate medical authority. Additionally, please be aware that this form may not utilize a secure transaction channel. We encourage you to avoid sharing sensitive or confidential information through this form."
]

const PrivacyPolicy = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />
            <View style={styles.container}>
                <Header title="Disclaimer Terms" onPress={() => navigation.goBack()} />
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: moderateScale(22) }} showsVerticalScrollIndicator={false}>

                    <View style={styles.contentContainer}>
                        {data?.map((elem, index) => (
                            <Text key={`privacy-${index}`} style={styles.txt}>{elem}</Text>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        paddingTop: 20,
        gap: 28
    },
    txt: {
        color: "#576B74",
        fontSize: textScale(15),
    }
})