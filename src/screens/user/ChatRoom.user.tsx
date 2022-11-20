import React, {useState} from 'react';
import {Appbar, TextInput} from 'react-native-paper';
import {StyleSheet, Dimensions} from 'react-native';
import {View, Spacings, Avatar, Text} from 'react-native-ui-lib';
import InfiniteScroll from 'react-native-infinite-scroll';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Container} from '../../components';
import {Colors} from '../../styles';

const {width, height} = Dimensions.get('window');

const UserChatRoom = ({route, navigation}: any) => {
  const {id, name, avatar} = route.params;
  const [message, setMessage] = useState<string>('');

  const sendMessage = () => {
    // TODO
    console.log('send message');
  };
  return (
    <Container>
      {/* <Loader isLoading={loading} /> */}
      <Appbar.Header
        style={{backgroundColor: 'transparent'}}
        statusBarHeight={20}
      >
        <Appbar.Action
          icon={'chevron-left'}
          onPress={() => navigation.navigate('UserChat')}
          color={Colors.white}
        />
        <Appbar.Content
          title={
            <View row centerV>
              <View>
                <Avatar
                  size={40}
                  source={{
                    uri: avatar,
                  }}
                  label={'IMG'}
                  imageStyle={styles.avatar}
                />
              </View>
              <View>
                <Text
                  color={Colors.white}
                  style={{marginLeft: 10, fontSize: 20}}
                >
                  {name}
                </Text>
              </View>
            </View>
          }
          color={Colors.white}
        />
      </Appbar.Header>
      {/* <InfiniteScroll
                horizontal={false}
                onLoadMoreAsync={getMessage}
                distanceFromEnd={10}
                style={{ transform: [{ scaleY: -1 }] }}
            >
                {
                    !(typeof messages !== 'undefined' && messages.length > 0) && (
                        <View center style={{ height: '100%', transform: [{ scaleY: -1 }], marginBottom: height/1.8 }}>
                            <MaterialCommunityIcons name={'message-text-clock-outline'} size={80} color={Colors.grey30}/>
                            <Text center margin-s1 text70> {t['title']['no_data']} </Text>
                        </View>
                    )
                }
                {
                    messages.sort((a,b) => b.id-a.id).map((message, index) => {
                        return message.sender_id === user.id ? (
                            <View key={index} flex right style={{ transform: [{ scaleY: -1 }] }}>
                                <View style={styles.sendMessage}>
                                    <Text color={Colors.white}>
                                        {message.message}
                                    </Text>
                                    <View row marginT-s3>
                                        <Ionicons name={message.read ? 'ios-checkmark-done-sharp' : 'time'} size={18} color={Colors.white} />
                                        <Text marginL-s2 color={Colors.white}>{moment(message.created_at).format('YYYY-MM-DD kk:mm:ss')}</Text>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <View key={index} flex left style={{ transform: [{ scaleY: -1 }] }}>
                                <View style={styles.receiveMessage}>
                                    <Text>
                                        {message.message}
                                    </Text>
                                    <View row marginT-s3>
                                        <Ionicons name={message.read ? 'ios-checkmark-done-sharp' : 'time'} size={18} color={Colors.cyan30} />
                                        <Text marginL-s2>{moment(message.created_at).format('YYYY-MM-DD kk:mm:ss')}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </InfiniteScroll> */}
      <View row centerV centerH style={styles.part} marginB-10 marginT-10>
        <EvilIcons name="camera" size={40} style={styles.camera} />
        <View row centerV centerH style={styles.subpart}>
          <TextInput
            mode="outlined"
            style={styles.input}
            selectionColor={Colors.white}
            outlineColor={'transparent'}
            activeOutlineColor={'transparent'}
            theme={{colors: {text: Colors.dark}}}
            value={message}
            onChangeText={value => setMessage(value)}
          />
          <EvilIcons name="image" size={40} />
          <EvilIcons name="sc-telegram" size={40} />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: Colors.white,
  },
  sendMessage: {
    margin: Spacings.s2,
    padding: Spacings.s5,
    paddingVertical: Spacings.s2,
    width: width * 0.6,
    backgroundColor: Colors.cyan20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 0,
  },
  receiveMessage: {
    margin: Spacings.s2,
    paddingLeft: 30,
    paddingVertical: Spacings.s2,
    width: width * 0.6,
    backgroundColor: Colors.grey60,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 35,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 35,
  },
  input: {
    height: 30,
    backgroundColor: 'transparent',
    width: '70%',
  },
  part: {
    backgroundColor: 'transparent',
    borderRadius: 30,
    position: 'absolute',
    right: 0,
    bottom: 30,
    width,
  },
  subpart: {
    width: '80%',
    borderColor: Colors.iconLabel,
    borderWidth: 2,
    borderRadius: 30,
  },
  avatar: {
    borderColor: Colors.white,
    borderWidth: 2,
  },
  camera: {
    // borderColor: Colors.white,
    // borderWidth: 1,
    // borderRadius: 30,
    // padding: 10,
  },
});

export default UserChatRoom;
