import React from 'react';
import $ from 'jquery';
import SlackPatron from './components/SlackPatron';

$(() => {
  React.render(<SlackPatron />, $('#app').get(0));
});
