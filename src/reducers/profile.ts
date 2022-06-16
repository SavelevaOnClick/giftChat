import {ReactNativeFirebase} from '@react-native-firebase/app';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {firebaseErrors} from '@types';
import {Auth} from '../services/firebase';

export interface ProfileState {
  user: null | any;
  isLoading: boolean;
  token: string | null;
  error: null | string;
}
export type TUserData = {
  email: string | null;
  userAvatar: string | null;
  userName: string | null;
  userEmail: string;
};

const initialState: ProfileState = {
  user: null,
  isLoading: false,
  token: null,
  error: null,
};
export const signIn = createAsyncThunk<
  unknown,
  {email: string; password: string}
>('profile/signIn', async ({email, password}, thunkAPI) => {
  try {
    const {user}: FirebaseAuthTypes.UserCredential = await Auth.signIn({
      email,
      password,
    });
    const token = await Auth.getToken();
    return {
      token,
      data: {
        userAvatar: user.photoURL,
        userName: user.displayName,
        userEmail: user.email,
      },
    };
  } catch (e) {
    const error = e as ReactNativeFirebase.NativeFirebaseError;
    if (error.code === firebaseErrors.EMAIL_IN_USE) {
      return thunkAPI.rejectWithValue('That email address is already in use!');
    }

    if (error.code === firebaseErrors.INVALIDE_EMALE) {
      return thunkAPI.rejectWithValue('That email address is invalid!');
    }
    return thunkAPI.rejectWithValue('user not founded');
  }
});

export const signUp = createAsyncThunk<
  unknown,
  {email: string; password: string; displayName: string; photoURL?: string}
>(
  'profile/signUp',
  async ({email, password, displayName, photoURL}, thunkAPI) => {
    try {
      await Auth.signUp({
        email,
        password,
        displayName,
        photoURL,
      });

      thunkAPI.dispatch(signIn({email, password}));
    } catch (e) {
      const error = e as ReactNativeFirebase.NativeFirebaseError;
      if (error.code === firebaseErrors.EMAIL_IN_USE) {
        return thunkAPI.rejectWithValue(
          'That email address is already in use!',
        );
      }

      if (error.code === firebaseErrors.INVALIDE_EMALE) {
        return thunkAPI.rejectWithValue('That email address is invalid!');
      }
      return thunkAPI.rejectWithValue('something wrong');
    } finally {
    }
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.token = action.payload.uid;
    },
    setLoading: state => {
      state.isLoading = !state.isLoading;
    },
    logout: state => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: {
    [signIn.pending.type]: state => {
      state.isLoading = !state.isLoading;
    },
    [signIn.fulfilled.type]: (
      state,
      action: PayloadAction<{token: string; data: TUserData}>,
    ) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
      state.error = null;
      state.isLoading = !state.isLoading;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = !state.isLoading;
    },
    [signUp.pending.type]: state => {
      state.isLoading = !state.isLoading;
    },
    [signUp.fulfilled.type]: state => {
      state.isLoading = !state.isLoading;
      state.error = null;
    },
    [signUp.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = !state.isLoading;
    },
  },
});

export const {setUser, setLoading, logout} = profileSlice.actions;

export default profileSlice.reducer;
