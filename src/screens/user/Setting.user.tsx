import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';

import {Container, CustomText} from '../../components';
import {Colors} from '../../styles';
import {TextInput, Switch} from 'react-native-paper';

const UserSetting = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <Container centerH>
      <View style={styles.block}>
        <Text color={Colors.iconLabel}>アカウント設定</Text>
        <View row spread centerV style={styles.part} marginB-10 marginT-10>
          <Text color={Colors.partLabel}>メールアドレス</Text>
          <TextInput
            style={styles.input}
            selectionColor={Colors.redBtn}
            underlineColor={'#ffffff'}
            activeUnderlineColor={'#ffffff'}
            theme={{colors: {text: Colors.dark}}}
          />
        </View>
        <View row spread centerV style={styles.part} marginB-10>
          <Text color={Colors.partLabel}>電話番号</Text>
          <TextInput
            style={styles.input}
            selectionColor={Colors.redBtn}
            underlineColor={'#ffffff'}
            activeUnderlineColor={'#ffffff'}
            theme={{colors: {text: Colors.dark}}}
          />
        </View>
        <View row spread centerV style={styles.part} marginB-10>
          <Text color={Colors.partLabel}>通知</Text>
          <Switch
            value={isSwitchOn}
            color={Colors.redBtn}
            onValueChange={onToggleSwitch}
          />
        </View>
      </View>
      <View style={styles.block}>
        <Text color={Colors.iconLabel}>検索条件</Text>
        <View row spread centerV style={styles.part} marginB-10 marginT-10>
          <Text color={Colors.partLabel}>希望エリア</Text>
          <TextInput
            style={styles.input}
            selectionColor={Colors.redBtn}
            underlineColor={'#ffffff'}
            activeUnderlineColor={'#ffffff'}
            theme={{colors: {text: Colors.dark}}}
          />
        </View>
        <View style={styles.part} marginB-10>
          <View row spread>
            <Text color={Colors.partLabel}>希望時給</Text>
            <TextInput
              style={styles.input}
              selectionColor={Colors.redBtn}
              underlineColor={'#ffffff'}
              activeUnderlineColor={'#ffffff'}
              theme={{colors: {text: Colors.dark}}}
            />
          </View>
          <View></View>
        </View>
        <View row spread centerV style={styles.part} marginB-10>
          <Text color={Colors.partLabel}>キーワード</Text>
          <TextInput
            style={styles.input}
            selectionColor={Colors.redBtn}
            underlineColor={'#ffffff'}
            activeUnderlineColor={'#ffffff'}
            theme={{colors: {text: Colors.dark}}}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  block: {
    width: '80%',
  },
  part: {
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  input: {
    height: 30,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 0,
    borderColor: '#00000000',
    borderWidth: 0,
    width: '60%',
    textAlign: 'right',
  },
  partLabel: {
    color: '#000000',
  },
});
export default UserSetting;
