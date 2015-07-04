import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import SlackMessage from './SlackMessage';
import SlackActions from '../actions/SlackActions';
import SlackMessageStore from '../stores/SlackMessageStore';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';
import SlackUserStore from '../stores/SlackUserStore';
import SlackChannelStore from '../stores/SlackChannelStore';

let getState = () => {
  return {
    messages: SlackMessageStore.getMessages(),
    hasMoreMessages: SlackMessageStore.hasMoreMessages(),
    currentChannel: SlackCurrentChannelStore.getCurrentChannel(),
    users: SlackUserStore.getUsers(),
    channels: SlackChannelStore.getChannels()
  };
};

export default React.createClass({
  _onUserChange() {
    this.setState(getState());
  },
  _onChannelChange() {
    this.setState(getState());
  },
  _onMessageChange() {
    this.setState(getState());

    if (this.state.isLoadingMore) {
      // fix scrollTop when load more messages
      $(this.getDOMNode()).scrollTop(
        this.currentHeight() - this.state.oldHeight
      );
      this.setState({ isLoadingMore: false });
    } else {
      // go to bottom when channel changed
      $(this.getDOMNode()).scrollTop(this.currentHeight());
    }
  },
  _onCurrentChannelChange() {
    // setStateではすぐには更新されない
    let state = getState();
    this.setState(state);
    SlackActions.getMessages(state.currentChannel);
  },
  getInitialState() {
    return _.merge(getState(), {
      isLoadingMore: false,
      oldHeight: 0
    });
  },
  currentHeight() {
    return $(this.getDOMNode()).get(0).scrollHeight;
  },
  handleLoadMore() {
    if (this.state.isLoadingMore) {
      return;
    }

    this.setState({
      isLoadingMore: true,
      oldHeight: this.currentHeight()
    });

    this.loadMoreMessages();
  },
  loadMoreMessages() {
    let minTs = (this.state.messages.length > 0) && this.state.messages[0].ts;
    SlackActions.getMoreMessages(this.state.currentChannel, minTs);
  },
  componentDidMount() {
    SlackMessageStore.addChangeListener(this._onMessageChange);
    SlackCurrentChannelStore.addChangeListener(this._onCurrentChannelChange);
    SlackUserStore.addChangeListener(this._onUserChange);
    SlackChannelStore.addChangeListener(this._onChannelChange);
  },
  render() {
    let createMessage = (messages, i) => _.map(messages, (message) => {
        return <SlackMessage message={message} users={this.state.users}
          channels={this.state.channels} />;
      });
    let loadMoreClassName = this.state.isLoadingMore ? 'loading' : '';
    let loadMoreText = this.state.isLoadingMore ? 'Loading...' : 'Load more messages...';

    return (
      <div className="slack-messages">
        {
          this.state.hasMoreMessages &&
            <div className="slack-messages-load-more {loadMoreClassName}"
              onClick={this.handleLoadMore}>{loadMoreText}</div>
        }
        {createMessage(this.state.messages)}
      </div>
    );
  }
});
