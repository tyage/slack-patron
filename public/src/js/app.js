import React from 'react';
import $ from 'jquery';
import SlackApp from './components/SlackApp';

$(() => {
  React.render(<SlackApp />, $('#app').get(0));
});
