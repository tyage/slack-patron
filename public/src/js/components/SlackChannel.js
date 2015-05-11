import React from 'react';
import SlackActions from '../actions/SlackActions';

export default React.createClass({
  handleClick() {
    SlackActions.updateCurrentChannel({ channel: this.props.channel.id });
  },
  render() {
    return <p onClick={this.handleClick}>{this.props.channel.name}</p>
  }
});
