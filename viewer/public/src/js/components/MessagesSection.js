import React, { Component } from 'react';
import MessagesList from './MessagesList';
import ChannelMessagesHeader from './ChannelMessagesHeader';
import SearchMessagesHeader from './SearchMessagesHeader';
import SlackActions from '../actions/SlackActions';
import MessagesType from '../constants/MessagesType';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';
import SearchWordStore from '../stores/SearchWordStore';
import SlackMessageStore from '../stores/SlackMessageStore';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  _onSearchWordChange() {
    this.setState({
      isLoading: true
    });
    SlackActions.search(SearchWordStore.getSearchWord());
  }
  _onCurrentChannelChange() {
    this.setState({
      isLoading: true
    });
    SlackActions.getMessages(SlackCurrentChannelStore.getCurrentChannel());
  }
  _onMessageChange() {
    this.setState({
      isLoading: false
    });
  }
  componentDidMount() {
    SlackMessageStore.addChangeListener(this._onMessageChange.bind(this));
    SearchWordStore.addChangeListener(this._onSearchWordChange.bind(this));
    SlackCurrentChannelStore.addChangeListener(this._onCurrentChannelChange.bind(this));
  }
  componentWillUnmount() {
    SlackMessageStore.removeChangeListener(this._onMessageChange);
    SearchWordStore.removeChangeListener(this._onSearchWordChange);
    SlackCurrentChannelStore.removeChangeListener(this._onCurrentChannelChange);
  }
  render() {
    let loadMoreChannelMessages = (minTs) => {
      SlackActions.getMoreMessages(SlackCurrentChannelStore.getCurrentChannel(), minTs);
    };
    let loadMoreSearchMessages = (minTs) => {
      SlackActions.searchMore(SearchWordStore.getSearchWord(), minTs);
    };
    let messages = () => {
      let messagesInfo = SlackMessageStore.getMessagesInfo();
      switch (messagesInfo.type) {
        case MessagesType.CHANNEL_MESSAGES:
          return (
            <div className="channel-messages">
              <ChannelMessagesHeader />
              <MessagesList onLoadMoreMessages={loadMoreChannelMessages} />
            </div>
          );
        case MessagesType.SEARCH_MESSAGES:
          return (
            <div className="search-messages">
              <SearchMessagesHeader searchWord={messagesInfo.searchWord} />
              <MessagesList onLoadMoreMessages={loadMoreSearchMessages} />
            </div>
          );
        default:
          break;
      }
    };
    let loadingMessages = () => (
      <div className="loading-messages">
        <h2 className="title">Now loading...</h2>
      </div>
    );
    return (
      <div className="messages">
        { this.state.isLoading ? loadingMessages() : messages() }
      </div>
    );
  }
}
