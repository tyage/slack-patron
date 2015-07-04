import React from 'react';
import SidebarHeader from './SidebarHeader';
import SlackChannels from './SlackChannels';

export default React.createClass({
  render() {
    return (
      <div className="sidebar">
        <SidebarHeader />
        <SlackChannels />
      </div>
    );
  }
});
