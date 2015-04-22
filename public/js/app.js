"use strict";

var SlackLogViewer = React.createClass({
  getInitialState: function() {
    return {
      logs: [],
      members: [],
      channels: [],
      currentChannel: null
    };
  },
  componentDidMount: function() {
    var self = this;
    $.get('/channels.json', function(channels) {
      self.setState({
        channels: channels
      });
    });
    $.get('/members.json', function(members) {
      self.setState({
        members: members
      });
    });
    $.get('/logs.json', function(logs) {
      self.setState({
        logs: logs
      });
    });
  },
  changeCurrentChannel: function(channel) {
    this.setState({
      currentChannel: channel
    });
  },
  render: function() {
    return (
      <div>
        <SlackChannels channels={this.state.channels}
          changeCurrentChannel={this.changeCurrentChannel} />
        <SlackMessages members={this.state.members} logs={this.state.logs}
          currentChannel={this.state.currentChannel} />
      </div>
    );
  }
});

var SlackChannel = React.createClass({
  handleClick: function() {
    this.props.handleClick(this.props.channel.id);
  },
  render: function() {
    return <p onClick={this.handleClick}>{this.props.channel.name}</p>
  }
});

var SlackChannels = React.createClass({
  render: function() {
    var self = this;
    var createChannelList = function(channels) {
      return _.map(channels, function(channel) {
        return (
          <li>
            <SlackChannel channel={channel}
              handleClick={self.props.changeCurrentChannel} />
          </li>
        );
      });
    };
    return (
      <ul class="slack-channels">
        {createChannelList(this.props.channels)}
      </ul>
    );
  }
});

var SlackMember = React.createClass({
  render: function() {
    return (
      <p>{this.props.member.name}: </p>
    );
  }
});

var SlackMessage = React.createClass({
  render: function() {
    return (
      <div class="slack-message">
        <div className="slack-message-member">
          <SlackMember member={this.props.members[this.props.message.user]} />
        </div>
        <div class="slack-message-text">{this.props.message.text}</div>
        <div class="slack-message-date">{this.props.message.posted_at}</div>
      </div>
    );
  }
});

var SlackMessages = React.createClass({
  render: function() {
    var self = this;
    var createMessage = function(messages, i) {
      return _.map(messages, function(message) {
        return <SlackMessage message={message} members={self.props.members} />;
      });
    };
    return (
      <div class="slack-messages">
        {createMessage(this.props.logs[this.props.currentChannel])}
      </div>
    );
  }
});

$(function() {
  React.render(<SlackLogViewer />, $('#slack-log-viewer').get(0));
});
