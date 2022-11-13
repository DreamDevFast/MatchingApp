import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native-ui-lib';

import {Colors} from '../styles';

const Container = ({children, ...props}: any) => {
  return (
    <View style={styles.container} {...props}>
      {children}
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

export default Container;
