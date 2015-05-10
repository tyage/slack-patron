import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import SlackMessage from './SlackMessage';
import SlackActions from '../actions/SlackActions';
import SlackStore from '../stores/SlackStore';

let getState = () => {
  return {
    messages: SlackStore.getMessages(),
    currentChannel: SlackStore.getCurrentChannel()
  };
};

export default React.createClass({
  _onChange() {
    let prevMessages = this.state.messages;
    this.setState(getState());

    // messages are not changed
    if (prevMessages[0] === this.state.messages[0]) {
      return;
    }

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
    SlackStore.addChangeListener(this._onChange);
  },
  render() {
    let createMessage = (messages, i) => _.map(messages, (message) => {
        return <SlackMessage message={message} />;
      });
    let loadMoreClassName = this.state.isLoadingMore ? 'loading' : '';
    let loadMoreText = this.state.isLoadingMore ? 'Loading...' : 'Load more messages...';

    return (
      <div className="slack-messages">
        <div className="slack-messages-load-more {loadMoreClassName}"
          onClick={this.handleLoadMore}>{loadMoreText}</div>
        {createMessage(this.state.messages)}
      </div>
    );
  }
});
