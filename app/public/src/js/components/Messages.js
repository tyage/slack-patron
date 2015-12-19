import React from 'react';
import ChannelMessages from './ChannelMessages';
import SlackActions from '../actions/SlackActions';
import SlackConstants from '../constants/SlackConstants';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';
import SearchWordStore from '../stores/SearchWordStore';
import SlackMessageStore from '../stores/SlackMessageStore';


let getState = () => {
  return {
    messagesType: null
  };
};

export default React.createClass({
  _onSearchWordChange() {
    SlackActions.search(SearchWordStore.getSearchWord());
  },
  _onCurrentChannelChange() {
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
        case SlackConstants.CHANNEL_MESSAGES:
          return <ChannelMessages />
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
