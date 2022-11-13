import React, {useState} from 'react';
import {Container, CustomButton, CustomText} from '../../components';

const Register = () => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('mobile'); // 'email' or 'mobile'

  return (
    <Container bottom centerH>
      {loginMethod === 'email' ? (
        <>
          <CustomText marginB-200>
            この電話番号は登録されていません 新規登録いたしますか？
          </CustomText>
          <CustomButton label="はい" />
          <CustomText marginB-40 marginT-10>
            メールアドレスで登録
          </CustomText>
        </>
      ) : (
        <>
          <CustomText marginB-200>
            このメールアドレスは登録されていません 新規登録いたしますか？
          </CustomText>
          <CustomButton label="はい" />
          <CustomText marginB-40 marginT-10>
            電話番号で登録
          </CustomText>
        </>
      )}
    </Container>
  );
};

export default Register;
