import React from 'react';

const channelTypeToClassName = {
  C: 'channel',
  G: 'group',
  D: 'im'
};

export default class extends React.Component {
  render() {
    const channel = this.props.channel;
    const channelType = channel.id[0];
    const classNames = ['channel-name', channelTypeToClassName[channelType]];
    return <span className={classNames.join(' ')}>{channel.name}</span>;
  }
}
