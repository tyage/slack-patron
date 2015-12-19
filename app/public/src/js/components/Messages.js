import React from 'react';
import ChannelMessages from './ChannelMessages';
import SlackActions from '../actions/SlackActions';
import SlackConstants from '../constants/SlackConstants';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';
import SearchWordStore from '../stores/SearchWordStore';
import SlackMessageStore from '../stores/SlackMessageStore';

let channelMessages = Symbol();
let searchMessages = Symbol();

let getState = () => {
  return {
    messagesType: null
  };
};

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
    return getState();
  },
  componentDidMount() {
    SearchWordStore.addChangeListener(this._onSearchWordChange);
    SlackCurrentChannelStore.addChangeListener(this._onCurrentChannelChange);
  },
  render() {
    let messages = () => {
      switch (this.state.messagesType) {
        case channelMessages:
          return <ChannelMessages />
          break;
        case searchMessages:
          break;
        default:
          break;
      }
    }
    return (
      <div className="messages">
        { messages() }
      </div>
    );
  }
});
