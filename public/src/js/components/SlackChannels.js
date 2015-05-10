import React from 'react';
import _ from 'lodash';
import SlackChannel from './SlackChannel';
import SlackChannelStore from '../stores/SlackChannelStore';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';
import SlackActions from '../actions/SlackActions';

let getState = () => {
  return {
    channels: SlackChannelStore.getChannels(),
    currentChannel: SlackCurrentChannelStore.getCurrentChannel()
  };
};

export default React.createClass({
  getInitialState() {
    return getState();
  },
  _onChannelChange() {
    let state = getState();
    this.setState(state);

    // XXX setTImeoutどうにかならんのか
    setTimeout(() => {
      let defaultChannel = SlackCurrentChannelStore.getDefaultChannel();
      if (defaultChannel) {
        SlackActions.updateCurrentChannel(defaultChannel);
      } else {
        // 現在のChannelが設定されていない場合は一番はじめのChannelを選択
        SlackActions.updateCurrentChannel(_.findKey(state.channels));
      }
    });
  },
  _onCurrentChannelChange() {
    this.setState(getState());
  },
  componentDidMount() {
    SlackChannelStore.addChangeListener(this._onChannelChange);
    SlackCurrentChannelStore.addChangeListener(this._onCurrentChannelChange);
    SlackActions.getChannels();
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
