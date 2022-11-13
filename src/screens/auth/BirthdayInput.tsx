import React, {useState} from 'react';
import {View} from 'react-native-ui-lib';
import DatePicker from 'react-native-date-picker';
import {StyleSheet} from 'react-native';

import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';

const BirthdayInput = () => {
  return (
    <Container bottom centerH>
      <CustomText marginB-30>誕生日を入力してください </CustomText>
      <DatePicker
        title={'birthday'}
        date={new Date()}
        open={false}
        mode={'date'}
        locale={'ja'}
        fadeToColor={Colors.back}
        textColor={Colors.white}
      />
      <View marginB-30></View>
      <CustomButton label="次へ" />
      <View marginB-100></View>
    </Container>
  );
};

const styles = StyleSheet.create({
  BirthdayInput: {
    height: 30,
    width: '70%',
    marginBottom: 50,
    backgroundColor: Colors.back,
  },
});

export default BirthdayInput;
