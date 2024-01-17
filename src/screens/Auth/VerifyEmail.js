import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors';
import { FontFamily } from "../../../GlobalStyles";
import { useDispatch, useSelector } from 'react-redux';
import { Activating } from '../../redux/actions/auth.actions';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../../utils/responsiveSizes';
import GradiantButton from '../../components/GradiantButton';
import { showError } from '../../helper/customToast';
// import {
//   CodeField,
//   Cursor,
//   useBlurOnFulfill,
//   useClearByFocusCell,
// } from 'react-native-confirmation-code-field';


const VerifyEmail = () => {
  const navigation = useNavigation();
  const CELL_COUNT = 6
  const [value, setValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('')
  // const [otp,setOtp] = useState('')
  const [token, setToken] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const data = useSelector((state) => state?.auth)
  // console.log("llllllllllllllllllllllllllll", data)
  useEffect(() => {
    setToken(data?.activation_token)
  }, [])
  const dispatch = useDispatch()

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const verify = () => {
    if (value?.length < 6) {
      showError("Please provide 6 digit opt code.")
      return;
    }

    const body = {
      activation_token: data?.activation_token,
      otp_number: value,
    }
    dispatch(Activating(body, setLoading))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={'dark-content'} />
      <View flex={1} style={{ backgroundColor: Colors.white }}>
        <Header onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <Text style={styles.title}>Verify Your Email Address</Text>
          <Text style={styles.txt}>To continue using Circle Care, please verify your email address:</Text>
          <Text style={[styles.txt, { color: Colors.black, fontWeight: '500' }]}>{data?.formone?.email}</Text>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <View style={styles.btnConatiner}>
          <GradiantButton title="Verify Email" onPress={verify} loading={loading} />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ backgroundColor: '#8BB561', height: 80, width: '90%', justifyContent: 'center', alignSelf: 'center', position: 'absolute', bottom: 40, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                style={{ marginLeft: 20 }}
                name='checkmark-circle'
                size={65}
                color={'white'} />
              <View style={{}}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{loading == true ? <ActivityIndicator size={"small"} color="White" /> : "Verification Completed"}</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

export default VerifyEmail

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20),
    paddingTop: 20,
    flex: 1
  },
  title: {
    fontSize: textScale(28),
    color: "#4E4D4F",
    fontWeight: '600',
    fontFamily: FontFamily.poppinsMedium,
  },
  txt: {
    fontSize: textScale(13),
    fontWeight: '400',
    color: '#576B74',
    lineHeight: textScale(18)
  },
  btnConatiner: {
    width: moderateScale(310),
    alignSelf: 'center',
    marginTop: moderateScaleVertical(50),
    paddingBottom: moderateScaleVertical(30)
  },
  errorTxt: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },

  // root: {flex: 1, padding: 20,backgroundColor:'red'},
  // title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginTop: 60,
    marginHorizontal: moderateScale(20)
    // width: '90%',
    // marginHorizontal: 20,
  },
  cell: {
    width: scale(40),
    height: scale(56),
    textAlignVertical: 'center',
    fontSize: 24,
    borderWidth: scale(1),
    textAlign: 'center',
    color: Colors.purple,
    borderColor: Colors.gray,
    borderRadius: scale(12),
    // marginHorizontal:10,
  },

});