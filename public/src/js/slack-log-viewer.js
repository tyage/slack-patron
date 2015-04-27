let SlackLogViewer = React.createClass({
  getDefaultChannel() {
    return window.localStorage.getItem('Slack.defaultChannel');
  },
  setDefaultChannel(channel) {
    window.localStorage.setItem('Slack.defaultChannel', channel);
  },
  getInitialState() {
    return {
      logs: [],
      members: {},
      channels: {},
      currentChannel: null
    };
  },
  componentDidMount() {
    let time = (new Date()).getTime();
    $.when(
      $.get('/channels.json?t=' + time),
      $.get('/members.json?t=' + time)
    ).done((channels, members) => {
      this.setState({
        channels: channels[0],
        members: members[0],
      });

      let defaultChannel = this.getDefaultChannel() || _.findKey(this.state.channels);
      this.changeCurrentChannel(defaultChannel);
    });
  },
  changeCurrentChannel(channel) {
    this.setState({
      currentChannel: channel
    });

    this.setDefaultChannel(channel);

    let time = (new Date()).getTime();
    $.get('/logs/' + channel + '.json?t=' + time).done((logs) => {
      this.setState({
        logs: logs
      });
    });
  },
  render() {
    return (
      <div>
        <SlackChannels channels={this.state.channels}
          changeCurrentChannel={this.changeCurrentChannel}
          currentChannel={this.state.currentChannel} />
        <SlackMessages members={this.state.members} logs={this.state.logs} />
      </div>
    );
  }
});
