import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import { BrowserRouter } from 'react-router-dom'

import slackPatron from './reducers';
import SlackPatron from './components/SlackPatron';
import SlackActions from './actions/SlackActions';

const store = createStore(slackPatron, applyMiddleware(thunkMiddleware));

// initialize data
store.dispatch(SlackActions.getUsers());
store.dispatch(SlackActions.getTeamInfo());
store.dispatch(SlackActions.getChannels());
store.dispatch(SlackActions.getIms());

render(
  <Provider store={store}>
    <BrowserRouter>
      <SlackPatron />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
