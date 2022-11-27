import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Container from './Container';
import {IconButton} from 'react-native-paper';
import {View} from 'react-native-ui-lib';
import {Colors} from '../styles';
import {useAppDispatch} from '../redux/reduxHooks';
import {setLoading} from '../redux/features/globalSlice';

const {width, height} = Dimensions.get('window');

enum Relation {
  initial,
  like,
  dislike,
  favorite,
}

const CustomTabnav = ({children, navigation, route, ...props}: any) => {
  const dispatch = useAppDispatch();

  const [state, setState] = React.useState<{open: boolean}>({open: false});

  const onStateChange = ({open}: {open: boolean}) => setState({open: !open});

  const {open} = state;

  const {handleFilter} = props;

  const handleDropdownItem = (itemName: Relation) => () => {
    setState({open: false});
    if (handleFilter !== undefined) {
      handleFilter(itemName);
    }
  };

  return (
    <Container flex centerH>
      <View row spread bottom style={styles.toolBar}>
        <IconButton
          icon="user-alt"
          color={route.name == 'UserDashBoard' ? Colors.redBtn : Colors.white}
          size={25}
          style={
            route.name == 'UserDashBoard'
              ? {...styles.iconButton, ...styles.highLight}
              : styles.iconButton
          }
          onPress={() => navigation.navigate('UserDashBoard')}
        />
        {route.name !== 'UserShopSearch' ? (
          <IconButton
            icon="fire"
            color={Colors.white}
            size={25}
            style={styles.iconButton}
            onPress={() => {
              dispatch(setLoading(true));
              navigation.navigate('UserShopSearch');
            }}
          />
        ) : (
          <View>
            <IconButton
              icon="fire"
              color={Colors.redBtn}
              size={25}
              style={{...styles.iconButton, ...styles.highLight}}
              onPress={() => onStateChange(state)}
            />
            {open ? (
              <View style={styles.dropdown}>
                <IconButton
                  icon="times"
                  color={Colors.white}
                  style={styles.dislike}
                  size={25}
                  onPress={handleDropdownItem(Relation.dislike)}
                />
                <IconButton
                  icon="star"
                  color={Colors.white}
                  style={styles.favorite}
                  size={25}
                  onPress={handleDropdownItem(Relation.favorite)}
                />
                <IconButton
                  icon="heart"
                  color={Colors.white}
                  style={styles.like}
                  size={25}
                  onPress={handleDropdownItem(Relation.like)}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        )}

        <IconButton
          icon="comment"
          color={route.name == 'UserChat' ? Colors.redBtn : Colors.white}
          size={25}
          style={
            route.name == 'UserChat'
              ? {...styles.iconButton, ...styles.highLight}
              : styles.iconButton
          }
          onPress={() => {
            dispatch(setLoading(true));
            navigation.navigate('UserChat');
          }}
        />
      </View>
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
    backgroundColor: Colors.white,
  },
  group_style: {
    marginBottom: -55,
    zIndex: 1,
  },
  dislike: {
    backgroundColor: '#20a39e',
    borderRadius: 25,
  },
  like: {
    backgroundColor: '#fe3c72',
    borderRadius: 25,
  },
  favorite: {
    backgroundColor: '#ffba49',
    borderRadius: 25,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    zIndex: 1,
  },
});

export default CustomTabnav;
