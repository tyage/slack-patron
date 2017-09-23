import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router';
import ChannelName from './ChannelName';

const SlackChannels = ({ channels, ims }) => {
  const createChannelList = (channels) => Object.values(channels).map(channel => (
      <li key={channel.id}>
        <NavLink to={ `/${channel.id}` }>
          <ChannelName channel={channel} />
        </NavLink>
      </li>
    ));

  return (
    <div className="sidebar-body">
      <div className="slack-channels">
        <h3>CHANNELS({Object.keys(channels).length})</h3>
        <ul className="list">
          {createChannelList(channels)}
        </ul>
      </div>
      <div className="slack-ims">
        <h3>DIRECT MESSAGES({Object.keys(ims).length})</h3>
        <ul className="list">
          {createChannelList(ims)}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    channels: state.channels.channels,
    ims: state.channels.ims,
    router: state.router
  };
};

export default connect(mapStateToProps)(SlackChannels);
