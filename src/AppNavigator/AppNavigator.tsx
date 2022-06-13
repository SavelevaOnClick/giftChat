import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Chat} from '@screens';
import AuthStackNavigator from './stacks/AuthStackNavigator';
import {Icon, Image, TouchableOpacity, View} from '@components';
import {logout} from '../reducers/profile';
import {useAppDispatch, useAppSelector, useCallback} from '@hooks';
import styles from './styles';

const RootStack = createStackNavigator();

type TAppNavigatorProps = {};

const AppNavigator: React.FC<TAppNavigatorProps> = () => {
  const {token, user} = useAppSelector(state => state.profileSlice);
  const dispatch = useAppDispatch();

  const onPressLogout = useCallback(() => {
    dispatch(logout());
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        {token ? (
          <RootStack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerLeft: () => (
                <View style={styles.headerLeft}>
                  <Image
                    source={{
                      uri: user.userAvatar,
                    }}
                    style={styles.headerLeftImage}
                  />
                </View>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={onPressLogout}
                  style={styles.headerRight}>
                  <Icon name="exit" size={24} />
                </TouchableOpacity>
              ),
            }}
          />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
