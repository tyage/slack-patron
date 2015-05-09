import React from 'react';

export default React.createClass({
  handleClick() {
    this.props.handleClick(this.props.channel.id);
  },
  render() {
    return <p onClick={this.handleClick}>{this.props.channel.name}</p>
  }
});
