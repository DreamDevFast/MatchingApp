import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import {View, Button, Text} from 'react-native-ui-lib';
import {Divider, FAB, IconButton} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useFocusEffect} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {setTempUser, setLoading} from '../../redux/features/globalSlice';

import CustomTabnav from '../../components/CustomTabnav';
import {Colors} from '../../styles';

const {width, height} = Dimensions.get('window');

const UserShopSearch = ({navigation, route}: any) => {
  const users = firestore().collection('Users');
  const tempUser = useAppSelector((state: any) => state.global.tempUser);
  const [targetUsers, setTargetUsers] = useState<Array<any>>([]);

  const [state, setState] = useState<
    'like' | 'dislike' | 'favorite' | 'initial'
  >('initial');

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

  const getBackgroundColor = () => {
    if (state === 'like') {
      return {
        backgroundColor: '#fe3c7280',
      };
    }

    if (state === 'dislike') {
      return {
        backgroundColor: '#20a39e80',
      };
    }

    return {
      backgrounColor: '#00000000',
    };
  };

  return (
    <CustomTabnav navigation={navigation} route={route}>
      <ScrollView horizontal={true}>
        {targetUsers.map(user => (
          <TouchableHighlight key={user.id}>
            <ImageBackground
              source={{
                uri: user.avatar,
              }}
              style={styles.imagebackground}
              imageStyle={styles.image}
            >
              <View bottom style={styles.container}>
                <View style={styles.desc}>
                  <ScrollView>
                    <Text style={styles.title}>{user.name}</Text>
                    <View row spread>
                      <SimpleLineIcons
                        name="location-pin"
                        size={20}
                        color={Colors.redBtn}
                      />
                      <Text style={styles.label}>池袋</Text>
                      <View style={{width: width * 0.2}}></View>
                      <MaterialCommunityIcons
                        name="piggy-bank-outline"
                        size={20}
                        color={Colors.redBtn}
                      />
                      <Text style={styles.label}>1,500円〜</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <Text>
                      ようこそ！ざっぶーん！ ここは海の中のメイドカフェ＆バー
                      ご来店される王子様方がキュートでセクシーなマーメイドちゃんたちに癒され、
                      陸のセカイでの活力になればと願い、
                      この度新規オープンさせて頂きました★ ようこそ！ざっぶーん！
                      ここは海の中のメイドカフェ＆バー
                      ご来店される王子様方がキュートでセクシーなマーメイドちゃんたちに癒され、
                      陸のセカイでの活力になればと願い、
                      この度新規オープンさせて頂きました★ ようこそ！ざっぶーん！
                      ここは海の中のメイドカフェ＆バー
                      ご来店される王子様方がキュートでセクシーなマーメイドちゃんたちに癒され、
                      陸のセカイでの活力になればと願い、
                      この度新規オープンさせて頂きました★ ようこそ！ざっぶーん！
                      ここは海の中のメイドカフェ＆バー
                      ご来店される王子様方がキュートでセクシーなマーメイドちゃんたちに癒され、
                      陸のセカイでの活力になればと願い、
                      この度新規オープンさせて頂きました★
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </ImageBackground>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <IconButton
        icon="undo"
        color={Colors.white}
        style={styles.return}
        size={15}
        onPress={() => console.log('Pressed')}
      />
      <IconButton
        icon="times"
        color={Colors.white}
        style={styles.dislike}
        size={20}
        onPress={() => setState('dislike')}
      />
      <IconButton
        icon="star"
        color={Colors.white}
        style={styles.favorite}
        size={15}
        onPress={() => console.log('Pressed')}
      />
      <IconButton
        icon="heart"
        color={Colors.white}
        style={styles.like}
        size={20}
        onPress={() => setState('like')}
      />
      <IconButton
        icon="bolt"
        color={Colors.white}
        style={styles.boost}
        size={15}
        onPress={() => console.log('Pressed')}
      />
    </CustomTabnav>
  );
};

const styles = StyleSheet.create({
  imagebackground: {
    width: width,
    height: height,
  },
  image: {
    width,
    height: height * 0.6,
  },
  container: {
    height: '100%',
    width,
  },
  desc: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingBottom: 0,
    height: height * 0.5,
  },
  title: {
    height: 50,
    fontSize: 30,
  },
  label: {
    color: Colors.iconLabel,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.iconLabel,
    marginVertical: 10,
  },
  reaction_icon: {
    position: 'absolute',
    bottom: height * 0.5 - width * 0.25,
    right: width * 0.25,
    zIndex: 1,
  },
  return: {
    position: 'absolute',
    left: (width * 1) / 6 - 20,
    bottom: 25,
    backgroundColor: '#a4a9ad',
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  dislike: {
    position: 'absolute',
    left: (width * 2) / 6 - 25,
    bottom: 20,
    backgroundColor: '#20a39e',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  favorite: {
    position: 'absolute',
    left: (width * 3) / 6 - 20,
    bottom: 25,
    backgroundColor: '#ffba49',
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  like: {
    position: 'absolute',
    left: (width * 4) / 6 - 25,
    backgroundColor: '#fe3c72',
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  boost: {
    position: 'absolute',
    left: (width * 5) / 6 - 20,
    backgroundColor: '#b780ff',
    bottom: 25,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default UserShopSearch;
