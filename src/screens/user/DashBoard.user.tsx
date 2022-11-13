import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {CustomButton, Container, CustomText} from '../../components';
import {Colors} from '../../styles';

const UserDashBoard = () => {
  return (
    <Container flex centerH>
      <Container row spread style={styles.toolBar}>
        <IconButton
          icon="user-alt"
          color={Colors.white}
          rippleColor={Colors.redBtn}
          size={25}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="fire"
          color={Colors.white}
          rippleColor={Colors.redBtn}
          size={25}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="comment"
          color={Colors.white}
          rippleColor={Colors.redBtn}
          size={25}
          onPress={() => console.log('Pressed')}
        />
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  toolBar: {
    width: '80%',
    marginTop: 20,
  },
});
export default UserDashBoard;
