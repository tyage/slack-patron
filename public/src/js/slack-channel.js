let SlackChannel = React.createClass({
  handleClick() {
    this.props.handleClick(this.props.channel.slack_id);
  },
  render() {
    return <p onClick={this.handleClick}>{this.props.channel.name}</p>
  }
});
