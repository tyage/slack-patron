import React from 'react';

export default React.createClass({
  formatDate(date) {
    return new Date(date * 1000).toLocaleString();
  },
  formatText(text) {
    let channelLink = (id) => `#${this.props.channels[id].name}`;
    let userLink = (id) => `@${this.props.users[id].name}`;
    let specialCommand = (command) => `@${command}`;
    let uriLink = (uri) => `<a href="${uri}" target="_blank">${uri}</a>`;
    if (text) {
      return text.replace(/<#([0-9A-Za-z]+)>/, (m, id) => channelLink(id))
        .replace(/<#([0-9A-Za-z]+)\|([0-9A-Za-z]+)>/gi, (m, id) => channelLink(id))
        .replace(/<@([0-9A-Za-z]+)>/gi, (m, id) => userLink(id))
        .replace(/<@([0-9A-Za-z]+)\|([0-9A-Za-z]+)>/gi, (m, id) => userLink(id))
        .replace(/<!(channel|everyone|group)>/gi, (m, command) => specialCommand(command))
        .replace(/<(https?:\/\/[^>]*)>/gi, (m, uri) => uriLink(uri));
    }
    return text;
  },
  render() {
    let createMarkup = (text) => {
      return {
        __html: this.formatText(text) || ''
      };
    };
    let botMessage = (message) => {
      let attachment = _.find(message.attachments, (attachment) => attachment.text);
      let text = attachment ? attachment.text : '';
      return (
        <div className="slack-message">
          <div className="slack-message-user-image">
            <img src={message.icons && message.icons.image_48} />
          </div>
          <div className="slack-message-content">
            <div className="slack-message-user-name">{message.username}</div>
            <div className="slack-message-date">{this.formatDate(message.ts)}</div>
            <div className="slack-message-text"
              dangerouslySetInnerHTML={createMarkup(text)}></div>
          </div>
        </div>
      );
    };
    let normalMessage = (message, user) => {
      return (
        <div className="slack-message">
          <div className="slack-message-user-image">
            <img src={user && user.profile.image_48} />
          </div>
          <div className="slack-message-content">
            <div className="slack-message-user-name">{user && user.name}</div>
            <div className="slack-message-date">{this.formatDate(message.ts)}</div>
            <div className="slack-message-text"
              dangerouslySetInnerHTML={createMarkup(message.text)}></div>
          </div>
        </div>
      );
    };

    if (this.props.message.hidden) {
      return null;
    }

    let message = this.props.message;
    switch (this.props.message.subtype) {
      case 'bot_message':
        return botMessage(message);
        break;
      default:
        let user = this.props.users[this.props.message.user];
        return normalMessage(message, user);
        break;
    }
  }
});
