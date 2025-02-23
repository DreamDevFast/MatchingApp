import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LogBox, StatusBar} from 'react-native';

import syncStorage from 'sync-storage';

import firestore from '@react-native-firebase/firestore';

import {
  setAuthenticated,
  setLoading,
  setTempUser,
} from './src/redux/features/globalSlice';

import store from './src/redux/store';
import AppNavigator from './src/navigations/AppNavigator';

const App = () => {
  const users = firestore().collection('Users');

  useEffect(() => {
    new Promise(resolve => {
      resolve(1);
    }).then(async () => {
      await syncStorage.init();
      const token = syncStorage.get('token');
      console.log('storage token', token);
      let regForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      let regForMobile = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (regForEmail.test(token) === true) {
        users
          .where('email', '==', token)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size === 1) {
              console.log(querySnapshot.docs[0].data());
              let {
                address,
                birthday,
                email,
                name,
                mobile,
                prefecture,
                role,
                avatar,
              } = querySnapshot.docs[0].data();

              birthday = new Date(birthday.seconds * 1000).toString();
              store.dispatch(
                setTempUser({
                  id: querySnapshot.docs[0].id,
                  address,
                  birthday,
                  email,
                  name,
                  mobile,
                  prefecture,
                  role,
                  avatar,
                }),
              );
              store.dispatch(setAuthenticated(true));
            }
          });
      } else if (regForMobile.test(token) === true) {
        users
          .where('mobile', '==', token)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size === 1) {
              console.log(querySnapshot.docs[0].data());
              let {
                address,
                birthday,
                email,
                name,
                mobile,
                prefecture,
                role,
                avatar,
              } = querySnapshot.docs[0].data();

              birthday = new Date(birthday.seconds * 1000).toString();
              store.dispatch(
                setTempUser({
                  id: querySnapshot.docs[0].id,
                  address,
                  birthday,
                  email,
                  name,
                  mobile,
                  prefecture,
                  role,
                  avatar,
                }),
              );
              store.dispatch(setAuthenticated(true));
            }
          });
      }
      console.log('set false');
      store.dispatch(setLoading(false));
    });
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider
        settings={{
          icon: props => <FontAwesome5 {...props} />,
        }}
      >
        <SafeAreaProvider>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={'dark-content'}
          />
          <AppNavigator />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
