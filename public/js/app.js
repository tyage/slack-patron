"use strict";

var SlackLogViewer = React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      members: [],
      channels: []
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
  },
  render: function() {
    return (
      <div>
        <SlackChannels channels={this.state.channels} />
        <SlackMessages messages={this.state.messages} members={this.state.members}/>
      </div>
    );
  }
});

var SlackChannels = React.createClass({
  render: function() {
    var createChannelList = function(channels) {
      return _.map(channels, function(channel) {
        return <li>{channel.name}</li>;
      });
    };
    return (
      <ul class="slack-channels">
        {createChannelList(this.props.channels)}
      </ul>
    );
  }
});

var SlackMessages = React.createClass({
  render: function() {
    var createMessage = function(messages, i) {
      return _.map(messages, function(message) {
        return <SlackMessage message={message} />;
      });
    };
    return (
      <div class="slack-messages">
        {createMessage(this.props.messages)}
      </div>
    );
  }
});

$(function() {
  React.render(<SlackLogViewer />, $('#slack-log-viewer').get(0));
});
