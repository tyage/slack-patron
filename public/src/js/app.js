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
      members: [],
      channels: [],
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

let SlackChannel = React.createClass({
  handleClick() {
    this.props.handleClick(this.props.channel.id);
  },
  render() {
    return <p onClick={this.handleClick}>{this.props.channel.name}</p>
  }
});

let SlackChannels = React.createClass({
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

let SlackMember = React.createClass({
  render() {
    return (
      <p>{this.props.member.name}</p>
    );
  }
});

let SlackMessage = React.createClass({
  member() {
    return this.props.members[this.props.message.user];
  },
  formatDate(date) {
    return new Date(date * 1000).toLocaleString();
  },
  formatText(text) {
    return text.replace(/<@[0-9A-Za-z]+\|([0-9A-Za-z]+)>/gi, "@$1");
  },
  render() {
    return (
      <div className="slack-message">
        <div className="slack-message-member-image">
          <img src={this.member() && this.member().profile.image_32} />
        </div>
        <div className="slack-message-content">
          <div className="slack-message-member-name">{this.member() && this.member().name}</div>
          <div className="slack-message-date">{this.formatDate(this.props.message.posted_at)}</div>
          <div className="slack-message-text">{this.formatText(this.props.message.text)}</div>
        </div>
      </div>
    );
  }
});

let SlackMessages = React.createClass({
  render() {
    let createMessage = (messages, i) => _.map(messages, (message) => {
        return <SlackMessage message={message} members={this.props.members} />;
      });

    return (
      <div className="slack-messages">
        {createMessage(this.props.logs)}
      </div>
    );
  }
});

$(() => {
  React.render(<SlackLogViewer />, $('#slack-log-viewer').get(0));
});
