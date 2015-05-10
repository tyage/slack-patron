import React from 'react';
import SlackChannels from './SlackChannels';
import SlackMessages from './SlackMessages';
import SlackActions from '../actions/SlackActions';

export default React.createClass({
  componentDidMount() {
    SlackActions.getUsers();
  },
  render() {
    return (
      <div className="slack-app">
        <SlackChannels />
        <SlackMessages />
      </div>
    );
  }
});
