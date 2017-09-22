import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import slackPatron from './reducers';
import SlackPatron from './components/SlackPatron';
import SlackActions from './actions/SlackActions';

const store = createStore(slackPatron, applyMiddleware(thunkMiddleware));

// initialize data
store.dispatch(SlackActions.getUsers());
store.dispatch(SlackActions.getTeamInfo());

render(
  <Provider store={store}>
    <SlackPatron />
  </Provider>,
  document.getElementById('app')
);
