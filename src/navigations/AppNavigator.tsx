import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ConfirmCode,
  FirstScreen,
  Login,
  Register,
  NameInput,
  BirthdayInput,
  LocationInput,
  UserDashBoard,
  UserSetting,
  UserShopSearch,
  UserProfile,
  UserShopDetail,
  UserChat,
  UserChatRoom,
  PhoneVerification,
} from '../screens';
import AnimationTest from '../screens/AnimationTest';

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
        {/* <Stack.Screen
          name="PhoneVerificationSample"
          component={PhoneVerification}
        /> */}
        <Stack.Screen name="AnimationTest" component={AnimationTest} />
        <Stack.Screen name="Home" component={FirstScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
        <Stack.Screen name="NameInput" component={NameInput} />
        <Stack.Screen name="BirthdayInput" component={BirthdayInput} />
        <Stack.Screen name="LocationInput" component={LocationInput} />
        <Stack.Screen name="UserDashBoard" component={UserDashBoard} />
        <Stack.Screen name="UserSetting" component={UserSetting} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="UserShopSearch" component={UserShopSearch} />
        <Stack.Screen name="UserShopDetail" component={UserShopDetail} />
        <Stack.Screen name="UserChat" component={UserChat} />
        <Stack.Screen name="UserChatRoom" component={UserChatRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
