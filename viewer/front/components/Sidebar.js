import React, { Component } from 'react';
import SidebarHeader from './SidebarHeader';
import SlackChannels from './SlackChannels';

import './Sidebar.less';

export default () => (
  <div className="sidebar">
    <SidebarHeader />
    <SlackChannels />
  </div>
);
