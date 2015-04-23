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
    var time = (new Date()).getTime();
    $.when(
      $.get('/channels.json?t=' + time),
      $.get('/members.json?t=' + time),
      $.get('/logs.json?t=' + time)
    ).done(function(channels, members, logs) {
      self.setState({
        channels: channels[0],
        members: members[0],
        logs: logs[0]
      });
    })
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
          changeCurrentChannel={this.changeCurrentChannel}
          currentChannel={this.state.currentChannel} />
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
        var classNames = [];
        if (self.props.currentChannel === channel.id) {
          classNames.push('selected');
        }
        return (
          <li className={classNames.join(' ')}>
            <SlackChannel channel={channel}
              handleClick={self.props.changeCurrentChannel} />
          </li>
        );
      });
    };
    return (
      <ul className="slack-channels">
        {createChannelList(this.props.channels)}
      </ul>
    );
  }
});

var SlackMember = React.createClass({
  render: function() {
    return (
      <p>{this.props.member.name}</p>
    );
  }
});

var SlackMessage = React.createClass({
  member: function() {
    return this.props.members[this.props.message.user];
  },
  formatedDate: function() {
    return new Date(this.props.message.posted_at * 1000).toLocaleString();
  },
  render: function() {
    return (
      <div className="slack-message">
        <div className="slack-message-member-image">
          <img src={this.member() && this.member().profile.image_32} />
        </div>
        <div className="slack-message-content">
          <div className="slack-message-member-name">{this.member() && this.member().name}</div>
          <div className="slack-message-date">{this.formatedDate()}</div>
          <div className="slack-message-text">{this.props.message.text}</div>
        </div>
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
      <div className="slack-messages">
        {createMessage(this.props.logs[this.props.currentChannel])}
      </div>
    );
  }
});

$(function() {
  React.render(<SlackLogViewer />, $('#slack-log-viewer').get(0));
});
