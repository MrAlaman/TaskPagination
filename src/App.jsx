import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Component from './Component';
import logo from './logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <Provider store={store}>
      <Component />
    </Provider>
  </div>
);

export default App;
