import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { persistReducer } from 'redux-persist';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

// Reducers
import CountriesReducer from './countries/CountriesReducer';
import CountryReducer from './countries/country/CountryReducer';

export const history = createBrowserHistory();


export const store = createStore(
  combineReducers({
      CountriesReducer,
      CountryReducer,
  }),
  composeWithDevTools(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
  ),
);
