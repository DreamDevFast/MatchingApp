import React, {useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {IconButton, Modal} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {CustomButton, Container, CustomText} from '../../components';
import {Colors} from '../../styles';
import {Text, View, Avatar} from 'react-native-ui-lib';
import UserShopSearch from './ShopSearch.user';
import CustomTabnav from '../../components/CustomTabnav';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {setTempUser} from '../../redux/features/globalSlice';

const userIcon = require('../../assets/images/user.png');

const DefaultTab = ({navigation}: any) => {
  const tempUser = useAppSelector((state: any) => state.global.tempUser);
  const dispatch = useAppDispatch();

  const [profile, setProfile] = useState({
    avatar: 'default.png',
  });
  const [openImagePickerModal, setOpenImagePickerModal] = useState<boolean>(
    false,
  );

  const handleProfileChange = (key: string) => (value: any) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };
  const pickPictureOnGallery = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 600,
      cropping: true,
    })
      .then(image => {
        handleProfileChange('avatar')({
          uri: image.path,
          type: image.mime,
          size: image.size,
        });
        setOpenImagePickerModal(false);
      })
      .catch(err => {
        setOpenImagePickerModal(false);
      });
  };

  const pickPictureOnCamera = () => {
    ImagePicker.openCamera({
      width: 800,
      height: 600,
      cropping: true,
    })
      .then(image => {
        handleProfileChange('avatar')({
          uri: image.path,
          type: image.mime,
          size: image.size,
        });
        setOpenImagePickerModal(false);
      })
      .catch(err => {
        setOpenImagePickerModal(false);
      });
  };
  return (
    <>
      <View marginT-30>
        <Avatar
          size={250}
          source={profile.avatar === 'default.png' ? userIcon : profile.avatar}
          label={'IMG'}
        />
      </View>
      <View row spread marginT-10 style={styles.toolBar1}>
        <View centerH>
          <IconButton
            icon="cog"
            color={Colors.back}
            style={styles.whiteIcon}
            rippleColor={Colors.redBtn}
            size={25}
            onPress={() => navigation.navigate('UserSetting')}
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
            onPress={() => navigation.navigate('UserProfile')}
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
          onPress={() => setOpenImagePickerModal(true)}
        />
        <Text style={styles.iconLabel}>画像を追加</Text>
      </View>
      <Modal
        visible={openImagePickerModal}
        dismissable
        onDismiss={() => setOpenImagePickerModal(false)}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          margin: 20,
          borderRadius: 10,
        }}
      >
        <View row>
          <View flex center>
            <Pressable onPress={pickPictureOnGallery}>
              <Ionicons name={'ios-images'} size={40} color={Colors.grey10} />
              <Text>Gallery</Text>
            </Pressable>
          </View>
          <View flex center>
            <Pressable onPress={pickPictureOnCamera}>
              <Ionicons name={'md-camera'} size={40} color={Colors.grey10} />
              <Text>Camera</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};
const UserDashBoard = ({navigation, route}: any) => {
  return (
    <CustomTabnav navigation={navigation} route={route}>
      <DefaultTab navigation={navigation} />
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
