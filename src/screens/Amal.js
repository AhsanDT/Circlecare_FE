import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { Color } from '../../GlobalStyles';
import Header from '../components/Header';
import Colors from '../constants/Colors';

const Amal = ({ navigation }) => {
  const data = [
    {
      id: 1,
      image: require('../../assets/relax/1.png'),
      media:
        'https://firebasestorage.googleapis.com/v0/b/circlecare-a52c7.appspot.com/o/meditationVideos%2FVideo-001-1.mp4?alt=media&token=db2879ab-b82c-4cdf-b733-ee4a4911c769',
    },
    {
      id: 2,
      image: require('../../assets/relax/2.png'),
      media:
        'https://firebasestorage.googleapis.com/v0/b/circlecare-a52c7.appspot.com/o/meditationVideos%2FVideo-002-1%20(1).mp4?alt=media&token=da3ab98e-0b9d-4988-9fdb-8f7fe2f6decf',
    },
    {
      id: 3,
      image: require('../../assets/relax/3.png'),
      media:
        'https://firebasestorage.googleapis.com/v0/b/circlecare-a52c7.appspot.com/o/meditationVideos%2FVideo-003-1.mp4?alt=media&token=e42cdcc7-b2e9-46e5-b3ee-5f9f29e110e6',
    },
    {
      id: 4,
      image: require('../../assets/relax/4.png'),
      media:
        'https://firebasestorage.googleapis.com/v0/b/circlecare-a52c7.appspot.com/o/meditationVideos%2FVideo-004-1.mp4?alt=media&token=5ef4304d-c831-4270-8047-d610e645e07d',
    },
  ];

  const handlePress = url => {
    // () => { Linking.openURL(i?.link) }
    navigation.navigate('VideoPlayer', { source: url });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} translucent={false} />
      {/* <StatusBar barStyle={'dark-content'} /> */}
      <View style={{ flex: 1, backgroundColor: Color.labelColorDarkPrimary }}>
        <Header title="Amal" />
        <ScrollView
          overScrollMode="never"
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.head}>Please Choose the Path to Relax</Text>
            {data?.map(i => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => handlePress(i?.media)}
                  style={{ alignSelf: 'center' }}>
                  <Image style={{ resizeMode: 'contain' }} source={i?.image} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Amal;

const styles = StyleSheet.create({
  head: {
    color: '#9a5ab1',
    fontSize: 20,
    fontWeight: '800',
    alignSelf: 'center',
  },
});
