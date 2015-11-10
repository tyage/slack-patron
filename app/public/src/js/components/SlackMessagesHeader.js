import React from 'react';
import _ from 'lodash';
import SlackChannelStore from '../stores/SlackChannelStore';
import SlackCurrentChannelStore from '../stores/SlackCurrentChannelStore';

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
  _onCurrentChannelChange() {
    this.setState(getState());
  },
  componentDidMount() {
    SlackCurrentChannelStore.addChangeListener(this._onCurrentChannelChange);
  },
  _onSearch(e) {
    console.log(this.refs.search.value);
    console.log(this.refs)
    e.preventDefault();
  },
  render() {
    let channel = _.find(this.state.channels, (c) => c.id === this.state.currentChannel);
    console.log(channel && channel.name);
    return (
      <div className="slack-messages-header">
        <div className="channel-name">{channel && channel.name}</div>
        <form className="search-form" onSubmit={this._onSearch}>
          <input type="search" ref="search" />
        </form>
      </div>
    );
  }
});