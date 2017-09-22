import React, { Component } from 'react';
import _ from 'lodash';
import SlackChannelStore from '../stores/SlackChannelStore';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';

let getState = () => {
  return {
    channels: SlackChannelStore.getChannels(),
    ims: SlackChannelStore.getIms(),
    currentChannel: SlackCurrentChannelStore.getCurrentChannel()
  };
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = getState();
  }
  _onCurrentChannelChange() {
    this.setState(getState());
  }
  componentDidMount() {
    SlackCurrentChannelStore.addChangeListener(this._onCurrentChannelChange);
  }
  componentWillUnmount() {
    SlackCurrentChannelStore.removeChangeListener(this._onCurrentChannelChange);
  }
  render() {
    let channels = Object.assign({}, this.state.channels, this.state.ims);
    let channel = _.find(channels, (c) => c.id === this.state.currentChannel);

    if (!channel) {
      return null;
    }

    let prefix = '';
    if ('is_channel' in channel) {
        prefix = '#';
    } else if ('is_group' in channel) {
        prefix = '$';
    } else if ('is_im' in channel) {
        prefix = '@';
    }

    return (
      <div className="messages-header">
        <div className="title">{prefix}{channel.name}</div>
      </div>
    );
  }
}
