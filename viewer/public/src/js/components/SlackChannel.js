import React from 'react';
import SlackActions from '../actions/SlackActions';
import ChannelName from './ChannelName';

export default React.createClass({
  handleClick() {
    SlackActions.updateCurrentChannel({ channel: this.props.channel.id });
  },
  render() {
    return (
      <p onClick={this.handleClick}>
        <ChannelName channel={this.props.channel} />
      </p>
    )
  }
});
