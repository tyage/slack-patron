import React from 'react';
import { connect } from 'react-redux'
import ChannelMessagesHeader from './ChannelMessagesHeader';
import MessagesList from './MessagesList';

const ChannelMessagesSection = ({ loadMoreChannelMessages, match }) => {
  const channel = match.params.channel;
  return (
    <div className="channel-messages">
      <ChannelMessagesHeader currentChannelId={ channel } />
      <MessagesList onLoadMoreMessages={loadMoreChannelMessages(channel)} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    router: state.router
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadMoreChannelMessages: channel => minTs => {
      SlackActions.getMoreMessages(channel, minTs);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMessagesSection);
