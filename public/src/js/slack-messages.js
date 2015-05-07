import SlackMessage from './slack-message';

export default React.createClass({
  render() {
    let createMessage = (messages, i) => _.map(messages, (message) => {
        return <SlackMessage message={message} members={this.props.members} />;
      });

    return (
      <div className="slack-messages">
        <div className="slack-messages-load-more"
          onClick={this.props.loadMoreMessages}>Load more messages...</div>
        {createMessage(this.props.messages)}
      </div>
    );
  }
});
