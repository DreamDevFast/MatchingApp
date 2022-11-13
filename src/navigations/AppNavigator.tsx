import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ConfirmCode, FirstScreen, Login, Register} from '../screens';
// import Login from '../screens/auth/Login';
// import FirstScreen from '../screens/First';
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
        {/* <Stack.Screen name="Home" component={FirstScreen} /> */}
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="Register" component={Register} /> */}
        <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
