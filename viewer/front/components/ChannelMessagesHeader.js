import React from 'react';
import { connect } from 'react-redux'
import find from 'lodash/find';
import ChannelName from './ChannelName'
import SlackActions from '../actions/SlackActions';

const ChannelMessagesHeader = ({ channels, ims, currentChannelId, openSidebar }) => {
  const allChannels = Object.assign({}, channels, ims);
  const channel = find(allChannels, (c) => c.id === currentChannelId);

  if (!channel) {
    return null;
  }

  const handleToggleSidebar = (event) => {
    event.stopPropagation();
    openSidebar();
  };

  return (
    <div className="messages-header">
      <div className="toggle-sidebar" onClick={handleToggleSidebar}>
        <div className="bar"/>
        <div className="bar"/>
        <div className="bar"/>
      </div>
      <div className="title">
        <ChannelName channel={channel} />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    openSidebar: () => {
      dispatch(SlackActions.openSidebar());
    },
  };
};

const mapStateToProps = state => {
  return {
    channels: state.channels.channels,
    ims: state.channels.ims,
    router: state.router
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMessagesHeader);
