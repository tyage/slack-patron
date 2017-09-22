import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div className="messages-header">
        <div className="title">Search: { this.props.searchWord }</div>
      </div>
    );
  }
}
