import React from 'react';
import $ from 'jquery';
import SlackApp from './components/slack-app.js';

$(() => {
  React.render(<SlackApp />, $('#app').get(0));
});
