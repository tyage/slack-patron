import React from 'react';
import ChannelName from './ChannelName';

const SlackChannel = ({ channel }) => (
  <p>
    <ChannelName channel={channel} />
  </p>
);

export default SlackChannel;
