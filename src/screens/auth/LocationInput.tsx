import React, {useState, useCallback} from 'react';
import {View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';

import {pref_city} from '../../constants/config';
import {Colors} from '../../styles';
import {Container, CustomButton, CustomText} from '../../components';

const LocationInput = () => {
  const [profile, setProfile] = useState({
    prefectures: null,
  });
  const handleChangeProfile = useCallback(
    (key: any) => (value: any) => {
      setProfile(state => ({...state, [key]: value}));
    },
    [profile],
  );
  return (
    <Container bottom centerH>
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
        onChangeText={handleChangeProfile('prefectures')}
        onChange={item => {
          handleChangeProfile({prefectures: item.value});
        }}
        value={profile.prefectures}
      />
      <TextInput
        underlineColor={Colors.redBtn}
        activeUnderlineColor={Colors.redBtn}
        style={{...styles.address}}
        theme={{colors: {text: Colors.white}}}
      />
      <CustomButton label="次へ" />
      <View marginB-100></View>
    </Container>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: Colors.back,
  },
  dropdown: {
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    width: '80%',
    marginTop: 15,
    marginBottom: 5,
    borderBottomColor: '#4CAF50',
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
