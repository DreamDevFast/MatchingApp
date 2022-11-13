import React, {useState} from 'react';
import {View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';

const ConfirmCode = () => {
  return (
    <Container bottom centerH>
      <CustomText marginB-30 style={styles.confirmLabel}>
        認証コード
      </CustomText>
      <View row>
        <TextInput
          underlineColor={Colors.redBtn}
          activeUnderlineColor={Colors.redBtn}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
        <TextInput
          underlineColor={Colors.redBtn}
          activeUnderlineColor={Colors.redBtn}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
        <TextInput
          underlineColor={Colors.redBtn}
          activeUnderlineColor={Colors.redBtn}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
        <TextInput
          underlineColor={Colors.redBtn}
          activeUnderlineColor={Colors.redBtn}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
        <TextInput
          underlineColor={Colors.redBtn}
          activeUnderlineColor={Colors.redBtn}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
        <TextInput
          underlineColor={Colors.redBtn}
          activeUnderlineColor={Colors.redBtn}
          style={{...styles.letter}}
          theme={{colors: {text: Colors.white}}}
        />
      </View>
      <CustomButton label="次へ" />
      <CustomText marginB-40 marginT-10>
        認証コードの再送信をリクエストする
      </CustomText>
    </Container>
  );
};

const styles = StyleSheet.create({
  confirmLabel: {
    width: '80%',
  },
  letter: {
    height: 30,
    width: '11.7%',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 50,
    backgroundColor: Colors.back,
  },
});

export default ConfirmCode;
