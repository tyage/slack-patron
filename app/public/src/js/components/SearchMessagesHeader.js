import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="messages-header">
        <div className="title">Search: { this.props.searchWord }</div>
      </div>
    );
  }
});
