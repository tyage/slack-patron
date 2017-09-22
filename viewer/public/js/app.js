import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import slackPatron from './reducers';
import SlackPatron from './components/SlackPatron';

const store = createStore(slackPatron);

render(
  <Provider store={store}>
    <SlackPatron />
  </Provider>,
  document.getElementById('app')
);
