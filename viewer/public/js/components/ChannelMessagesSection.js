import React from 'react';
import { connect } from 'react-redux'
import ChannelMessagesHeader from './ChannelMessagesHeader';

const ChannelMessagesSection = ({ channel, loadMoreChannelMessages }) => (
  <div className="channel-messages">
    <ChannelMessagesHeader />
    <MessagesList onLoadMoreMessages={loadMoreChannelMessages(channel)} />
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    loadMoreChannelMessages: channel => minTs => {
      SlackActions.getMoreMessages(channel, minTs);
    }
  };
};

export default connect(null, mapDispatchToProps)(ChannelMessagesSection);
