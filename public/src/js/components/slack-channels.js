import React from 'react';
import _ from 'lodash';
import SlackChannel from './slack-channel';

export default React.createClass({
  render() {
    let createChannelList = (channels) => _.map(channels, (channel) => {
        let classNames = [];
        if (this.props.currentChannel === channel.id) {
          classNames.push('selected');
        }
        return (
          <li className={classNames.join(' ')}>
            <SlackChannel channel={channel}
              handleClick={this.props.changeCurrentChannel} />
          </li>
        );
      });

    return (
      <ul className="slack-channels">
        {createChannelList(this.props.channels)}
      </ul>
    );
  }
});
