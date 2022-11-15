import React, {useState} from 'react';
import {View} from 'react-native-ui-lib';
import {TextInput, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';

import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';

const NameInput = ({navigation}: any) => {
  return (
    <Container bottom centerH>
      <IconButton
        icon="chevron-left"
        color={Colors.redBtn}
        style={styles.backIcon}
        size={30}
        onPress={() => navigation.goBack()}
      />
      <CustomText marginB-50>
        お名前かニックネームを 入力してください
      </CustomText>
      <TextInput
        underlineColor={Colors.redBtn}
        activeUnderlineColor={Colors.redBtn}
        style={{...styles.nameInput}}
        theme={{colors: {text: Colors.white}}}
      />
      <CustomButton
        label="次へ"
        onPress={() => navigation.navigate('BirthdayInput')}
      />
      <View marginB-100></View>
    </Container>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    left: 0,
    top: 30,
  },
  nameInput: {
    height: 30,
    width: '70%',
    marginBottom: 50,
    backgroundColor: Colors.back,
  },
});

export default NameInput;
