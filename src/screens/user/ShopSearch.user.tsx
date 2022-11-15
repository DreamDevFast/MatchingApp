import React, {useState} from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTabnav from '../../components/CustomTabnav';
import {Colors} from '../../styles';

const {width, height} = Dimensions.get('window');

const UserShopSearch = ({navigation, route}: any) => {
  const [state, setState] = useState<
    'like' | 'dislike' | 'favorite' | 'initial'
  >('initial');
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
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('UserShopDetail');
          }}
        >
          <>
            <ImageBackground
              source={{
                uri:
                  'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
              }}
              style={styles.image}
            >
              <View style={{...styles.container, ...getBackgroundColor()}}>
                {state === 'like' ? (
                  <Entypo
                    name="heart"
                    color={Colors.white}
                    size={width * 0.5}
                    style={styles.reaction_icon}
                  />
                ) : state === 'dislike' ? (
                  <Entypo
                    name="cross"
                    color={Colors.white}
                    size={width * 0.5}
                    style={styles.reaction_icon}
                  />
                ) : (
                  <></>
                )}
                <View bottom paddingB-100 marginH-40 style={styles.desc}>
                  <Text style={styles.title}>Mermaid</Text>
                  <Text>
                    ようこそ！ざっぶーん！ ここは海の中のメイドカフェ＆バー
                    ご来店される王子様方がキュートでセクシーなマーメイドちゃんたちに癒され、
                    陸のセカイでの活力になればと願い、
                    この度新規オープンさせて頂きました★
                  </Text>
                  <Divider style={styles.divider} />
                  <View row marginB-10>
                    <SimpleLineIcons
                      name="location-pin"
                      size={20}
                      color={Colors.iconLabel}
                    />
                    <Text style={styles.label}>池袋</Text>
                  </View>
                  <View row marginB-10>
                    <MaterialCommunityIcons
                      name="piggy-bank-outline"
                      size={20}
                      color={Colors.iconLabel}
                    />
                    <Text style={styles.label}>1,500円〜</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
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
          </>
        </TouchableHighlight>
        <View>
          <ImageBackground
            source={{
              uri:
                'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
            }}
            style={styles.image}
          >
            <View style={styles.container}>
              <View bottom paddingB-100 marginH-40 style={styles.desc}>
                <Text style={styles.title}>Mermaid</Text>
                <Text>
                  ようこそ！ざっぶーん！ ここは海の中のメイドカフェ＆バー
                  ご来店される王子様方がキュートでセクシーなマーメイドちゃんたちに癒され、
                  陸のセカイでの活力になればと願い、
                  この度新規オープンさせて頂きました★
                </Text>
                <Divider style={styles.divider} />
                <View row marginB-10>
                  <SimpleLineIcons
                    name="location-pin"
                    size={20}
                    color={Colors.iconLabel}
                  />
                  <Text style={styles.label}>池袋</Text>
                </View>
                <View row marginB-10>
                  <MaterialCommunityIcons
                    name="piggy-bank-outline"
                    size={20}
                    color={Colors.iconLabel}
                  />
                  <Text style={styles.label}>1,500円〜</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
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
            onPress={() => console.log('Pressed')}
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
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            icon="bolt"
            color={Colors.white}
            style={styles.boost}
            size={15}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </ScrollView>
    </CustomTabnav>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height * 0.88,
  },
  container: {
    height: '100%',
    width: '100%',
  },
  desc: {
    height: '100%',
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
