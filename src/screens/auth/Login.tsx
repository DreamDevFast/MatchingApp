import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {View} from 'react-native-ui-lib';
import {Container, CustomButton, CustomText} from '../../components';
import {Colors} from '../../styles';

const Login = () => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('mobile'); // 'email' or 'mobile'

  return (
    <Container bottom centerH>
      {loginMethod === 'email' ? (
        <>
          <CustomText marginB-10>メールアドレスを入力してください</CustomText>
          <TextInput
            underlineColor={Colors.redBtn}
            activeUnderlineColor={Colors.redBtn}
            style={{...styles.emailInput}}
            theme={{colors: {text: Colors.white}}}
          />
          <CustomButton label="次へ" />
          <CustomText marginB-40 marginT-10>
            電話番号でログイン
          </CustomText>
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
            />
            <TextInput
              underlineColor={Colors.redBtn}
              activeUnderlineColor={Colors.redBtn}
              style={{...styles.phoneNumberInput}}
              theme={{colors: {text: Colors.white}}}
            />
          </View>
          <CustomButton label="次へ" />
          <CustomText marginB-40 marginT-10>
            メールアドレスでログイン
          </CustomText>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  emailInput: {
    height: 30,
    width: '70%',
    marginBottom: 100,
    backgroundColor: Colors.back,
  },
  phonePrefixInput: {
    height: 30,
    width: '10%',
    marginBottom: 100,
    backgroundColor: Colors.back,
  },
  phoneNumberInput: {
    height: 30,
    width: '57%',
    marginLeft: '3%',
    marginBottom: 100,
    backgroundColor: Colors.back,
  },
});

export default Login;
