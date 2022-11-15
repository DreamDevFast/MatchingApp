import React from 'react';
import {CustomButton, Container, CustomText} from '../components';

const FirstScreen = ({navigation}: any) => {
  return (
    <Container flex bottom centerH>
      <CustomText marginB-100>
        ログインをタップすると、利用規約およびプライバシーポリシーに同意したものとみなされます。
      </CustomText>
      <CustomButton
        label="ログイン"
        onPress={() => {
          console.log('hey');
          return navigation.navigate('Login');
        }}
      />
      <CustomText marginB-40 marginT-10>
        ログインに問題がありますか？
      </CustomText>
    </Container>
  );
};

export default FirstScreen;
