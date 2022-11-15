import React, {useState} from 'react';
import {Appbar, TextInput} from 'react-native-paper';
import {StyleSheet, Dimensions} from 'react-native';
import {View, Spacings, Avatar, Text} from 'react-native-ui-lib';
import InfiniteScroll from 'react-native-infinite-scroll';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Container} from '../../components';
import {Colors} from '../../styles';

const {width, height} = Dimensions.get('window');

const UserChatRoom = ({navigation}: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = () => {
    // TODO
    console.log('send message');
  };
  return (
    <Container>
      {/* <Loader isLoading={loading} /> */}
      <Appbar.Header
        style={{backgroundColor: Colors.back}}
        statusBarHeight={20}
      >
        <Appbar.Action
          icon={'chevron-left'}
          onPress={() => navigation.navigate('UserChat')}
          color={Colors.redBtn}
        />
        <Appbar.Content
          title={
            <View row>
              <Avatar
                size={40}
                source={{
                  uri:
                    'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                }}
                label={'IMG'}
              />
              <View>
                <Text color={Colors.redBtn} style={{marginLeft: 10}}>
                  Parmela Ramirez
                </Text>
                <Text color={Colors.iconLabel} style={{marginLeft: 10}}>
                  3 sec ago
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
      <View style={styles.input_box} centerH>
        <TextInput
          placeholder="enter message"
          right={
            <TextInput.Icon
              name="heart"
              onPress={sendMessage}
              color={Colors.redBtn}
              size={20}
              style={{paddingTop: 5}}
            />
          }
          mode={'outlined'}
          selectionColor={Colors.redBtn}
          activeOutlineColor={'transparent'}
          outlineColor={'transparent'}
          style={styles.input}
          onKeyPress={e => {}}
          value={''}
          onChangeText={value => {}}
        />
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
    width: width * 0.9,
    backgroundColor: Colors.white,
    fontSize: 20,
    height: 40,
  },
  input_box: {
    position: 'absolute',
    right: 0,
    bottom: 30,
    width,
  },
});

export default UserChatRoom;
