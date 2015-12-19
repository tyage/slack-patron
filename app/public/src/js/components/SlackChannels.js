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

    // XXX setTimeout付けないと, fluxループが2周目に突入して怒られる
    setTimeout(() => {
      let channel = SlackCurrentChannelStore.getChannelFromPath();
      SlackActions.updateCurrentChannel({ channel, pushState: false });
    });
  },
  _onCurrentChannelChange() {
    this.setState(getState());
  },
  componentDidMount() {
    SlackChannelStore.addChangeListener(this._onChannelChange);
    SlackCurrentChannelStore.addChangeListener(this._onCurrentChannelChange);

    SlackActions.getChannels();

    window.addEventListener('popstate', (e) => {
      let channel = SlackCurrentChannelStore.getChannelFromPath();
      SlackActions.updateCurrentChannel({ channel, pushState: false });
    });
  },
  componentWillUnmount() {
    SlackChannelStore.removeChangeListener(this._onChannelChange);
    SlackCurrentChannelStore.removeChangeListener(this._onCurrentChannelChange);
  },
  render() {
    let createChannelList = (channels) => _.map(channels, (channel) => {
        let classNames = [];
        if (this.state.currentChannel === channel.id) {
          classNames.push('selected');
        }
        return (
          <li className={classNames.join(' ')} key={channel.id}>
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
