import React from 'react';
import ChannelMessages from './ChannelMessages';
import SlackActions from '../actions/SlackActions';

export default React.createClass({
  componentDidMount() {
  },
  render() {
    return (
      <div className="messages">
        <ChannelMessages />
      </div>
    );
  }
});
