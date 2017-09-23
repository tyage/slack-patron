import React from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router';
import _ from 'lodash';
import SlackChannel from './SlackChannel';

const SlackChannels = ({ channels, ims }) => {
  const createChannelList = (channels) => _.map(channels, (channel) => (
      <li key={channel.id}>
        <SlackChannel channel={channel} />
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
