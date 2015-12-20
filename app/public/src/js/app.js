import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import SlackPatron from './components/SlackPatron';

$(() => {
  ReactDOM.render(<SlackPatron />, $('#app').get(0));
});
