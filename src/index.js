import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './redux/store/configureStore';

import Routes from './routes';
import './index.css';
import 'foundation-sites/css/foundation.min.css';
import 'foundation-sites/css/normalize.min.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
