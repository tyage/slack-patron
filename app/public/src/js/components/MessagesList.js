import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import SlackMessage from './SlackMessage';
import SlackActions from '../actions/SlackActions';
import SlackMessageStore from '../stores/SlackMessageStore';
import SlackUserStore from '../stores/SlackUserStore';
import SlackChannelStore from '../stores/SlackChannelStore';

let getState = () => {
  return {
    messages: SlackMessageStore.getMessages(),
    hasMoreMessages: SlackMessageStore.hasMoreMessages(),
    users: SlackUserStore.getUsers(),
    channels: SlackChannelStore.getChannels()
  };
};

export default React.createClass({
  _onUserChange() {
    // if user information comming, re-render and show user information
    this.setState(getState());
  },
  _onChannelChange() {
    // if channel information comming, re-render and show channel information
    this.setState(getState());
  },
  _onMessageChange() {
    this.setState(getState());

    if (this.state.isLoadingMore) {
      // fix scrollTop when load more messages
      $(this.refs.messagesList).scrollTop(
        this.currentHeight() - this.state.oldHeight
      );
      this.setState({ isLoadingMore: false });
    } else {
      this.scrollToLastMessage();
    }
  },
  scrollToLastMessage() {
    $(this.refs.messagesList).scrollTop(this.currentHeight());
  },
  getInitialState() {
    return _.merge(getState(), {
      isLoadingMore: false,
      oldHeight: 0
    });
  },
  currentHeight() {
    return this.refs.messagesList.scrollHeight;
  },
  handleLoadMore() {
    if (this.state.isLoadingMore) {
      return;
    }

    this.setState({
      isLoadingMore: true,
      oldHeight: this.currentHeight()
    });

    let minTs = (this.state.messages.length > 0) && this.state.messages[0].ts;
    this.props.onLoadMoreMessages(minTs);
  },
  componentDidMount() {
    SlackMessageStore.addChangeListener(this._onMessageChange);
    SlackUserStore.addChangeListener(this._onUserChange);
    SlackChannelStore.addChangeListener(this._onChannelChange);

    this.scrollToLastMessage();
  },
  componentWillUnmount() {
    SlackMessageStore.removeChangeListener(this._onMessageChange);
    SlackUserStore.removeChangeListener(this._onUserChange);
    SlackChannelStore.removeChangeListener(this._onChannelChange);
  },
  render() {
    let createMessage = (messages) => _.map(messages, (message) => {
        return <SlackMessage message={message} users={this.state.users}
          channels={this.state.channels} key={message.ts} />;
      });
    let loadMoreClassName = this.state.isLoadingMore ? 'loading' : '';
    let loadMoreText = this.state.isLoadingMore ? 'Loading...' : 'Load more messages...';

    return (
      <div className="messages-list" ref="messagesList">
        {
          this.state.hasMoreMessages &&
            <div className="messages-load-more {loadMoreClassName}"
              onClick={this.handleLoadMore}>{loadMoreText}</div>
        }
        {createMessage(this.state.messages)}
      </div>
    );
  }
});
