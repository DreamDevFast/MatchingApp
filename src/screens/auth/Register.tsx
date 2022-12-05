import React, {useState} from 'react';
import {IconButton, TextInput} from 'react-native-paper';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {View} from 'react-native-ui-lib';
// import RNSmtpMailer from 'react-native-smtp-mailer';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {setLoginMethod, setTempUser} from '../../redux/features/globalSlice';

import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';

const Register = ({navigation}: any) => {
  const tempUser = useAppSelector((state: any) => state.global.tempUser);
  const loginMethod = useAppSelector((state: any) => state.global.loginMethod); // 'mobile' or 'email'

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>(tempUser.email);
  const [mobile, setMobile] = useState<string>(tempUser.mobile);

  const handleToConfirmCode = () => {
    dispatch(
      setTempUser({
        ...tempUser,
        [loginMethod]: loginMethod === 'email' ? email : mobile,
      }),
    );

    if (loginMethod === 'email') {
      // RNSmtpMailer.sendMail({
      //   mailhost: 'xs057239.xsrv.jp',
      //   port: '587',
      //   ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
      //   username: 'info@xs057239.xsrv.jp',
      //   password: 'lifepd057',
      //   fromName: 'MatchingApp', // optional
      //   replyTo: 'info@xs057239.xsrv.jp', // optional
      //   recipients: 'sujanesh@chainfuse.io',
      //   subject: 'subject',
      //   htmlBody: '<h1>header</h1><p>body</p>',
      //   attachmentPaths: [], // optional
      //   attachmentNames: [], // required in android, these are renames of original files. in ios filenames will be same as specified in path. In a ios-only application, no need to define it
      // })
      //   .then(success => console.log(success))
      //   .catch(err => console.log(err));
    } else if (loginMethod === 'mobile') {
    }
    navigation.navigate('ConfirmCode');
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
