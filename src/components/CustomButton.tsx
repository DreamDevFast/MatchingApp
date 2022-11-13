import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Colors} from '../styles';

type Props = {
  label: string;
  color?: string;
  mode?: 'text' | 'outlined' | 'contained' | undefined;
  props?: any;
};

const CustomButton = ({label, color, mode, props}: Props) => {
  if (color === undefined) {
    color = Colors.redBtn;
  }
  if (mode === undefined) {
    mode = 'contained';
  }

  return (
    <Button mode={mode} color={color} style={styles.customBtn} {...props}>
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  customBtn: {
    borderRadius: 50,
  },
});

export default CustomButton;
