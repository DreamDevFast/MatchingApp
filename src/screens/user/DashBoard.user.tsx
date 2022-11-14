import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {CustomButton, Container, CustomText} from '../../components';
import {Colors} from '../../styles';
import {Text, View} from 'react-native-ui-lib';
import UserShopSearch from './ShopSearch.user';
import CustomTabnav from '../../components/CustomTabnav';

const DefaultTab = () => {
  const [profile, setProfile] = useState({avatar: 'default.png'});
  return (
    <>
      <View marginT-30>
        {profile.avatar === 'default.png' ? (
          <Avatar.Icon size={250} icon="user" />
        ) : (
          <Avatar.Image size={250} source={{uri: profile.avatar}} />
        )}
      </View>
      <View row spread marginT-10 style={styles.toolBar1}>
        <View centerH>
          <IconButton
            icon="cog"
            color={Colors.back}
            style={styles.whiteIcon}
            rippleColor={Colors.redBtn}
            size={25}
            onPress={() => console.log('Pressed')}
          />
          <Text style={styles.iconLabel}>設定</Text>
        </View>
        <View centerH>
          <IconButton
            icon="pencil-alt"
            color={Colors.back}
            style={styles.whiteIcon}
            rippleColor={Colors.redBtn}
            size={25}
            onPress={() => console.log('Pressed')}
          />
          <Text style={styles.iconLabel}>プロフィール</Text>
        </View>
      </View>
      <View centerH>
        <IconButton
          icon="camera"
          color={Colors.redBtn}
          rippleColor={Colors.redBtn}
          style={styles.whiteIcon}
          size={40}
          onPress={() => console.log('Pressed')}
        />
        <Text style={styles.iconLabel}>画像を追加</Text>
      </View>
    </>
  );
};
const UserDashBoard = ({navigation, route}: any) => {
  return (
    <CustomTabnav navigation={navigation} route={route}>
      <DefaultTab />
    </CustomTabnav>
  );
};

const styles = StyleSheet.create({
  toolBar: {
    width: '80%',
    marginTop: 20,
  },
  toolBar1: {
    width: '60%',
    marginTop: 20,
  },
  whiteIcon: {
    backgroundColor: Colors.white,
  },
  iconLabel: {
    fontSize: 10,
    color: Colors.iconLabel,
  },
});
export default UserDashBoard;
