import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import reducers from './reducers';
import SlackPatron from './components/SlackPatron';
import SlackActions from './actions/SlackActions';

import 'normalize.css/normalize.css';
import './app.less';

const history = createHistory({
  basename: document.getElementById('basename').getAttribute('href')
});
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({ ...reducers, router: routerReducer }),
  applyMiddleware(middleware, thunkMiddleware)
);

// initialize data
store.dispatch(SlackActions.getUsers());
store.dispatch(SlackActions.getTeamInfo());
store.dispatch(SlackActions.getChannels());
store.dispatch(SlackActions.getIms());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SlackPatron />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
