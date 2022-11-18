import React, {useState, useCallback, useEffect} from 'react';
import {View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {TextInput, IconButton} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';

import {pref_city} from '../../constants/config';
import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {setAuthenticated, setTempUser} from '../../redux/features/globalSlice';

const LocationInput = ({navigation}: any) => {
  const tempUser = useAppSelector((state: any) => state.global.tempUser);

  const dispatch = useAppDispatch();

  const users = firestore().collection('Users');

  const handlePrefecture = (item: any) => {
    dispatch(
      setTempUser({
        ...tempUser,
        prefecture: item.value,
      }),
    );
  };

  const handleAddress = (address: string) => {
    dispatch(
      setTempUser({
        ...tempUser,
        address,
      }),
    );
  };

  const register = async () => {
    // TODO register user with firestore
    const {
      name,
      birthday,
      prefecture,
      address,
      email,
      mobile,
      role,
      avatar,
    } = tempUser;

    const documentSnapShot = await users.add({
      email,
      mobile,
      name,
      birthday: new Date(birthday),
      prefecture,
      address,
      avatar,
      role,
    });

    console.log('save succeeded!', documentSnapShot.id);
    dispatch(
      setTempUser({
        id: documentSnapShot.id,
        email,
        mobile,
        name,
        birthday: new Date(birthday).toString(),
        prefecture,
        address,
        avatar,
        role,
      }),
    );
    dispatch(setAuthenticated(true));
    navigation.navigate('UserDashBoard');
  };
  return (
    <Container bottom centerH>
      <IconButton
        icon="chevron-left"
        color={Colors.white}
        style={styles.backIcon}
        size={30}
        onPress={() => navigation.goBack()}
      />
      <CustomText marginB-40>住所を入力してください</CustomText>
      <CustomText style={styles.confirmLabel}>お住まいのエリア</CustomText>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={pref_city.map(item => ({label: item.pref, value: item.id}))}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={''}
        searchPlaceholder={''}
        onChange={handlePrefecture}
        value={tempUser.prefecture}
      />
      <TextInput
        underlineColor={Colors.white}
        activeUnderlineColor={Colors.white}
        style={{...styles.address}}
        theme={{colors: {text: Colors.white}}}
        value={tempUser.address}
        onChangeText={handleAddress}
      />
      <CustomButton label="次へ" onPress={register} />
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
  confirmLabel: {
    width: '80%',
  },
  address: {
    height: 30,
    width: '80%',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 50,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  dropdown: {
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    width: '80%',
    marginTop: 15,
    marginBottom: 5,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
  },
  inputSearchStyle: {
    height: 40,
    color: Colors.white,
  },
  selectedTextStyle: {
    color: Colors.white,
  },
  placeholderStyle: {
    color: Colors.white,
  },
});

export default LocationInput;
