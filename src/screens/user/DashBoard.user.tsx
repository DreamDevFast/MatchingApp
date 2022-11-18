import React, {useState} from 'react';
import {StyleSheet, Pressable, Platform} from 'react-native';
import {IconButton, Modal} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {CustomButton, Container, CustomText} from '../../components';
import {Colors} from '../../styles';
import {Text, View, Avatar} from 'react-native-ui-lib';
import UserShopSearch from './ShopSearch.user';
import CustomTabnav from '../../components/CustomTabnav';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {setTempUser, setLoading} from '../../redux/features/globalSlice';
import Loader from '../../components/Loader';

const userIcon = require('../../assets/images/user.png');

const DefaultTab = ({navigation}: any) => {
  const tempUser = useAppSelector((state: any) => state.global.tempUser);
  const isLoading = useAppSelector((state: any) => state.global.isLoading);

  const dispatch = useAppDispatch();

  const [openImagePickerModal, setOpenImagePickerModal] = useState<boolean>(
    false,
  );

  const handleAvatar = async (avatar: string) => {
    try {
      await firestore().collection('Users').doc(tempUser.id).update({avatar});
      console.log('updated');
      dispatch(
        setTempUser({
          ...tempUser,
          avatar,
        }),
      );
    } catch (err) {
      console.log('update avatar error: ', err);
    }
  };

  const pickPictureOnGallery = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 600,
      cropping: true,
    })
      .then(async image => {
        dispatch(setLoading(true));
        setOpenImagePickerModal(false);
        const now = Date.now();

        const filenameInStore = `${tempUser.name}-${now}.png`;
        const reference = storage().ref(filenameInStore);
        await reference.putFile(
          Platform.OS === 'ios'
            ? image.path.replace('file://', '')
            : image.path,
        );
        const url = await storage().ref(filenameInStore).getDownloadURL();

        await handleAvatar(url);

        dispatch(setLoading(false));
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
      .then(async image => {
        dispatch(setLoading(true));
        setOpenImagePickerModal(false);
        const now = Date.now();

        const filenameInStore = `${tempUser.name}-${now}.png`;
        const reference = storage().ref(filenameInStore);
        await reference.putFile(
          Platform.OS === 'ios'
            ? image.path.replace('file://', '')
            : image.path,
        );
        const url = await storage().ref(filenameInStore).getDownloadURL();

        await handleAvatar(url);

        dispatch(setLoading(false));
      })
      .catch(err => {
        setOpenImagePickerModal(false);
      });
  };

  console.log(isLoading);
  return (
    <>
      <Loader isLoading={isLoading} />
      <View marginT-30>
        <Avatar
          size={250}
          source={
            tempUser.avatar === 'default.png' || '' || undefined
              ? userIcon
              : {uri: tempUser.avatar}
          }
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
