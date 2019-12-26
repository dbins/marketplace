import React from 'react';
import './config/ReactotronConfig';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

export default function Index() {
  console.disableYellowBox = true;	
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
