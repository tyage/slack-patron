import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import ChannelName from './ChannelName'

const ChannelMessagesHeader = ({ channels, ims, currentChannelId }) => {
  const allChannels = Object.assign({}, channels, ims);
  const channel = _.find(allChannels, (c) => c.id === currentChannelId);

  if (!channel) {
    return null;
  }

  return (
    <div className="messages-header">
      <div className="title">
        <ChannelName channel={channel} />
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

export default connect(mapStateToProps)(ChannelMessagesHeader);
