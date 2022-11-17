import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LogBox, StatusBar} from 'react-native';

import store from './src/redux/store';
import AppNavigator from './src/navigations/AppNavigator';

const App = () => {
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
