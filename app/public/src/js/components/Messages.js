import React from 'react';
import ChannelMessages from './ChannelMessages';
import SlackActions from '../actions/SlackActions';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';

const channelMessageType = Symbol();
let getState = () => {
  return {
    messagesType: channelMessageType
  };
};

export default React.createClass({
  _onCurrentChannelChange() {
    this.setState({
      messagesType: channelMessageType
    });
    SlackActions.getMessages(SlackCurrentChannelStore.getCurrentChannel());
  },
  getInitialState() {
    return getState();
  },
  componentDidMount() {
    SlackCurrentChannelStore.addChangeListener(this._onCurrentChannelChange);
  },
  render() {
    let messages = () => {
      switch (this.state.messagesType) {
        case channelMessageType:
          return <ChannelMessages />
          break;
        default:
      }
    }
    return (
      <div className="messages">
        { messages() }
      </div>
    );
  }
});
