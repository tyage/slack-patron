import React from 'react';
import { connect } from 'react-redux'
import ChannelMessagesHeader from './ChannelMessagesHeader';
import MessagesList from './MessagesList';
import SlackActions from '../actions/SlackActions';

const ChannelMessagesSection = ({ loadMoreChannelMessages, match, loadChannelMessages }) => {
  const channel = match.params.channel;
  loadChannelMessages(channel);
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
      dispatch(SlackActions.getMoreMessages(channel, minTs));
    },
    loadChannelMessages: channel => {
      dispatch(SlackActions.getMessages(channel));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMessagesSection);
