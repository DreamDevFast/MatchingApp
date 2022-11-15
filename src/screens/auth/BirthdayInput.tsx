import React, {useState} from 'react';
import {View} from 'react-native-ui-lib';
import DatePicker from 'react-native-date-picker';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';

import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';

const BirthdayInput = ({navigation}: any) => {
  return (
    <Container bottom centerH>
      <IconButton
        icon="chevron-left"
        color={Colors.redBtn}
        style={styles.backIcon}
        size={30}
        onPress={() => navigation.goBack()}
      />
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
      <CustomButton
        label="次へ"
        onPress={() => navigation.navigate('LocationInput')}
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
  BirthdayInput: {
    height: 30,
    width: '70%',
    marginBottom: 50,
    backgroundColor: Colors.back,
  },
});

export default BirthdayInput;
