import React, {useState} from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {TextInput, IconButton} from 'react-native-paper';
import {View} from 'react-native-ui-lib';

import firestore from '@react-native-firebase/firestore';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {
  setAuthenticated,
  setLoginMethod,
  setTempUser,
} from '../../redux/features/globalSlice';

import {Container, CustomButton, CustomText} from '../../components';
import {Colors} from '../../styles';

const Login = ({navigation}: any) => {
  const loginMethod = useAppSelector((state: any) => state.global.loginMethod); // 'mobile' or 'email'
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');

  const handleLogin = () => {
    const operator = loginMethod === 'email' ? email : mobile;
    firestore()
      .collection('Users')
      .where(loginMethod, '==', operator)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size === 1) {
          console.log(querySnapshot.docs[0].data());
          let {
            address,
            birthday,
            email,
            name,
            mobile,
            prefecture,
            role,
            avatar,
          } = querySnapshot.docs[0].data();

          birthday = new Date(birthday.seconds * 1000).toString();
          dispatch(
            setTempUser({
              id: querySnapshot.docs[0].id,
              address,
              birthday,
              email,
              name,
              mobile,
              prefecture,
              role,
              avatar,
            }),
          );
          dispatch(setAuthenticated(true));
          navigation.navigate('UserDashBoard');
        } else {
          navigation.navigate('Register');
        }
      });
  };

  return (
    <Container bottom centerH>
      <IconButton
        icon="chevron-left"
        color={Colors.redBtn}
        style={styles.backIcon}
        size={30}
        onPress={() => navigation.goBack()}
      />
      {loginMethod === 'email' ? (
        <>
          <CustomText marginB-10>メールアドレスを入力してください</CustomText>
          <TextInput
            underlineColor={Colors.redBtn}
            activeUnderlineColor={Colors.redBtn}
            style={{...styles.emailInput}}
            theme={{colors: {text: Colors.white}}}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <CustomButton label="次へ" onPress={handleLogin} />
          <View marginT-10></View>
          <TouchableHighlight
            onPress={() => dispatch(setLoginMethod('mobile'))}
          >
            <CustomText>電話番号でログイン</CustomText>
          </TouchableHighlight>
          <View marginB-40></View>
        </>
      ) : (
        <>
          <CustomText marginB-10>電話番号を入力してください</CustomText>
          <View row>
            <TextInput
              underlineColor={Colors.redBtn}
              activeUnderlineColor={Colors.redBtn}
              style={{...styles.phonePrefixInput}}
              theme={{colors: {text: Colors.white}}}
              value={'+81'}
            />
            <TextInput
              underlineColor={Colors.redBtn}
              activeUnderlineColor={Colors.redBtn}
              style={{...styles.phoneNumberInput}}
              theme={{colors: {text: Colors.white}}}
              value={mobile}
              onChangeText={text => setMobile(text)}
            />
          </View>
          <CustomButton label="次へ" onPress={handleLogin} />
          <View marginT-10></View>
          <TouchableHighlight onPress={() => dispatch(setLoginMethod('email'))}>
            <CustomText>メールアドレスでログイン</CustomText>
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
    marginBottom: 100,
    backgroundColor: Colors.back,
  },
  phonePrefixInput: {
    height: 30,
    width: '13%',
    marginBottom: 100,
    backgroundColor: Colors.back,
  },
  phoneNumberInput: {
    height: 30,
    width: '64%',
    marginLeft: '3%',
    marginBottom: 100,
    backgroundColor: Colors.back,
  },
});

export default Login;
