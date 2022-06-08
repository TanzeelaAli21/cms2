import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { store } from './store';
import Alertify from './components/alertify';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Alertify />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

