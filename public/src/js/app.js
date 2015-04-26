"use strict";

let SlackLogViewer = React.createClass({
  getDefaultChannel: function() {
    return window.localStorage.getItem('Slack.defaultChannel');
  },
  setDefaultChannel: function(channel) {
    window.localStorage.setItem('Slack.defaultChannel', channel);
  },
  getInitialState: function() {
    return {
      logs: [],
      members: [],
      channels: [],
      currentChannel: null
    };
  },
  componentDidMount: function() {
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
  changeCurrentChannel: function(channel) {
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
  render: function() {
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
  handleClick: function() {
    this.props.handleClick(this.props.channel.id);
  },
  render: function() {
    return <p onClick={this.handleClick}>{this.props.channel.name}</p>
  }
});

let SlackChannels = React.createClass({
  render: function() {
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
  render: function() {
    return (
      <p>{this.props.member.name}</p>
    );
  }
});

let SlackMessage = React.createClass({
  member: function() {
    return this.props.members[this.props.message.user];
  },
  formatDate: function(date) {
    return new Date(date * 1000).toLocaleString();
  },
  formatText: function(text) {
    return text.replace(/<@[0-9A-Za-z]+\|([0-9A-Za-z]+)>/gi, "@$1");
  },
  render: function() {
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
  render: function() {
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
