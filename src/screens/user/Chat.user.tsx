import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import {List} from 'react-native-paper';
import {Text, View, Avatar} from 'react-native-ui-lib';
import {useFocusEffect} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {setTempUser, setLoading} from '../../redux/features/globalSlice';

import CustomTabnav from '../../components/CustomTabnav';
import {Colors} from '../../styles';

const {width, height} = Dimensions.get('window');

const UserChat = ({navigation, route}: any) => {
  const users = firestore().collection('Users');
  const tempUser = useAppSelector((state: any) => state.global.tempUser);

  const [targetUsers, setTargetUsers] = useState<Array<any>>([]);

  useFocusEffect(
    useCallback(() => {
      users
        .where('role', '!=', tempUser.role)
        .get()
        .then(querySnapshot => {
          setTargetUsers(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              name: doc.data().name,
              avatar: doc.data().avatar,
            })),
          );
        });
    }, []),
  );

  return (
    <CustomTabnav navigation={navigation} route={route}>
      <ScrollView>
        <View marginT-50></View>
        {targetUsers.map(user => (
          <List.Item
            key={user.id}
            title={user.name}
            titleStyle={{color: Colors.white, top: -10}}
            description={() => {
              return (
                <View style={{top: -10}}>
                  <Text style={{color: Colors.iconLabel}}>
                    diam accumsan ut. Ut imperdiet et leo in vulputate
                  </Text>
                  <Text style={{color: Colors.iconLabel, fontSize: 10}}>
                    5min ago
                  </Text>
                </View>
              );
            }}
            left={() => {
              return (
                <View row>
                  <Avatar
                    size={50}
                    source={{
                      uri: user.avatar,
                    }}
                    label={'IMG'}
                    imageStyle={styles.avatar}
                  />
                </View>
              );
            }}
            style={styles.list_item}
            onPress={() => {
              navigation.navigate('UserChatRoom', {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
              });
            }}
          />
        ))}
      </ScrollView>
    </CustomTabnav>
  );
};

const styles = StyleSheet.create({
  list_item: {
    width,
  },
  avatar: {
    borderColor: Colors.white,
    borderWidth: 2,
  },
});
export default UserChat;
