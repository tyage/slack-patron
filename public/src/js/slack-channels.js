let SlackChannels = React.createClass({
  render() {
    let createChannelList = (channels) => _.map(channels, (channel) => {
        let classNames = [];
        if (this.props.currentChannel === channel.slack_id) {
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
