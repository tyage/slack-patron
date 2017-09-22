import React, { Component } from 'react';

export default class extends Component {
  render() {
    const channel = this.props.channel;
    const classNames = ['channel-name'];
    if ('is_channel' in channel) {
      classNames.push('channel');
    } else if ('is_group' in channel) {
      classNames.push('group');
    } else if ('is_im' in channel) {
      classNames.push('im');
    }
    return <span className={classNames.join(' ')}>{channel.name}</span>;
  }
}
