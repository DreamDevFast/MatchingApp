import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FirstScreen from '../screens/First';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'card',
        }}
      >
        <Stack.Screen name="Home" component={FirstScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
