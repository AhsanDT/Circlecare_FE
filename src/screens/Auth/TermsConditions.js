import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Header from '../../components/Header'
import { moderateScale, scale, textScale } from '../../utils/responsiveSizes'
import Colors from '../../constants/Colors';

const Heading = ({ txt, customStyles }) => <Text style={[styles.heading, customStyles]}>{txt}</Text>;
const Paragraph = ({ txt, customStyles }) => <Text style={[styles.paragraph, customStyles]}>{txt}</Text>;
const BulletNumber = ({ txt, customStyles }) => {
    return (
        txt.map((e, i) => (
            <View key={i} style={[styles.flexRow, customStyles, { gap: 6 }]}>
                <Text style={styles.bullet}>{`${++i})`}</Text>
                <Text style={styles.bullet}>{e}</Text>
            </View>
        ))
    )
}
const BulletCircle = ({ txt, customStyles, txtStyles }) => {
    return (
        txt.map((e, i) => (
            <View key={i} style={[styles.flexRow, customStyles, { gap: 6 }]}>
                <View style={styles.bulletCrcle} />
                <Text style={[styles.bullet, txtStyles]}>{e}</Text>
            </View>
        ))
    )
}

const TermsConditions = () => {
    const { t } = useTranslation();

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />
            <View style={styles.container}>
                <Header title={t('terms_and_conditions')} onPress={() => navigation.goBack()} />
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: moderateScale(22) }} showsVerticalScrollIndicator={false}>
                    <View style={styles.contentContainer}>
                        <Heading txt="Circle Care Terms and Conditions" />
                        <Paragraph txt='Circle Care ("Circle Care," "we," or "us") Thank you for visiting our application (the "app"). The following Circle Care Terms and Conditions (the "Terms and Conditions") apply in their entirety when you:' />
                        <BulletNumber txt={[
                            'Access or use the application;',
                            'Register as a Circle Care member ("Member") at The Application, which provides you with access to some or all of The App’s activities, content, products, services, surveys, and tests (collectively, the Circle Care Services), as well as various interactive features and services (collectively, the "Interactive Services" and together with the Circle Care Services, the "Services");',
                            'Register for one of our sweepstakes, promotional offers, or contests, as offered from time to time (the "Promotions").'
                        ]} />
                        <Paragraph customStyles={{ marginTop: 8 }} txt='The Circle Care Application Privacy Policy ("Privacy Policy"), the Circle Care Non-Disclosure and Confidentiality Agreement, other Circle Care operating rules, policies, price schedules (if any), promotion rules, and additional supplemental terms and conditions or documents that may be published from time to time are expressly incorporated herein by reference (collectively, the "Agreement"). Please review the agreement carefully.' />
                        <Paragraph txt='YOU MUST AFFIRMATIVELY CONSENT TO USE OUR OFFERINGS, AND BY DOING SO, YOU CONSENT TO THESE TERMS AND CONDITIONS, INCLUDING OUR PRIVACY POLICY. IF YOU DO NOT AGREE TO OUR TERMS AND CONDITIONS, INCLUDING OUR PRIVACY POLICY, IN THEIR ENTIRETY, YOU MAY NOT ACCESS OR OTHERWISE USE THE SERVICES, CONTENT (AS THAT TERM IS DEFINED BELOW), PROMOTIONS, OR APP IN ANY MANNER OR FORM WHATSOEVER.' />
                        <Paragraph txt='IF YOU ARE A PARENT OR GUARDIAN AND YOU PROVIDE CONSENT FOR YOUR CHILD TO REGISTER WITH THE APPLICATION, YOU MUST AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS IN RESPECT OF SUCH CHILD’S USE OF THE APPLICATION.' />
                        <Paragraph txt='The content appearing on The App is provided for informational purposes only. Much of the content, as well as the member content (as defined below), appearing on The App is provided by third parties. Circle Care shall not be responsible or liable for the accuracy, usefulness, or availability of any Content, Member Content, or other information transmitted or made available by and through The App and/or Services.' />
                        <Paragraph txt='Under our Privacy Policy, we will only process your personal information (as defined in the Privacy Policy) in accordance with applicable data protection and privacy laws.' />
                        <BulletCircle txtStyles={{ fontWeight: 'bold' }} txt={['Scope / Modification of Agreement']} />
                        <Paragraph txt='You agree to the terms and conditions outlined in the Agreement with respect to your use of the Services, Content, App, Promotions, Member Content, and/or any other analyses, research, opinions, reports, and/or other information provided by or through the same (collectively, "Circle Care Offerings"). The Agreement constitutes the entire and only agreement between you and Circle Care with respect to your use of the Circle Care Offerings and supersedes all prior or contemporaneous agreements, representations, warranties, and/or understandings with respect to your use of the Circle Care Offerings. Circle Care may, without notice, update, revise, or change the Agreement and the scope and functionality of the Circle Care Offerings, in whole or in part, at any time; provided, however, that any amendment or modification to the arbitration provisions, prohibition on class actions provisions, or any other provisions applicable to dispute resolution (collectively, "Dispute Resolution Provisions") shall not apply to any disputes that arose prior to the applicable amendment or modification. The latest agreement will be posted on The App, and you should review the agreement prior to using the Circle Care offerings. By your continued use of the Circle Care Offerings, you hereby agree to comply with and be bound by all of the terms and conditions contained within the Agreement effective at that time (other than with respect to disputes arising prior to the amendment or modification of the Dispute Resolution Provisions, which shall be governed by the Dispute Resolution Provisions then in effect at the time of the subject dispute). Therefore, you should regularly check The App for any updates and/or changes. You understand and agree that Circle Care is not responsible or liable in any manner whatsoever for your inability to use the Circle Care offerings.' />
                        <BulletCircle txtStyles={{ fontWeight: 'bold' }} txt={['No Medical or Psychiatric Therapy']} />
                        <Paragraph txt='CIRCLE CARE IS NOT A THERAPEUTIC ORGANIZATION PROVIDER OR FORUM, AND WE DO NOT ENGAGE IN PATIENT DIAGNOSIS OR THE PRACTICE OF MEDICINE. THE CONTENT AND MEMBER CONTENT PRESENTED BY AND THROUGH THE APP AND/OR SERVICES IS IN NO WAY INTENDED AS MEDICAL AND/OR PSYCHIATRIC THERAPY AND IS NOT PROVIDED FOR THE PURPOSE OF DIAGNOSING OR TREATING MEDICAL AND/OR PSYCHIATRIC PROBLEMS OR CONDITIONS, NOR IS IT A SUBSTITUTE FOR MEDICAL AND/OR PSYCHIATRIC TREATMENT AND/OR THERAPY. THE APP AND SERVICES ARE NOT, AND SHOULD NEVER BE, A SUBSTITUTE FOR THE ADVICE OF A LICENSED HEALTHCARE PROVIDER OR MEDICAL PROFESSIONAL. The use of The App and/or services does not establish a doctor-patient relationship. ACCORDINGLY, WHILE COMMUNICATIONS BETWEEN YOU AND CIRCLE CARE ARE COVERED BY OUR PRIVACY POLICY, THEY ARE NOT PROTECTED BY PHYSICIAN-PATIENT PRIVILEGE OR DOCTOR-PATIENT CONFIDENTIALITY. ALL CONTENT AND MEMBER CONTENT THAT IS MADE AVAILABLE BY AND THROUGH THE APP AND/OR SERVICES SHOULD BE DISCUSSED AND CONFIRMED WITH YOUR PHYSICIAN, PSYCHIATRIST, THERAPIST, OR OTHER HEALTHCARE PROVIDER BEFORE ADOPTING ANY WELLNESS PROGRAM, EXERCISE PROGRAM, OR OTHER TREATMENT, WHETHER OFFERED ON THE APP, THROUGH THE SERVICES, OR OTHERWISE. USE OF THE APP, SERVICES, CONTENT, AND MEMBER CONTENT FEATURED THEREIN IS AT YOUR OWN RISK. INFORMATION AND STATEMENTS REGARDING SOME OF THE PRODUCTS AND/OR SERVICES FEATURED BY AND THROUGH THE APP AND/OR SERVICES HAVE NOT BEEN EVALUATED BY THE FOOD AND DRUG ADMINISTRATION AND ARE NOT INTENDED TO DIAGNOSE, TREAT, CURE, OR PREVENT ANY DISEASE OR PSYCHOLOGICAL DISORDER.' />
                        <BulletCircle txtStyles={{ fontWeight: 'bold' }} txt={['Requirements']} />
                        <Paragraph txt='The Circle Care Offerings are not available to:' />
                        <BulletCircle txt={[
                            'Any users previously suspended or removed from The App or Services',
                            'ANY PERSONS UNDER THE AGE OF 16 WHOSE REGISTRATION HAS NOT BEEN APPROVED BY A PARENT OR LEGAL GUARDIAN.'
                        ]} />
                        <BulletCircle txtStyles={{ fontWeight: 'bold' }} txt={['Registration/Account/Fees/Billing']} />
                        <Paragraph txt='Initially, visitors to The App may be offered a proprietary Circle Care "Assessment or "Track Recommender"." Upon completion, Circle Care may invite the visitor to register on The App to become a member. Visitors may also register for membership or become members by and through their Facebook® or E-mail  accounts, through a Circle Care HealthTM program offered by various healthcare providers, health plans, and/or employers, or through any other means designated by Circle Care.' />
                        <Paragraph txt='Circle Care reserves the right, in its sole discretion, to deny membership, as well as any Circle Care offering, to anyone for any reason whatsoever, as permitted by applicable law. The registration data that you must supply on The App in order to obtain access to the Circle Care Offerings as a member may include, without limitation, depending on the method used by you to register: full name; e-mail address; date of birth; home address; telephone number; username and password; where you register via your Facebook® account, your: Facebook® ID; Facebook® profile name; Facebook® profile picture; education history (as included in your Facebook account); interests (as included in your Facebook® account); Facebook® photographs included in your Facebook® account; and any and all other information made available to Circle Care by and through your Facebook® account;. You agree to provide true, accurate, current, and complete registration data and to update your registration data as necessary to maintain it in an up-to-date and accurate fashion. Circle Care will verify and approve all registrants in accordance with its standard verification procedures.' />
                        <Paragraph txt='You can access your specific member account on The App using your user name and password, logging in via your Facebook® account and/or E-mail  account, as applicable and where authorized by Circle Care, or through the Circle Care Health program. You are responsible for maintaining the confidentiality of your member account, username, and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur through the use of your member account, username, and password.' />
                        <Paragraph txt='If you have reason to believe that your member account is no longer secure (for example, in the event of a loss, theft, or unauthorized disclosure or use of your username, password, or any credit, debit, or charge card number stored), you will notify Circle Care of the problem to avoid possible liability for any unauthorized charges to your account. To access and use some of our services, you will need to pay the applicable fees described on The App for such services, including applicable taxes (the "subscription fees"), unless you are accessing and using the services through a program offered by a Circle Care Health Program Company, in which case the terms of payment, if any, will be established by the Circle Care Health Program Company. When you subscribe for services requiring a payment, you hereby agree to pay the subscription fees in accordance with billing terms in effect at the time the fee or charge becomes payable, and you agree to abide by the Terms and Conditions like any other user or member. See the Payment Policy section below.' />
                        <Paragraph txt='We reserve the right to change, suspend, or terminate any account, including any feature, content, or service, at any time for any reason. We may also place limitations on the use of certain services, content, or features and/or limit your access to parts of The App or services without notice or liability.' />
                        <Paragraph txt="Circle Care agrees that it will terminate any paid or unpaid subscription to services upon notice from the member. A member's right to use The App is subject to any limits established by Circle Care or by the member's credit card issuer, unless the member is using The App through a Circle Care Health Programme Company, when other payment terms may apply. If payment cannot be charged to a Member's credit card or a Member's charge is returned for any reason, including a chargeback, Circle Care reserves the right to either suspend or terminate the Member's access and account, thereby terminating this Agreement and all obligations of Circle Care hereunder." />
                        <Paragraph txt="Circle Care may reject your application and/or terminate your membership at any time and for any reason, in our sole discretion. Such reasons may include, without limitation: where Circle Care believes that you are in any way in breach of the Agreement; and where Circle Care believes that you are, at any time, conducting any unauthorized commercial activity by and through the Services." />
                        <Paragraph txt='For purposes of the Agreement, "Facebook®" shall mean Facebook, Inc.,. Facebook® is a registered trademark of Facebook, Inc. Please be advised that Circle Care is not in any way affiliated with Facebook®, and the Circle Care offerings are neither endorsed nor sponsored by Facebook®' />
                        <BulletCircle txtStyles={{ fontWeight: 'bold' }} txt={['Circle Care']} />
                        <Paragraph txt='Circle Care offers its app and services to various healthcare providers, health plans, and/or other organizations and companies. Members, employees, clients, or customers of such Circle Care Health Program Companies may be subject to the payment terms provided by their Circle Care Health Program Company.' />
                        <Paragraph txt='By participating in the coaching programme, you consent to the disclosure of this information to any coach with whom you are working. The coach is under a duty to maintain the confidentiality of this information and any other personal information you share with the coach, and the coach may not disclose this information to anyone else unless under a legal requirement to do so.' />
                        <BulletCircle txtStyles={{ fontWeight: 'bold' }} txt={['Payment Policy']} />
                        <Paragraph txt='Access to some sections of the Circle Care application or through certain Circle Care programmes is free, but we charge for some of our products and services on a subscription-based basis. This payment policy applies to users who have purchased a Circle Care subscription plan to access Circle Care through the mobile application.' />
                        <BulletCircle txtStyles={{ fontWeight: 'bold' }} txt={['Overview of Subscription Plans and Payments']} />
                        <Paragraph txt='We offer several types of individual plans and gift plans. The pricing terms applicable to your account may vary depending on promotions, the type of subscription, and the term you select at the time of purchase. Most of our subscription plans renew automatically, as described in more detail below. If you have questions regarding your plan after you sign up, please refer to your membership page and the confirmation email that will be sent to you after your purchase.' />
                        <Paragraph txt='We may from time to time, at our discretion, offer a 30-day trial period for the yearly and two-year subscription plans, and if you sign up under that offer, you will not be billed for the full term until the end of the 30-day trial period. After the end of any trial period, our subscription plans are billed in one up-front payment for the entire term of the plan you choose. Thus, if you purchase a monthly plan, you will be charged for the full month’s payment at the beginning of each month, and if you purchase a yearly or two-year plan, you will be charged for the entire year or two-year term at the beginning of the term. You will also be able to cancel the yearly or two-year subscription within 30 days after the fee has been charged to your account, in accordance with our cancellation terms. We may use a third-party payment processor to facilitate your payments.' />
                    </View>
                </ScrollView>
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
    contentContainer: {
        paddingTop: 20,
        // gap: 20
    },
    // typography
    heading: {
        fontSize: textScale(15),
        color: "#576B74",
        fontWeight: 'bold',
        marginBottom: 16,
    },
    paragraph: {
        fontSize: textScale(15),
        color: "#576B74",
        marginBottom: 16,
    },
    bullet: {
        fontSize: textScale(15),
        color: "#576B74",
        marginBottom: 8,
    },
    bulletCrcle: {
        width: 6,
        height: 6,
        borderRadius: scale(50),
        backgroundColor: '#576B74',
        marginTop: textScale(5)
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
})