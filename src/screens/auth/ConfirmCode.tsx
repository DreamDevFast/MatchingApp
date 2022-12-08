import React, {useState} from 'react';
import {View, Text} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {TextInput, IconButton} from 'react-native-paper';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import auth from '@react-native-firebase/auth';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';

const CELL_COUNT = 6;

const ConfirmCode = ({navigation, route}: any) => {
  const {code, confirmation} = route.params;
  const loginMethod = useAppSelector((state: any) => state.global.loginMethod);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleConfirm = async () => {
    if (loginMethod === 'email') {
      if (code === value) {
        setError('');
        navigation.navigate('NameInput');
      } else {
        setError('確認コードが正しくありません');
      }
    } else if (loginMethod === 'mobile') {
      try {
        const credential = auth.PhoneAuthProvider.credential(
          confirmation.verificationId,
          value,
        );
        setError('');
        navigation.navigate('NameInput');
      } catch (err) {
        let error: any = err;
        if (error.code == 'auth/invalid-verification-code') {
          console.log('Invalid code.');
          setError('確認コードが正しくありません');
        }
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
      <CustomText marginB-30 style={styles.confirmLabel}>
        認証コード
      </CustomText>
      {/* <View row>
        <TextInput
          underlineColor={Colors.white}
          activeUnderlineColor={Colors.white}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
        <TextInput
          underlineColor={Colors.white}
          activeUnderlineColor={Colors.white}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
        <TextInput
          underlineColor={Colors.white}
          activeUnderlineColor={Colors.white}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
        <TextInput
          underlineColor={Colors.white}
          activeUnderlineColor={Colors.white}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
        <TextInput
          underlineColor={Colors.white}
          activeUnderlineColor={Colors.white}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
        <TextInput
          underlineColor={Colors.white}
          activeUnderlineColor={Colors.white}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
      </View> */}
      <View>
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
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      {error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <></>
      )}

      <CustomButton label="次へ" onPress={handleConfirm} />
      <CustomText marginB-40 marginT-10>
        認証コードの再送信をリクエストする
      </CustomText>
    </Container>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    left: 0,
    top: 30,
  },
  confirmLabel: {
    width: '80%',
  },
  letter: {
    height: 30,
    width: '11.7%',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 50,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  codeFieldRoot: {
    marginTop: 20,
    width: '80%',
    marginBottom: 20,
    marginLeft: 15,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#ffffff77',
    borderRadius: 3,
    textAlign: 'center',
    backgroundColor: '#ffffff66',
    color: Colors.white,
  },
  focusCell: {
    borderColor: '#ffffff',
  },
  error: {
    color: Colors.red1,
  },
});

export default ConfirmCode;
