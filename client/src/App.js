import React, { Component } from 'react';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import './App.css';
import {Provider} from 'react-redux';
import configureStore from './store';

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <p>Hello world....</p>
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;
