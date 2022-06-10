import {configureStore, combineReducers} from '@reduxjs/toolkit';
import profileSlice from './reducers/profile';

const rootReducer = combineReducers({
  profileSlice,
});

const setupStore = configureStore({
  reducer: rootReducer,
});
export default setupStore;

export type RootSate = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof setupStore.dispatch;
