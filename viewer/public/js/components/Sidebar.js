import React, { Component } from 'react';
import SidebarHeader from './SidebarHeader';
import SlackChannels from './SlackChannels';

export default class extends Component {
  render() {
    return (
      <div className="sidebar">
        <SidebarHeader />
        <SlackChannels />
      </div>
    );
  }
}
