import {createStackNavigator} from '@react-navigation/stack';
import {SignIn, SignUp} from '@screens';
import React from 'react';

const AuthStack = createStackNavigator();

type TAuthStackNavigatorProps = {};

const AuthStackNavigator: React.FC<TAuthStackNavigatorProps> = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
