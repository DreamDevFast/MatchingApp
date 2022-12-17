import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {StyleSheet, ScrollView} from 'react-native';
import RangeSlider from 'rn-range-slider';
import firestore from '@react-native-firebase/firestore';

import {Container, CustomButton, CustomText} from '../../components';
import {Colors} from '../../styles';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput, Switch, IconButton} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {setTempUser, setLoading} from '../../redux/features/globalSlice';
import {
  setSetting,
  Range,
  setPriceRange,
} from '../../redux/features/settingSlice';
import {pref_city} from '../../constants/config';

import Thumb from '../../components/Thumb';
import Rail from '../../components/Rail';
import RailSelected from '../../components/RailSelected';
import Notch from '../../components/Notch';
import Label from '../../components/Label';

import Loader from '../../components/Loader';

const UserSetting = ({navigation}: any) => {
  const tempUser = useAppSelector((state: any) => state.global.tempUser);
  const isLoading = useAppSelector((state: any) => state.global.isLoading);
  const setting = useAppSelector((state: any) => state.setting);
  const [email, SetEmail] = useState<string>(tempUser.email);
  const [mobile, SetMobile] = useState<string>(tempUser.mobile);
  const [isNotifying, SetNotifying] = useState<boolean>(setting.isNotifying);
  const [searchLocation, SetSearchLocation] = useState<string>(
    setting.searchLocation,
  );
  const [keyword, SetKeyword] = useState<string>(setting.keyword);
  const [priceRange, SetPriceRange] = useState<Range>({
    low: setting.priceRange.low,
    high: setting.priceRange.high,
  });
  const [unlimitedLikesAndChat, SetUnlimited] = useState<string>(
    setting.unlimitedLikesAndChat,
  );
  const [ageRange, SetAgeRange] = useState<Range>({
    low: setting.ageRange.low,
    high: setting.ageRange.high,
  });

  const settings = firestore().collection('Settings');

  const dispatch = useAppDispatch();

  console.log('refresh', setting.isNotifying, isNotifying);
  useFocusEffect(
    useCallback(() => {
      settings
        .doc(tempUser.id)
        .get()
        .then(doc => {
          if (doc.exists) {
            const setting = doc.data();
            console.log('doc', setting);
            if (setting !== undefined) {
              dispatch(
                setSetting({
                  id: doc.id,
                  isNotifying: setting.isNotifying,
                  searchLocation: setting.searchLocation,
                  keyword: setting.keyword === undefined ? '' : setting.keyword,
                  priceRange: setting.priceRange,
                  unlimitedLikesAndChat:
                    setting.unlimitedLikesAndChat === undefined
                      ? '0'
                      : setting.unlimitedLikesAndChat,
                  ageRange:
                    setting.ageRange === undefined
                      ? {low: 15, high: 30}
                      : setting.ageRange,
                }),
              );
              SetNotifying(setting.isNotifying);
              SetSearchLocation(setting.searchLocation);
              SetKeyword(setting.keyword === undefined ? '' : setting.keyword);
              SetPriceRange(setting.priceRange);
              SetUnlimited(
                setting.unlimitedLikesAndChat === undefined
                  ? '0'
                  : setting.unlimitedLikesAndChat,
              );
              SetAgeRange(
                setting.ageRange === undefined
                  ? {low: 15, high: 30}
                  : setting.ageRange,
              );
            }
          }
        });
    }, []),
  );

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
  const handlePriceValueChange = useCallback((low: number, high: number) => {
    SetPriceRange({low, high});
  }, []);

  const handleAgeValueChange = useCallback((low: number, high: number) => {
    console.log(low, high);
    SetAgeRange({low, high});
  }, []);

  const saveAndReturn = async () => {
    dispatch(setLoading(true));
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
          unlimitedLikesAndChat,
          ageRange,
        });
        console.log('save setting info succeeded!');
        dispatch(
          setSetting({
            id: tempUser.id,
            isNotifying,
            searchLocation,
            keyword,
            priceRange,
            unlimitedLikesAndChat,
            ageRange,
          }),
        );
        dispatch(setLoading(false));

        navigation.navigate('UserDashBoard');
      } else if (setting.id === tempUser.id) {
        await firestore().collection('Settings').doc(setting.id).update({
          isNotifying,
          keyword,
          searchLocation,
          priceRange,
          unlimitedLikesAndChat,
          ageRange,
        });
        console.log('update setting info succeeded!', ageRange);
        dispatch(
          setSetting({
            id: tempUser.id,
            isNotifying,
            searchLocation,
            keyword,
            priceRange,
            unlimitedLikesAndChat,
            ageRange,
          }),
        );
        dispatch(setLoading(false));

        navigation.navigate('UserDashBoard');
      } else {
        console.log('setting id is NOT equal to tempUser id');
      }
    } catch (err) {
      console.log('Create or Update "Settings" collection error: ', err);
    }
    dispatch(setLoading(false));
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
    (key: 'searchLocation' | 'keyword' | 'unlimitedLikesAndChat') => (
      value: string,
    ) => {
      if (key === 'searchLocation') {
        SetSearchLocation(value);
      } else if (key === 'keyword') {
        SetKeyword(value);
      } else if (key === 'unlimitedLikesAndChat') {
        SetUnlimited(value);
      }
    },
    [],
  );

  return (
    <Container centerH>
      <Loader isLoading={isLoading} />
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
          <View marginT-20></View>
          {tempUser.role === 'shop' ? (
            <View style={styles.block}>
              <Text color={Colors.subLabel}>無制限のいいねとチャット</Text>
              <View centerV right style={styles.part} marginB-10 marginT-10>
                <TextInput
                  style={styles.input}
                  selectionColor={Colors.black}
                  underlineColor={'#ffffff'}
                  activeUnderlineColor={'#ffffff'}
                  theme={{colors: {text: Colors.dark}}}
                  value={unlimitedLikesAndChat}
                  onChangeText={handleSettingValue('unlimitedLikesAndChat')}
                />
              </View>
            </View>
          ) : (
            <></>
          )}

          <View style={styles.block}>
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
                onChangeText={text =>
                  handleUserInfo('mobile')(text.replace(/[^0-9]/g, ''))
                }
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
            <View marginT-10></View>
            {tempUser.role === 'girl' ? (
              <View row spread centerV style={styles.part} marginB-10>
                <Text style={styles.partLabel}>希望エリア</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={pref_city.map(item => ({
                    label: item.pref,
                    value: item.id,
                  }))}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={''}
                  searchPlaceholder={''}
                  onChange={(item: any) =>
                    handleSettingValue('searchLocation')(item.value)
                  }
                  value={searchLocation}
                />
              </View>
            ) : (
              <></>
            )}
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
                  onValueChanged={handlePriceValueChange}
                />
              </View>
            </View>
            {tempUser.role === 'shop' ? (
              <View style={{...styles.part, height: 70}} centerV marginB-10>
                <View row spread centerV marginT-10>
                  <Text style={styles.partLabel}>年齢</Text>
                </View>
                <View marginT-20 marginB-20 centerH>
                  <RangeSlider
                    style={styles.slider}
                    min={15}
                    max={30}
                    low={ageRange.low}
                    high={ageRange.high}
                    step={1}
                    floatingLabel
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderLabel={renderLabel}
                    renderNotch={renderNotch}
                    onValueChanged={handleAgeValueChange}
                  />
                </View>
              </View>
            ) : (
              <></>
            )}

            {tempUser.role === 'girl' ? (
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
            ) : (
              <></>
            )}
          </View>
          <View style={styles.block} marginT-10>
            <Text color={Colors.subLabel}>お問い合わせ</Text>
            <CustomButton
              label="ヘルプとお問い合わせ"
              color={Colors.white}
              labelStyle={styles.help}
              style={styles.logout}
              onPress={() => navigation.navigate('Help')}
            />
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
  help: {
    color: Colors.iconLabel,
  },
  dropdown: {
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    width: '80%',
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
  },
  inputSearchStyle: {
    height: 40,
    color: Colors.white,
  },
  selectedTextStyle: {
    color: Colors.black,
    textAlign: 'right',
  },
  placeholderStyle: {
    color: Colors.white,
  },
});

export default UserSetting;
