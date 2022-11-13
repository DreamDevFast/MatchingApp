import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {Colors} from '../styles';

import CustomButton from '../components/CustomButton';

const FirstScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is first screen</Text>
      <CustomButton label="ログイン" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: Colors.back,
  },
});

export default FirstScreen;
