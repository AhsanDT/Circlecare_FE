import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';

import { Color } from '../../GlobalStyles';
import Header from '../components/Header';
import { moderateScale, scale } from '../utils/responsiveSizes';

const Preview = ({ route }) => {
  const { height, width } = Dimensions.get("window")
  const data = route?.params?.data;

  console.log("data", data)
  return (
    <View style={{ backgroundColor: Color.labelColorDarkPrimary, flex: 1 }}>
      <Header title={data.article_type?.toUpperCase()} />
      <ScrollView overScrollMode="never" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text
            style={{
              color: Color.darkslategray_200,
              fontSize: scale(18),
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
            }}
          >{data?.title}</Text>
          <Image
            style={{
              width: width * 0.85, height: height * 0.3, resizeMode: "contain", alignSelf: "center", marginTop: 10,
            }}
            source={{ uri: data?.media_url }}
          />
          <Text
            style={{
              marginTop: 10,
              color: Color.darkslategray_100,
            }}
          >{data?.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: moderateScale(20),
  }
});
