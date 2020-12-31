import React, { Component } from 'react';
import { connect } from 'react-redux'
import SidebarHeader from './SidebarHeader';
import SlackChannels from './SlackChannels';
import firebase from 'firebase/app';

import './Sidebar.less';

const Sidebar = ({ isSidebarActive }) => {

  const handleSignOut = () => {
    firebase.auth().signOut();
  }

  return (
    <div className={`sidebar ${isSidebarActive ? "active" : ""}`}>
      <SidebarHeader />
      <button onClick={handleSignOut}> Sign Out </button>
      <SlackChannels />
    </div>
  )
};

const mapStateToProps = state => {
  return {
    isSidebarActive: state.isSidebarActive,
  };
};

export default connect(mapStateToProps)(Sidebar);