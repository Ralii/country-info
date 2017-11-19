import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import './index.css';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
// Reducers
import CountriesReducer from './countries/CountriesReducer';
import CountryReducer from './countries/country/CountryReducer';

import App from './App';

const history = createBrowserHistory();


const rootReducer = persistReducer(
  { key: 'primary', storage},
  combineReducers({
    CountriesReducer,
    CountryReducer,
  }),
);

export const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(history)),
  ),
);

persistStore(store);

ReactDOM.render(
  <Provider store={store}>
      <App history={history} />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
