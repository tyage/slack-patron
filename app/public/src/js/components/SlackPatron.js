import React from 'react';
import Sidebar from './Sidebar';
import Messages from './Messages';
import SearchForm from './SearchForm';
import SlackActions from '../actions/SlackActions';

export default React.createClass({
  componentDidMount() {
    SlackActions.getUsers();
    SlackActions.getTeamInfo();
  },
  render() {
    return (
      <div className="slack-patron">
        <Sidebar />
        <Messages />
        <SearchForm />
      </div>
    );
  }
});
