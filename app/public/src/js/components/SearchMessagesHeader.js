import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="slack-messages-header">
        <div className="title">{ this.props.searchWord }</div>
      </div>
    );
  }
});
