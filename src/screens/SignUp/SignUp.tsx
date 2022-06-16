import {ImageInput, MainButton, MainInput, Text, View} from '@components';
import React from 'react';
import {signUp} from '../../reducers/profile';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {useAppDispatch, useAppSelector, useCallback, useState} from '@hooks';

type TSignUpProps = {};

const SignUp: React.FC<TSignUpProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<string>('');
  const dispatch = useAppDispatch();

  const {isLoading, token, error} = useAppSelector(state => state.profileSlice);
  const onSignUp = useCallback(() => {
    dispatch(
      signUp({
        displayName: name,
        email,
        password,
        photoURL: image,
      }),
    );
  }, [name, password, email, image]);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {isLoading && token ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.descriptionLoader}>LOADING...</Text>
        </View>
      ) : null}

      <>
        <MainInput
          value={name}
          setValue={setName}
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
        <MainInput
          value={password}
          setValue={setPassword}
          containerStyle={styles.range}
          placeholder={'password'}
        />
        <ImageInput imageUri={image} setImageUri={setImage} />
      </>
      <View style={styles.buttonContainer}>
        <MainButton
          onPressHandler={onSignUp}
          title={'SignUp'}
          isLoading={isLoading}
        />
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorDescription}>{error}</Text>
        </View>
      ) : null}
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
