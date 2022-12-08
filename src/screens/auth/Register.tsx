import React, {useState} from 'react';
import {IconButton, TextInput} from 'react-native-paper';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {View} from 'react-native-ui-lib';
import auth from '@react-native-firebase/auth';
// import RNSmtpMailer from 'react-native-smtp-mailer';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {setLoginMethod, setTempUser} from '../../redux/features/globalSlice';

import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';
import axios from 'axios';

var emailConfirmCodeBaseURL =
  'https://us-central1-okyuin-akiba.cloudfunctions.net/sendMail';

const Register = ({navigation}: any) => {
  const tempUser = useAppSelector((state: any) => state.global.tempUser);
  const loginMethod = useAppSelector((state: any) => state.global.loginMethod); // 'mobile' or 'email'

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>(tempUser.email);
  const [mobile, setMobile] = useState<string>(tempUser.mobile);

  const handleToConfirmCode = async () => {
    dispatch(
      setTempUser({
        ...tempUser,
        [loginMethod]: loginMethod === 'email' ? email : mobile,
      }),
    );
    let code = '123456',
      confirmation = null;
    if (loginMethod === 'email') {
      try {
        const res = await axios.get(
          emailConfirmCodeBaseURL + `?dest=${email}&code=${code}`,
        );
        console.log(res);
        if (res.data === 'Sended') {
          return navigation.navigate('ConfirmCode', {code, confirmation});
        }
      } catch (err) {
        console.log(err);
      }
    } else if (loginMethod === 'mobile') {
      try {
        confirmation = await auth().verifyPhoneNumber(mobile);
        console.log('confirm finished');
        if (confirmation) {
          console.log(confirmation);
          return navigation.navigate('ConfirmCode', {confirmation, code});
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container bottom centerH>
      <IconButton
        icon="chevron-left"
        color={Colors.white}
        style={styles.backIcon}
        size={30}
        onPress={() => navigation.goBack()}
      />
      {loginMethod === 'mobile' ? (
        <>
          {tempUser.mobile !== '' ? (
            <CustomText marginB-30>
              この電話番号は登録されていません 新規登録いたしますか？
            </CustomText>
          ) : (
            <CustomText marginB-30>電話番号を入力してください</CustomText>
          )}
          <View row>
            <TextInput
              underlineColor={Colors.white}
              activeUnderlineColor={Colors.white}
              style={{...styles.phonePrefixInput}}
              theme={{colors: {text: Colors.white}}}
              value={'+81'}
            />
            <TextInput
              underlineColor={Colors.white}
              activeUnderlineColor={Colors.white}
              style={{...styles.phoneNumberInput}}
              theme={{colors: {text: Colors.white}}}
              value={mobile}
              onChangeText={text => setMobile(text)}
            />
          </View>
          <CustomButton label="はい" onPress={handleToConfirmCode} />
          <View marginT-10></View>
          <TouchableHighlight onPress={() => dispatch(setLoginMethod('email'))}>
            <CustomText>メールアドレスで登録</CustomText>
          </TouchableHighlight>
          <View marginB-40></View>
        </>
      ) : (
        <>
          {tempUser.email !== '' ? (
            <CustomText marginB-30>
              このメールアドレスは登録されていません 新規登録いたしますか？
            </CustomText>
          ) : (
            <CustomText marginB-30>メールアドレスを入力してください</CustomText>
          )}
          <TextInput
            underlineColor={Colors.white}
            activeUnderlineColor={Colors.white}
            style={{...styles.emailInput}}
            theme={{colors: {text: Colors.white}}}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <CustomButton label="はい" onPress={handleToConfirmCode} />
          <View marginT-10></View>
          <TouchableHighlight
            onPress={() => dispatch(setLoginMethod('mobile'))}
          >
            <CustomText>電話番号で登録</CustomText>
          </TouchableHighlight>
          <View marginB-40></View>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    left: 0,
    top: 30,
  },
  emailInput: {
    height: 30,
    width: '80%',
    marginBottom: 50,
    backgroundColor: 'transparent',
  },
  phonePrefixInput: {
    height: 30,
    width: '13%',
    marginBottom: 50,
    backgroundColor: 'transparent',
  },
  phoneNumberInput: {
    height: 30,
    width: '64%',
    marginLeft: '3%',
    marginBottom: 50,
    backgroundColor: 'transparent',
  },
});

export default Register;
