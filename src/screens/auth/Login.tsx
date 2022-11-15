import React, {useState} from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {TextInput, IconButton} from 'react-native-paper';
import {View} from 'react-native-ui-lib';
import {Container, CustomButton, CustomText} from '../../components';
import {Colors} from '../../styles';

const Login = ({navigation}: any) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('mobile'); // 'email' or 'mobile'

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
          />
          <CustomButton
            label="次へ"
            onPress={() => {
              navigation.navigate('Register');
            }}
          />
          <View marginT-10></View>
          <TouchableHighlight onPress={() => setLoginMethod('mobile')}>
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
            />
          </View>
          <CustomButton
            label="次へ"
            onPress={() => {
              navigation.navigate('Register');
            }}
          />
          <View marginT-10></View>
          <TouchableHighlight onPress={() => setLoginMethod('email')}>
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
