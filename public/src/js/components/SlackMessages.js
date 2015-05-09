import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import SlackMessage from './SlackMessage';

export default React.createClass({
  getInitialState() {
    return {
      isLoadingMore: false,
      oldHeight: 0
    };
  },
  componentDidUpdate(prevProps) {
    if (prevProps.messages[0] === this.props.messages[0]) {
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
    this.props.loadMoreMessages();
  },
  render() {
    let createMessage = (messages, i) => _.map(messages, (message) => {
        return <SlackMessage message={message} members={this.props.members} />;
      });
    let loadMoreClassName = this.state.isLoadingMore ? 'loading' : '';
    let loadMoreText = this.state.isLoadingMore ? 'Loading...' : 'Load more messages...';

    return (
      <div className="slack-messages">
        <div className="slack-messages-load-more {loadMoreClassName}"
          onClick={this.handleLoadMore}>{loadMoreText}</div>
        {createMessage(this.props.messages)}
      </div>
    );
  }
});
