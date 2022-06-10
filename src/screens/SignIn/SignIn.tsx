import {MainButton, MainInput, Text, View} from '@components';
import {useAppDispatch, useAppSelector, useState} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useCallback} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {signIn} from '../../reducers/profile';
import styles from './styles';

type TSignInProps = {};

const SignIn: React.FC<TSignInProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const {isLoading, error} = useAppSelector(state => state.profileSlice);

  const navigation = useNavigation();

  const onPressSignIn = useCallback(() => {
    dispatch(
      signIn({
        email,
        password,
      }),
    );
    setEmail('');
    setPassword('');
  }, [email, password]);

  const onPressLink = useCallback(
    (key: string) => () => {
      navigation.navigate(key);
    },
    [],
  );

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <MainInput
        value={password}
        setValue={setPassword}
        containerStyle={styles.range}
        placeholder={'name'}
      />
      <MainInput
        value={email}
        setValue={setEmail}
        keyboardType="email-address"
        containerStyle={styles.range}
        placeholder={'e-mail'}
      />
      <View style={styles.buttonContainer}>
        <MainButton
          onPressHandler={onPressSignIn}
          title={'SignIn'}
          isLoading={isLoading}
        />
        <MainButton onPressHandler={onPressLink('SignUp')} title={'SignUp'} />
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorDescription}>{error}</Text>
        </View>
      ) : null}
    </KeyboardAwareScrollView>
  );
};
export default SignIn;
