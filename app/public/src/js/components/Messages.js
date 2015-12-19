import React from 'react';
import ChannelMessages from './ChannelMessages';
import SlackActions from '../actions/SlackActions';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';
import SlackConstants from '../constants/SlackConstants';
import SlackMessageStore from '../stores/SlackMessageStore';

let getState = () => {
  return {
    messagesType: null
  };
};

export default React.createClass({
  _onMessageChange() {
    this.setState({
      messagesType: SlackMessageStore.getMessagesType()
    });
  },
  _onCurrentChannelChange() {
    SlackActions.getMessages(SlackCurrentChannelStore.getCurrentChannel());
  },
  getInitialState() {
    return getState();
  },
  componentDidMount() {
    SlackMessageStore.addChangeListener(this._onMessageChange);
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
