import React from 'react';
import SlackMenuHeader from './SlackMenuHeader';
import SlackChannels from './SlackChannels';

export default React.createClass({
  render() {
    return (
      <div className="slack-menu">
        <SlackMenuHeader />
        <SlackChannels />
      </div>
    );
  }
});
