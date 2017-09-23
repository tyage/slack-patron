import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import ChannelName from './ChannelName';

const mapStateToProps = state => {
  return {
    router: state.router
  }
};

const SlackChannel = ({ channel }) => (
  <NavLink to={ `/${channel.id}` }>
    <ChannelName channel={channel} />
  </NavLink>
);

export default connect(mapStateToProps)(SlackChannel);
