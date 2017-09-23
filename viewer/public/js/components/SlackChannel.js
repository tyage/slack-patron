import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import ChannelName from './ChannelName';

const SlackChannel = ({ channel }) => (
  <NavLink to={ `/${channel.id}` }>
    <ChannelName channel={channel} />
  </NavLink>
);

const mapStateToProps = state => {
  return {
    router: state.router
  }
};

export default connect(mapStateToProps)(SlackChannel);
