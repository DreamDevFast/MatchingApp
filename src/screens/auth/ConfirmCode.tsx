import React, {useState} from 'react';
import {View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {TextInput, IconButton} from 'react-native-paper';

import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';

const ConfirmCode = ({navigation}: any) => {
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
      <View row>
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
      </View>
      <CustomButton
        label="次へ"
        onPress={() => navigation.navigate('NameInput')}
      />
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
    backgroundColor: Colors.back,
  },
});

export default ConfirmCode;
