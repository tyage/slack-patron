import React, { Component } from 'react';
import SlackActions from '../actions/SlackActions';
import ChannelName from './ChannelName';

export default class extends Component {
  handleClick() {
    SlackActions.updateCurrentChannel({ channel: this.props.channel.id });
  }
  render() {
    return (
      <p onClick={this.handleClick}>
        <ChannelName channel={this.props.channel} />
      </p>
    )
  }
}
