import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Chat} from '@screens';
import {RootSate} from '../store';
import {connect} from 'react-redux';
import AuthStackNavigator from './stacks/AuthStackNavigator';

const RootStack = createStackNavigator();

type TAppNavigatorProps = {
  token: string;
};

const AppNavigator: React.FC<TAppNavigatorProps> = ({token}) => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <RootStack.Screen name="Chat" component={Chat} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: RootSate) => ({
  token: state.profileSlice.token,
});
export default connect(mapStateToProps, null)(AppNavigator);
