var SlackLogViewer = React.createClass({
  render: function() {
    var messages = [];
    var channels = [];
    return (
      <div>
        <SlackChannels channels={channels} />
        <SlackMessages messages={messages} />
      </div>
    );
  }
});

var SlackChannels = React.createClass({
  render: function() {
    var createChannel = function(channel, i) {
      return <li>{channel.name}</li>;
    };
    return (
      <ul class="slack-channels">
        {this.props.channels.map(createChannel)}
      </ul>
    );
  }
});

var SlackMessages = React.createClass({
  render: function() {
    var createMessage = function(message, i) {
      return <SlackMessage message={message} />
    };
    return (
      <div class="slack-messages">
        {this.props.messages.map(createMessage)}
      </div>
    );
  }
});

$(function() {
  React.render(<SlackLogViewer />, $('#slack-log-viewer').get(0));
});
