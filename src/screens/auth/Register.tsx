import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {View} from 'react-native-ui-lib';
import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';

const Register = ({navigation}: any) => {
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
          <CustomText marginB-200>
            この電話番号は登録されていません 新規登録いたしますか？
          </CustomText>
          <CustomButton
            label="はい"
            onPress={() => navigation.navigate('ConfirmCode')}
          />
          <View marginT-10></View>
          <TouchableHighlight onPress={() => setLoginMethod('mobile')}>
            <CustomText>メールアドレスで登録</CustomText>
          </TouchableHighlight>
          <View marginB-40></View>
        </>
      ) : (
        <>
          <CustomText marginB-200>
            このメールアドレスは登録されていません 新規登録いたしますか？
          </CustomText>
          <CustomButton
            label="はい"
            onPress={() => navigation.navigate('ConfirmCode')}
          />
          <View marginT-10></View>
          <TouchableHighlight onPress={() => setLoginMethod('email')}>
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
});

export default Register;
