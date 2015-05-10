import React from 'react';

export default React.createClass({
  user() {
    return this.props.users[this.props.message.user];
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
        <div className="slack-message-user-image">
          <img src={this.user() && this.user().profile.image_32} />
        </div>
        <div className="slack-message-content">
          <div className="slack-message-user-name">{this.user() && this.user().name}</div>
          <div className="slack-message-date">{this.formatDate(this.props.message.ts)}</div>
          <div className="slack-message-text">{this.formatText(this.props.message.text)}</div>
        </div>
      </div>
    );
  }
});
