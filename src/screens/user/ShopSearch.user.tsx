import React, {useRef, useState, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  PanResponder,
  Animated,
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
import CustomStamp from '../../components/CustomStamp';

const {width, height} = Dimensions.get('window');

enum Relation {
  initial,
  like,
  dislike,
  favorite,
}

var index = 0;

const UserShopSearch = ({navigation, route}: any) => {
  const users = firestore().collection('Users');
  const relations = firestore().collection('Relations');
  const tempUser = useAppSelector((state: any) => state.global.tempUser);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [targetUsers, setTargetUsers] = useState<Array<any>>([]);

  const [state, setState] = useState<Relation>(Relation.initial);
  const pan = useRef(new Animated.ValueXY()).current;
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFavoritePossible, setIsFavoritePossible] = useState<1 | 0>(1);

  // pan.addListener(value => {
  //   if (Math.abs(value.x) > width * 0.1) {
  //     setIsFavoritePossible(0);
  //   } else {
  //     setIsFavoritePossible(1);
  //   }
  // });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (gestureState.y0 > height * 0.5) {
          setDirection(-1);
        } else {
          setDirection(1);
        }
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        console.log(gestureState.dx);
        if (Math.abs(gestureState.dx) < width * 0.3) {
          Animated.spring(pan, {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: false,
          }).start();
          return;
        }
        Animated.spring(pan, {
          toValue: {
            x: (500 * gestureState.dx) / Math.abs(gestureState.dx),
            y: 0,
          },
          useNativeDriver: false,
        }).start(({finished}) => {
          if (finished) {
          }
        });

        console.log('release: ', currentIndex);
        index++;
        Animated.timing(pan, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: false,
          duration: 0,
        }).start();
        setCurrentIndex(index);
      },
    }),
  ).current;

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

      return () => {
        index = 0;
      };
    }, []),
  );

  // const getBackgroundColor = () => {
  //   if (state === 'like') {
  //     return {
  //       backgroundColor: '#fe3c7280',
  //     };
  //   }

  //   if (state === 'dislike') {
  //     return {
  //       backgroundColor: '#20a39e80',
  //     };
  //   }

  //   return {
  //     backgrounColor: '#00000000',
  //   };
  // };

  const handleRelation = (relation: Relation) => () => {
    console.log(relation);
    const targetUser = targetUsers[currentIndex];

    relations
      .where('user1', 'in', [tempUser.id, targetUser.id])
      .get()
      .then(querySnapshot => {
        const results = querySnapshot.docs.filter(doc => {
          if (
            doc.data().user2 === tempUser.id ||
            doc.data().user2 === targetUser.id
          ) {
            return true;
          } else {
            return false;
          }
        });
        if (results.length == 1) {
          const doc = results[0];
          const docId = doc.id;
          const whichRelation =
            tempUser.id === doc.data().user1 ? 'relation1' : 'relation2';
          relations
            .doc(docId)
            .update({
              [whichRelation]: relation,
            })
            .then(() => console.log('Updated'));
        } else {
          if (results.length > 0) {
            console.log(
              'Database error: more than two documents exist between two users in one direction!',
            );
          } else {
            relations
              .add({
                user1: tempUser.id,
                relation1: relation,
                user2: targetUser.id,
                relation2: Relation.initial,
              })
              .then(() => console.log('Added'));
          }
        }
      });
    if (currentIndex + 1 < targetUsers.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  return (
    <CustomTabnav navigation={navigation} route={route}>
      {targetUsers
        .slice(currentIndex, currentIndex + 2)
        .reverse()
        .map((user, key) => {
          if (key === 1) {
            return (
              <Animated.View
                key={key}
                style={{
                  ...styles.animated_view,
                  transform: [
                    {
                      translateX: pan.x,
                    },
                    {
                      translateY: pan.y,
                    },
                    {
                      rotateZ: pan.x.interpolate({
                        inputRange: [-200, 0, 200],
                        outputRange:
                          direction === 1
                            ? ['-10deg', '0deg', '10deg']
                            : ['10deg', '0deg', '-10deg'],
                      }),
                    },
                  ],
                }}
                {...panResponder.panHandlers}
              >
                <ImageBackground
                  source={{
                    uri: user.avatar,
                  }}
                  style={styles.imagebackground}
                  imageStyle={styles.image}
                >
                  <CustomStamp
                    text={'like'}
                    style={{
                      ...styles.like_stamp,
                      opacity: pan.x.interpolate({
                        inputRange: [-200, 0, 200],
                        outputRange: [0, 0, 3],
                      }),
                    }}
                    text_style={styles.like_text}
                  />
                  <CustomStamp
                    text={'dislike'}
                    style={{
                      ...styles.dislike_stamp,
                      opacity: pan.x.interpolate({
                        inputRange: [-200, 0, 200],
                        outputRange: [3, 0, 0],
                      }),
                    }}
                    text_style={styles.dislike_text}
                  />

                  <CustomStamp
                    text={'favorite'}
                    style={{
                      ...styles.favorite_stamp,
                      opacity: pan.y.interpolate({
                        inputRange: [-200, 0, 200],
                        outputRange: [3, 0, 3],
                      }),
                    }}
                    text_style={styles.favorite_text}
                  />

                  <View bottom style={styles.container}>
                    <View style={styles.desc}>
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
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </Animated.View>
            );
          } else if (key === 0) {
            return (
              <Animated.View
                key={key}
                style={{
                  ...styles.animated_view,
                  transform: [
                    {
                      scaleX: pan.x.interpolate({
                        inputRange: [-500, -200, 0, 200, 500],
                        outputRange: [1, 1, 0.9, 1, 1],
                      }),
                    },
                    {
                      scaleY: pan.x.interpolate({
                        inputRange: [-500, -200, 0, 200, 500],
                        outputRange: [1, 1, 0.9, 1, 1],
                      }),
                    },
                  ],
                }}
                {...panResponder.panHandlers}
              >
                <ImageBackground
                  source={{
                    uri: user.avatar,
                  }}
                  style={styles.imagebackground}
                  imageStyle={styles.image}
                >
                  <View bottom style={styles.container}>
                    <View style={styles.desc}>
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
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </Animated.View>
            );
          }
        })}
      <IconButton
        icon="undo"
        color={Colors.white}
        style={styles.return}
        size={15}
        onPress={handleRelation(Relation.like)}
      />
      <IconButton
        icon="times"
        color={Colors.white}
        style={styles.dislike}
        size={20}
        onPress={handleRelation(Relation.dislike)}
      />
      <IconButton
        icon="star"
        color={Colors.white}
        style={styles.favorite}
        size={15}
        onPress={handleRelation(Relation.favorite)}
      />
      <IconButton
        icon="heart"
        color={Colors.white}
        style={styles.like}
        size={20}
        onPress={handleRelation(Relation.like)}
      />
      <IconButton
        icon="bolt"
        color={Colors.white}
        style={styles.boost}
        size={15}
        onPress={handleRelation(Relation.like)}
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
    height: height * 0.45,
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
  animated_view: {
    position: 'absolute',
  },
  box: {
    height: 250,
    width: 150,
    borderRadius: 5,
  },
  alt_box: {
    height: 250,
    width: 150,
    borderRadius: 5,
  },
  nope: {
    color: 'white',
    size: 10,
  },
  like_stamp: {
    borderColor: Colors.like,
    position: 'absolute',
    top: width * 0.2,
    left: width * 0.2,
    padding: 5,
    transform: [
      {
        rotateZ: '-20deg',
      },
    ],
  },
  like_text: {
    fontSize: 30,
    color: Colors.like,
    fontWeight: 'bold',
  },
  dislike_stamp: {
    borderColor: Colors.dislike,
    position: 'absolute',
    top: width * 0.2,
    right: width * 0.1,
    padding: 5,
    transform: [
      {
        rotateZ: '20deg',
      },
    ],
  },
  dislike_text: {
    fontSize: 30,
    color: Colors.dislike,
    fontWeight: 'bold',
  },
  favorite_stamp: {
    borderColor: Colors.favorite,
    position: 'absolute',
    bottom: height * 0.5,
    left: width * 0.3,
    padding: 5,
    zIndex: 2,
  },
  favorite_text: {
    fontSize: 30,
    color: Colors.favorite,
    fontWeight: 'bold',
  },
});

export default UserShopSearch;
