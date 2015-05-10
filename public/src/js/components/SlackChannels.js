import React from 'react';
import _ from 'lodash';
import SlackChannel from './SlackChannel';
import SlackChannelStore from '../stores/SlackChannelStore';
import SlackActions from '../actions/SlackActions';

let getState = () => {
  return {
    channels: SlackChannelStore.getChannels(),
    currentChannel: SlackChannelStore.getCurrentChannel()
  };
};

export default React.createClass({
  getInitialState() {
    return getState();
  },
  _onChange() {
    this.setState(getState());
  },
  componentDidMount() {
    SlackChannelStore.addChangeListener(this._onChange);
    SlackActions.getChannels();
    SlackActions.updateCurrentChannel(SlackChannelStore.getDefaultChannel());
  },
  render() {
    let createChannelList = (channels) => _.map(channels, (channel) => {
        let classNames = [];
        if (this.state.currentChannel === channel.id) {
          classNames.push('selected');
        }
        return (
          <li className={classNames.join(' ')}>
            <SlackChannel channel={channel} />
          </li>
        );
      });

    return (
      <ul className="slack-channels">
        {createChannelList(this.state.channels)}
      </ul>
    );
  }
});
