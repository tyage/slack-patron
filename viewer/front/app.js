import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { createBrowserHistory } from 'history';
import { Route } from 'react-router';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';

import reducers from './reducers';
import SlackPatron from './components/SlackPatron';
import SlackActions from './actions/SlackActions';

import firebase from 'firebase/app';
import { firebaseConfig } from './constants/FirebaseConfig';

import 'normalize.css/normalize.css';
import './app.less';
import AuthActions from './actions/AuthActions';

firebase.initializeApp(firebaseConfig);

const history = createBrowserHistory({
  basename: document.getElementById('basename').getAttribute('href')
});
const middleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ ...reducers, router: connectRouter(history) }),
  composeEnhancers(
    applyMiddleware(middleware, thunkMiddleware),
  ),
);

// initialize data
store.dispatch(SlackActions.getUsers());
store.dispatch(SlackActions.getTeamInfo());
store.dispatch(SlackActions.getChannels());
store.dispatch(SlackActions.getIms());
store.dispatch(SlackActions.getEmojis());
firebase.auth().onAuthStateChanged((user) => {
  store.dispatch(AuthActions.changeAuthState(user));
});

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SlackPatron />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
