import React from 'react';
import { NavLink } from 'react-router-dom';
import ChannelName from './ChannelName';

const SlackChannel = ({ channel }) => (
  <NavLink to={ `/${channel.id}` } activeClassName="selected">
    <ChannelName channel={channel} />
  </NavLink>
);

export default SlackChannel;
