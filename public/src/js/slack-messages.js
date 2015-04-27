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
