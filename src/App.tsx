import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './AppNavigator/AppNavigator';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
