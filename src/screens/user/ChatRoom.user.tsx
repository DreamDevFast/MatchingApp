import React, {useState, useCallback, useEffect} from 'react';
import {Appbar, TextInput} from 'react-native-paper';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import {View, Spacings, Avatar, Text} from 'react-native-ui-lib';
// import InfiniteScroll from 'react-native-infinite-scroll';
// import moment from 'moment';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  GiftedChat,
  IMessage,
  SendProps,
  Send,
  InputToolbar,
  InputToolbarProps,
  ActionsProps,
} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';

import {Container} from '../../components';
import {Colors} from '../../styles';
import CustomActions from '../../components/CustomActions';
import {getTimeMeasureUtils} from '@reduxjs/toolkit/dist/utils';

const {width, height} = Dimensions.get('window');

var _isMounted = false;

export default function UserChatRoom({route, navigation}: any) {
  const tempUser = useAppSelector((state: any) => state.global.tempUser);

  const [messages, setMessages] = useState<any>([]);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState<boolean>(false);
  const [loadEarlier, setEarlier] = useState<boolean>(true);

  const {id, name, avatar} = route.params;
  const chatmessages = firestore().collection('ChatMessages');

  useEffect(() => {
    _isMounted = true;
    setMessages([
      {
        _id: 3,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);

    return () => {
      _isMounted = false;
    };
  }, []);

  const renderSend = (props: SendProps<IMessage>) => (
    <Send {...props} label={'dddd'} containerStyle={styles.send}>
      <EvilIcons size={30} color={Colors.iconLabel} name={'sc-telegram'} />
    </Send>
  );
  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputtoolbar_container}
        primaryStyle={styles.inputtoolbar_primary}
        renderActions={(props: ActionsProps) => {
          return <CustomActions {...props} />;
        }}
      />
    );
  };
  // const renderCustomActions = props =>
  //     <CustomActions {...props} onSend={() => {}} />
  //   )

  const onSend = useCallback((messages: Array<any> = []) => {
    setMessages((previousMessages: Array<any>) => {
      const msgs = GiftedChat.append(previousMessages, messages);
      return msgs;
    });
  }, []);

  const onLoadEarlier = () => {
    console.log('load earlier');
    setIsLoadingEarlier(true);

    setTimeout(() => {
      console.log(_isMounted);
      if (_isMounted === true) {
        setMessages((previousMessages: Array<any>) => {
          const msgs = GiftedChat.prepend(previousMessages, [
            {
              _id: 22,
              text: 'Hello developer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ] as IMessage[]);
          return msgs;
        });
        setIsLoadingEarlier(false);
        console.log('finished');
      }
    }, 1500); // simulating network
  };

  return (
    <Container>
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
      <View style={styles.container}>
        <GiftedChat
          alwaysShowSend={true}
          messages={messages}
          loadEarlier={loadEarlier}
          isLoadingEarlier={isLoadingEarlier}
          renderSend={renderSend}
          onSend={messages => onSend(messages)}
          onLoadEarlier={onLoadEarlier}
          renderInputToolbar={renderInputToolbar}
          user={{
            _id: tempUser.id,
          }}
          infiniteScroll
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  send: {
    justifyContent: 'center',
  },
  sendbox: {
    borderRadius: 20,
    borderColor: '#ff0000',
  },
  inputtoolbar_container: {
    // borderColor: '#ff0000',
    borderTopColor: 'transparent',
    backgroundColor: Colors.white,
    alignItems: 'center',
    // borderWidth: 1,
    paddingVertical: 5,
    // width: width * 0.8,
    // borderRadius: 10,
  },
  inputtoolbar_primary: {
    borderColor: Colors.iconLabel,
    backgroundColor: Colors.white,
    borderWidth: 1,
    width: width * 0.8,
    borderRadius: 10,
  },
  avatar: {
    borderColor: Colors.white,
    borderWidth: 2,
  },
});
