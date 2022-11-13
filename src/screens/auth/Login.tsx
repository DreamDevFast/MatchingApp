import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {View} from 'react-native-ui-lib';
import {Container, CustomButton, CustomText} from '../../components';
import {Colors} from '../../styles';

const Login = () => {
  return (
    <Container bottom centerH>
      <CustomText marginB-10>メールアドレスを入力してください</CustomText>
      <TextInput
        underlineColor={Colors.redBtn}
        activeUnderlineColor={Colors.redBtn}
        style={{...styles.textInput}}
        theme={{colors: {text: Colors.white}}}
      />
      <CustomButton label="次へ" />
      <CustomText marginB-40 marginT-10>
        電話番号でログイン
      </CustomText>
    </Container>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 30,
    width: '70%',
    marginBottom: 100,
    backgroundColor: Colors.back,
  },
});

export default Login;
