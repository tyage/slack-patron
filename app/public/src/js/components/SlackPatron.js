import React from 'react';
import Sidebar from './Sidebar';
import SlackMessages from './SlackMessages';
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
        <SlackMessages />
      </div>
    );
  }
});
