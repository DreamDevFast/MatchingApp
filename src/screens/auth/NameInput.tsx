import React, {useState} from 'react';
import {View} from 'react-native-ui-lib';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';

const NameInput = () => {
  return (
    <Container bottom centerH>
      <CustomText marginB-50>
        お名前かニックネームを 入力してください
      </CustomText>
      <TextInput
        underlineColor={Colors.redBtn}
        activeUnderlineColor={Colors.redBtn}
        style={{...styles.nameInput}}
        theme={{colors: {text: Colors.white}}}
      />
      <CustomButton label="次へ" />
      <View marginB-100></View>
    </Container>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    height: 30,
    width: '70%',
    marginBottom: 50,
    backgroundColor: Colors.back,
  },
});

export default NameInput;
