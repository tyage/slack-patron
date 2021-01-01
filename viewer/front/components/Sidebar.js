import React, { Component } from 'react';
import { connect } from 'react-redux'
import SidebarHeader from './SidebarHeader';
import SlackChannels from './SlackChannels';

import './Sidebar.less';

const Sidebar = ({ isSidebarActive }) => (
  <div className={`sidebar ${isSidebarActive ? "active" : ""}`}>
    <SidebarHeader />
    <SlackChannels />
  </div>
);

const mapStateToProps = state => {
  return {
    isSidebarActive: state.isSidebarActive,
  };
};

export default connect(mapStateToProps)(Sidebar);