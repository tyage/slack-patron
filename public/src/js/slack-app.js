let SlackApp = React.createClass({
  generateApiUrl(url) {
    return url + '?t=' + (new Date()).getTime();
  },
  getChannels() {
    return $.get(this.generateApiUrl('/channels.json'));
  },
  getMembers() {
    return $.get(this.generateApiUrl('/members.json'));
  },
  getMessages(channel, minPostedAt) {
    return $.post(this.generateApiUrl('/messages/' + channel + '.json'), {
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
      messages: [],
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

    this.getMessages(channel).done((messages) => {
      this.setState({ messages });

      // go to bottom when channel changed
      $('.slack-messages').scrollTop(this.currentMessagesHeight());
    });
  },
  currentMessagesHeight() {
    return $('.slack-messages').get(0).scrollHeight;
  },
  loadMoreMessages() {
    let minPostedAt = (this.state.messages.length > 0) && this.state.messages[0].posted_at;
    let oldMessagesHeight = this.currentMessagesHeight();
    this.getMessages(this.state.currentChannel, minPostedAt).done((newMessages) => {
      this.setState({
        messages: [...newMessages, ...this.state.messages]
      });
      $('.slack-messages').scrollTop(
        this.currentMessagesHeight() - oldMessagesHeight
      );
    });
  },
  render() {
    return (
      <div className="slack-app">
        <SlackChannels channels={this.state.channels}
          changeCurrentChannel={this.changeCurrentChannel}
          currentChannel={this.state.currentChannel} />
        <SlackMessages members={this.state.members} messages={this.state.messages}
          loadMoreMessages={this.loadMoreMessages} />
      </div>
    );
  }
});
