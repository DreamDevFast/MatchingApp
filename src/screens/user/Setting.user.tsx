import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {StyleSheet, ScrollView} from 'react-native';
import RangeSlider from 'rn-range-slider';
import firestore from '@react-native-firebase/firestore';

import {Container, CustomButton, CustomText} from '../../components';
import {Colors} from '../../styles';
import {TextInput, Switch, IconButton} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {setTempUser, setLoading} from '../../redux/features/globalSlice';
import {
  setSetting,
  PriceRange,
  setPriceRange,
} from '../../redux/features/settingSlice';

import Thumb from '../../components/Thumb';
import Rail from '../../components/Rail';
import RailSelected from '../../components/RailSelected';
import Notch from '../../components/Notch';
import Label from '../../components/Label';

const UserSetting = ({navigation}: any) => {
  const tempUser = useAppSelector((state: any) => state.global.tempUser);
  const setting = useAppSelector((state: any) => state.setting);
  const [email, SetEmail] = useState<string>(tempUser.email);
  const [mobile, SetMobile] = useState<string>(tempUser.mobile);
  const [isNotifying, SetNotifying] = useState<boolean>(setting.isNotifying);
  const [searchLocation, SetSearchLocation] = useState<string>(
    setting.searchLocation,
  );
  const [keyword, SetKeyword] = useState<string>(setting.keyword);
  const [priceRange, SetPriceRange] = useState<PriceRange>({
    low: setting.priceRange.low,
    high: setting.priceRange.high,
  });

  const dispatch = useAppDispatch();

  const onToggleSwitch = () => {
    SetNotifying(!isNotifying);
  };

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: number) => <Label text={value} />,
    [],
  );
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low: number, high: number) => {
    SetPriceRange({low, high});
  }, []);

  const saveAndReturn = async () => {
    try {
      await firestore().collection('Users').doc(tempUser.id).update({
        email,
        mobile,
      });
      console.log('update user info succeeded!');
      dispatch(setTempUser({...tempUser, email, mobile}));
    } catch (err) {
      console.log('Update "Users" collection error: ', err);
    }
    try {
      console.log(setting);
      if (setting.id === '') {
        await firestore().collection('Settings').doc(tempUser.id).set({
          isNotifying,
          keyword,
          searchLocation,
          priceRange,
        });
        console.log('save setting info succeeded!');
        dispatch(
          setSetting({
            id: tempUser.id,
            isNotifying,
            searchLocation,
            keyword,
            priceRange,
          }),
        );
      } else if (setting.id === tempUser.id) {
        await firestore().collection('Settings').doc(setting.id).update({
          isNotifying,
          keyword,
          searchLocation,
          priceRange,
        });
        console.log('update setting info succeeded!');
        dispatch(
          setSetting({
            id: tempUser.id,
            isNotifying,
            searchLocation,
            keyword,
            priceRange,
          }),
        );
      } else {
        console.log('setting id is NOT equal to tempUser id');
      }
    } catch (err) {
      console.log('Create or Update "Settings" collection error: ', err);
    }
  };

  const handleUserInfo = useCallback(
    (method: 'email' | 'mobile') => (value: string) => {
      if (method === 'email') {
        SetEmail(value);
      } else if (method === 'mobile') {
        SetMobile(value);
      }
    },
    [],
  );

  const handleSettingValue = useCallback(
    (key: 'searchLocation' | 'keyword') => (value: string) => {
      if (key === 'searchLocation') {
        SetSearchLocation(value);
      } else if (key === 'keyword') {
        SetKeyword(value);
      }
    },
    [],
  );

  return (
    <Container centerH>
      <ScrollView style={{width: '100%'}}>
        <View centerH>
          <IconButton
            icon="chevron-left"
            color={Colors.white}
            style={styles.backIcon}
            size={30}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.block} centerH marginT-27>
            <Text style={styles.title}>設定</Text>
          </View>
          <View style={styles.block} marginT-20>
            <Text color={Colors.subLabel}>アカウント設定</Text>
            <View row spread centerV style={styles.part} marginB-10 marginT-10>
              <Text style={styles.partLabel}>メールアドレス</Text>
              <TextInput
                style={styles.input}
                selectionColor={Colors.black}
                underlineColor={'#ffffff'}
                activeUnderlineColor={'#ffffff'}
                theme={{colors: {text: Colors.dark}}}
                value={email}
                onChangeText={handleUserInfo('email')}
              />
            </View>
            <View row spread centerV style={styles.part} marginB-10>
              <Text style={styles.partLabel}>電話番号</Text>
              <TextInput
                style={styles.input}
                selectionColor={Colors.black}
                underlineColor={'#ffffff'}
                activeUnderlineColor={'#ffffff'}
                theme={{colors: {text: Colors.dark}}}
                value={mobile}
                onChangeText={handleUserInfo('mobile')}
              />
            </View>
            <View row spread centerV style={styles.part} marginB-10>
              <Text style={styles.partLabel}>通知</Text>
              <Switch
                color={Colors.redBtn}
                value={isNotifying}
                style={styles.switch}
                onValueChange={onToggleSwitch}
              />
            </View>
          </View>
          <View style={styles.block} marginT-10>
            <Text color={Colors.subLabel}>検索条件</Text>
            <View row spread centerV style={styles.part} marginB-10 marginT-10>
              <Text style={styles.partLabel}>希望エリア</Text>
              <TextInput
                style={styles.input}
                selectionColor={Colors.black}
                underlineColor={'#ffffff'}
                activeUnderlineColor={'#ffffff'}
                theme={{colors: {text: Colors.dark}}}
                value={searchLocation}
                onChangeText={handleSettingValue('searchLocation')}
              />
            </View>
            <View style={{...styles.part, height: 70}} centerV marginB-10>
              <View row spread centerV marginT-10>
                <Text style={styles.partLabel}>希望時給</Text>
              </View>
              <View marginT-20 marginB-20 centerH>
                <RangeSlider
                  style={styles.slider}
                  min={1500}
                  max={10000}
                  low={priceRange.low}
                  high={priceRange.high}
                  step={100}
                  floatingLabel
                  renderThumb={renderThumb}
                  renderRail={renderRail}
                  renderRailSelected={renderRailSelected}
                  renderLabel={renderLabel}
                  renderNotch={renderNotch}
                  onValueChanged={handleValueChange}
                />
              </View>
            </View>
            <View row spread centerV style={styles.part} marginB-10>
              <Text style={styles.partLabel}>キーワード</Text>
              <TextInput
                style={styles.input}
                selectionColor={Colors.black}
                underlineColor={'#ffffff'}
                activeUnderlineColor={'#ffffff'}
                theme={{colors: {text: Colors.dark}}}
                value={keyword}
                onChangeText={handleSettingValue('keyword')}
              />
            </View>
          </View>
          <View style={styles.block} marginT-10>
            <Text color={Colors.subLabel}>お問い合わせ</Text>
            <View row spread centerV style={styles.part} marginB-10 marginT-10>
              <Text style={styles.partLabel}>ヘルプとお問い合わせ</Text>
              <TextInput
                style={{...styles.input, width: '40%'}}
                selectionColor={Colors.black}
                underlineColor={'#ffffff'}
                activeUnderlineColor={'#ffffff'}
                theme={{colors: {text: Colors.dark}}}
              />
            </View>
          </View>
          <View style={styles.block} marginT-10 marginB-10>
            <CustomButton
              label="ログアウト"
              color={Colors.redBtn}
              labelStyle={styles.logoutLabel}
              style={styles.logout}
              onPress={saveAndReturn}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    left: 0,
    top: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 20,
  },
  block: {
    width: '80%',
  },
  part: {
    backgroundColor: Colors.white,
    borderRadius: 30,
  },
  input: {
    height: 50,
    borderRadius: 30,
    marginRight: 20,
    backgroundColor: Colors.white,
    paddingHorizontal: 0,
    borderColor: '#00000000',
    borderWidth: 0,
    width: '60%',
    textAlign: 'right',
  },
  switch: {
    marginRight: 20,
    height: 50,
  },
  partLabel: {
    color: Colors.partLabel,
    marginLeft: 20,
    fontSize: 10,
  },
  logout: {
    borderRadius: 50,
  },
  logoutLabel: {
    color: Colors.white,
  },
  slider: {
    width: '90%',
  },
});
export default UserSetting;
