import { combineReducers } from 'redux';
import channels from './channels';
import searchWord from './searchWord';
import teamInfo from './teamInfo';
import users from './users';

const slackPatron = combineReducers({
  channels,
  searchWord,
  teamInfo,
  users
});

export default slackPatron;
