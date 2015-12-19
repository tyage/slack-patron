import React from 'react';
import ChannelMessages from './ChannelMessages';
import SlackActions from '../actions/SlackActions';
import SlackConstants from '../constants/SlackConstants';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';
import SearchWordStore from '../stores/SearchWordStore';
import SlackMessageStore from '../stores/SlackMessageStore';

let channelMessages = Symbol();
let searchMessages = Symbol();

export default React.createClass({
  _onSearchWordChange() {
    this.setState({
      messagesType: searchMessages
    });
    SlackActions.search(SearchWordStore.getSearchWord());
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
      SlackActions.getMessages(SlackCurrentChannelStore.getCurrentChannel(), minTs);
    };
    let loadMoreSearchMessages = (minTs) => {
    };
    let messages = () => {
      switch (this.state.messagesType) {
        case channelMessages:
          return <ChannelMessages onLoadMoreMessages={loadMoreSearchMessages} />
          break;
        case searchMessages:
          return <ChannelMessages onLoadMoreMessages={loadMoreChannelMessages} />
          break;
        default:
          break;
      }
    };
    return (
      <div className="messages">
        { messages() }
      </div>
    );
  }
});
