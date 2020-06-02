import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './auth/SignInScreen';
import SignUpScreen from './auth/SignUpScreen';
import SplashScreen from './auth/SplashScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode='none'>
    <RootStack.Screen name='SplashScreen' component={SplashScreen} />
    <RootStack.Screen name='SignInScreen' component={SignInScreen} />
    <RootStack.Screen name='SignUpScreen' component={SignUpScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
