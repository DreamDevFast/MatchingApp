import React from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LogBox, StatusBar} from 'react-native';

const App = () => {
  return (
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
  );
};

export default App;
