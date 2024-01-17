import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground, SafeAreaView, I18nManager } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FontFamily } from "../../GlobalStyles";
import { moderateScale, scale, textScale } from '../utils/responsiveSizes';

const AppHeader = () => {
	const { t } = useTranslation();
	const isRTL = I18nManager.isRTL;


	const navigation = useNavigation();
	const data = useSelector((state) => state?.auth?.profile);
	const notifications = useSelector(state => state?.health?.notifications)?.filter(f => !f.read).length || 0

	return (
		<>
			<ImageBackground
				style={{ height: scale(140), width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
				resizeMode="cover"
				source={require("../../assets/image-4.png")}
			>
				<SafeAreaView style={{ flex: 0, backgroundColor: 'transparent' }}>
					<Surface style={styles.header}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: moderateScale(14) }}>
							<View style={styles.headerCenter}>
								<Image
									style={styles.groupIcon}
									resizeMode="contain"
									source={isRTL ? require('../../assets/logos/logo_ar.png') : require('../../assets/logos/logoNew.png')}
								/>
								<View flex={1}>
									<Text style={styles.welcomeTxt}>{t('welcome_back')}</Text>
									<Text numberOfLines={2} style={styles.nameTxt}>{`${data?.first_name?.toUpperCase()} ${data?.last_name?.toUpperCase()}`}</Text>
								</View>
							</View>
							<View style={{ flex: 0.2, alignItems: 'flex-end' }}>
								<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Notification')}>
									<Image
										style={styles.bellIcon}
										resizeMode="cover"
										source={require("../../assets/bell01.png")}
									/>
									{notifications ?
										<View style={styles.circle}>
											<Text style={styles.circleTxt}>{notifications}</Text>
										</View> : null}
								</TouchableOpacity>
							</View>
						</View>
					</Surface>
				</SafeAreaView>
			</ImageBackground>
		</>
	);
};

export default AppHeader;

const styles = StyleSheet.create({
	header: {
		backgroundColor: 'transparent',
		// height: scale(120),
		elevation: 4,
		// justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	headerCenter: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		gap: 10
	},
	groupIcon: {
		width: scale(68),
		height: scale(68),
		tintColor: 'white'
	},
	bellIcon: {
		width: scale(30),
		height: scale(30),
	},
	circle: {
		height: scale(18),
		width: scale(18),
		borderRadius: scale(18 / 2),
		borderColor: 'white',
		borderWidth: 0.8,
		backgroundColor: '#BF6BBB',
		// backgroundColor: Colors.purple,
		position: 'absolute',
		top: -4,
		right: -2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	circleTxt: {
		fontSize: textScale(10),
		fontWeight: '700',
		color: 'white',
	},
	welcomeTxt: {
		fontSize: textScale(15),
		fontFamily: FontFamily.satoshiVariableMedium,
		color: '#F6BBFF',
		fontWeight: '500'
	},
	nameTxt: {
		fontSize: textScale(24),
		fontFamily: FontFamily.satoshiVariableBold,
		color: '#FFF',
		fontWeight: '700'
	}
});
