import React from 'react';
import $ from 'jquery';
import SlackApp from './slack-app.js';

$(() => {
  React.render(<SlackApp />, $('#app').get(0));
});
