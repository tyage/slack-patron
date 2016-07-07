import React from 'react';
import _ from 'lodash';
import SlackChannel from './SlackChannel';
import SlackChannelStore from '../stores/SlackChannelStore';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';
import SlackActions from '../actions/SlackActions';

let getState = () => {
  return {
    channels: SlackChannelStore.getChannels(),
    ims: SlackChannelStore.getIms(),
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
    SlackActions.getIms();

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
        if ('is_channel' in channel) {
            classNames.push('channel');
        } else if ('is_group' in channel) {
            classNames.push('group');
        } else if ('is_im' in channel) {
            classNames.push('im');
        }
        return (
          <li className={classNames.join(' ')} key={channel.id}>
            <SlackChannel channel={channel} />
          </li>
        );
      });

    return (
      <div className="sidebar-body">
        <div className="slack-channels">
          <h3>CHANNELS({Object.keys(this.state.channels).length})</h3>
          <ul className="list">
            {createChannelList(this.state.channels)}
          </ul>
        </div>
        <div className="slack-ims">
          <h3>DIRECT MESSAGES({Object.keys(this.state.ims).length})</h3>
          <ul className="list">
            {createChannelList(this.state.ims)}
          </ul>
        </div>
      </div>
    );
  }
});
