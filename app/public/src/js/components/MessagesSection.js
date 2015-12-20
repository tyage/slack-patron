import React from 'react';
import MessagesList from './MessagesList';
import ChannelMessagesHeader from './ChannelMessagesHeader';
import SearchMessagesHeader from './SearchMessagesHeader';
import SlackActions from '../actions/SlackActions';
import SlackConstants from '../constants/SlackConstants';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';
import SearchWordStore from '../stores/SearchWordStore';
import SlackMessageStore from '../stores/SlackMessageStore';

let channelMessages = Symbol();
let searchMessages = Symbol();

export default React.createClass({
  _onSearchWordChange() {
    let searchWord = SearchWordStore.getSearchWord();
    this.setState({
      messagesType: searchMessages,
      searchWord
    });
    SlackActions.search(searchWord);
  },
  _onCurrentChannelChange() {
    this.setState({
      messagesType: channelMessages
    });
    SlackActions.getMessages(SlackCurrentChannelStore.getCurrentChannel());
  },
  getInitialState() {
    return {
      messagesType: null
    };
  },
  componentDidMount() {
    SearchWordStore.addChangeListener(this._onSearchWordChange);
    SlackCurrentChannelStore.addChangeListener(this._onCurrentChannelChange);
  },
  componentWillUnmount() {
    SearchWordStore.removeChangeListener(this._onSearchWordChange);
    SlackCurrentChannelStore.removeChangeListener(this._onCurrentChannelChange);
  },
  render() {
    let loadMoreChannelMessages = (minTs) => {
      SlackActions.getMoreMessages(SlackCurrentChannelStore.getCurrentChannel(), minTs);
    };
    let loadMoreSearchMessages = (minTs) => {
    };
    let messages = () => {
      switch (this.state.messagesType) {
        case channelMessages:
          return (
            <div className="channel-messages">
              <ChannelMessagesHeader />
              <MessagesList onLoadMoreMessages={loadMoreChannelMessages} />
            </div>
          );
        case searchMessages:
          return (
            <div className="search-messages">
              <SearchMessagesHeader searchWord={this.state.searchWord} />
              <MessagesList onLoadMoreMessages={loadMoreSearchMessages} />
            </div>
          );
        default:
          return (
            <div className="loading-messages">
              <h2 className="title">Now loading...</h2>
            </div>
          );
      }
    };
    return (
      <div className="messages">
        { messages() }
      </div>
    );
  }
});
