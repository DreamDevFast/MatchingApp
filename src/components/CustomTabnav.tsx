import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Container from './Container';
import {IconButton, Avatar} from 'react-native-paper';
import {Colors} from '../styles';

const {width, height} = Dimensions.get('window');

const CustomTabnav = ({children, navigation, route, ...props}: any) => {
  return (
    <Container flex centerH>
      <Container row spread bottom style={styles.toolBar}>
        <IconButton
          icon="user-alt"
          color={Colors.white}
          size={25}
          style={
            route.name == 'UserDashBoard'
              ? {...styles.iconButton, ...styles.highLight}
              : styles.iconButton
          }
          onPress={() => navigation.navigate('UserDashBoard')}
        />
        <IconButton
          icon="fire"
          color={Colors.white}
          size={25}
          style={
            route.name == 'UserShopSearch'
              ? {...styles.iconButton, ...styles.highLight}
              : styles.iconButton
          }
          onPress={() => navigation.navigate('UserShopSearch')}
        />
        <IconButton
          icon="comment"
          color={Colors.white}
          size={25}
          style={
            route.name == 'UserChat'
              ? {...styles.iconButton, ...styles.highLight}
              : styles.iconButton
          }
          onPress={() => navigation.navigate('UserChat')}
        />
      </Container>
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  toolBar: {
    width: '80%',
    height: height * 0.12,
  },
  iconButton: {
    marginBottom: -15,
    zIndex: 1,
  },
  highLight: {
    backgroundColor: Colors.redBtn,
  },
});

export default CustomTabnav;
