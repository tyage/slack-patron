"use strict";

var SlackLogViewer = React.createClass({
  getDefaultChannel: function(channel) {
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
    var self = this;
    var time = (new Date()).getTime();
    $.when(
      $.get('/channels.json?t=' + time),
      $.get('/members.json?t=' + time)
    ).done(function(channels, members) {
      self.setState({
        channels: channels[0],
        members: members[0],
      });

      var defaultChannel = self.getDefaultChannel() || _.findKey(self.state.channels);
      self.changeCurrentChannel(defaultChannel);
    });
  },
  changeCurrentChannel: function(channel) {
    this.setState({
      currentChannel: channel
    });

    this.setDefaultChannel(channel);

    var self = this;
    var time = (new Date()).getTime();
    $.get('/logs/' + channel + '.json?t=' + time).done(function(logs) {
      self.setState({
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
        {createMessage(this.props.logs)}
      </div>
    );
  }
});

$(function() {
  React.render(<SlackLogViewer />, $('#slack-log-viewer').get(0));
});
