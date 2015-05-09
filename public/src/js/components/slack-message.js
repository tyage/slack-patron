import React from 'react';

export default React.createClass({
  member() {
    return this.props.members[this.props.message.user];
  },
  formatDate(date) {
    return new Date(date * 1000).toLocaleString();
  },
  formatText(text) {
    return text && text.replace(/<@[0-9A-Za-z]+\|([0-9A-Za-z]+)>/gi, "@$1");
  },
  render() {
    return (
      <div className="slack-message">
        <div className="slack-message-member-image">
          <img src={this.member() && this.member().profile.image_32} />
        </div>
        <div className="slack-message-content">
          <div className="slack-message-member-name">{this.member() && this.member().name}</div>
          <div className="slack-message-date">{this.formatDate(this.props.message.ts)}</div>
          <div className="slack-message-text">{this.formatText(this.props.message.text)}</div>
        </div>
      </div>
    );
  }
});
