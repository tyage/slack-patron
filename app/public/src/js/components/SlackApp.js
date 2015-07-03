import React from 'react';
import SlackMenu from './SlackMenu';
import SlackMessages from './SlackMessages';
import SlackActions from '../actions/SlackActions';

export default React.createClass({
  componentDidMount() {
    SlackActions.getUsers();
  },
  render() {
    return (
      <div className="slack-app">
        <SlackMenu />
        <SlackMessages />
      </div>
    );
  }
});
