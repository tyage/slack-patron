let SlackLogViewer = React.createClass({
  generateApiUrl(url) {
    return url + '?t=' + (new Date()).getTime();
  },
  getChannels() {
    return $.get(this.generateApiUrl('/channels.json'));
  },
  getMembers() {
    return $.get(this.generateApiUrl('/members.json'));
  },
  getLogs(channel, minPostedAt) {
    return $.post(this.generateApiUrl('/logs/' + channel + '.json'), {
      min_posted_at: minPostedAt
    });
  },
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
    $.when(
      this.getChannels(),
      this.getMembers()
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

    this.getLogs(channel).done((logs) => {
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
