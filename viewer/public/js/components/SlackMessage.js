import React, { Component } from 'react';
import ChannelName from './ChannelName';
import SlackActions from '../actions/SlackActions';
import MessagesType from '../constants/MessagesType';

export default class extends Component {
  getChannel(id) {
    let channels = this.props.channels;
    let ims = this.props.ims;
    if (channels && channels[id]) {
      return channels[id];
    }
    if (ims && ims[id]) {
      return ims[id];
    }
  }
  getUser(id) {
    let users = this.props.users;
    return users && users[id];
  }
  formatDate(date) {
    return new Date(date * 1000).toLocaleString();
  }
  formatText(text) {
    let entity = (str) => {
      return str.replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    };
    let channelLink = (id) => {
      let channel = this.getChannel(id);
      return `#${channel && channel.name}`;
    };
    let userLink = (id) => {
      let user = this.getUser(id);
      return `@${user && user.name}`;
    };
    let specialCommand = (command) => `@${command}`;
    let uriLink = (uri) => `<a href="${uri}" target="_blank">${uri}</a>`;
    if (text) {
      return text.replace(/<#([0-9A-Za-z]+)>/, (m, id) => channelLink(id))
        .replace(/<#([0-9A-Za-z]+)\|([0-9A-Za-z]+)>/gi, (m, id) => channelLink(id))
        .replace(/<@([0-9A-Za-z]+)>/gi, (m, id) => userLink(id))
        .replace(/<@([0-9A-Za-z]+)\|([0-9A-Za-z]+)>/gi, (m, id) => userLink(id))
        .replace(/<!(channel|everyone|group)>/gi, (m, command) => specialCommand(command))
        .replace(/<(https?:\/\/[^>]*)>/gi, (m, uri) => uriLink(entity(uri)));
    }
    return text;
  }
  messageLink(teamInfo, message) {
    const messageId = message.ts.replace('.', '');
    return `https://${teamInfo.domain}.slack.com/messages/${message.channel}/p${messageId}`;
  }
  handleClickChannel(e) {
    SlackActions.updateCurrentChannel({ channel: this.props.message.channel });
    e.preventDefault();
  }
  render() {
    let createMarkup = (text) => {
      return {
        __html: this.formatText(text) || ''
      };
    };
    let channelInfo = (message, showChannel) => {
      let channel = this.getChannel(message.channel);
      if (showChannel && channel) {
        return (
          <div className="slack-message-channel">
            <a href="#" onClick={this.handleClickChannel}>
              <ChannelName channel={channel} />
            </a>
          </div>
        );
      }
    };
    let messageDate = (teamInfo, message) => {
      return (
        <div className="slack-message-date">
          <a href={this.messageLink(teamInfo, message)} target="_blank">{this.formatDate(message.ts)}</a>
        </div>
      );
    };
    let botMessage = (teamInfo, message, showChannel) => {
      let attachment = _.find(message.attachments, (attachment) => attachment.text);
      let text = attachment ? attachment.text : message.text;
      let icon = message.icons ? message.icons.image_48 : (attachment ? attachment.author_icon : '');
      return (
        <div className="slack-message">
          <div className="slack-message-user-image">
            <img src={icon} />
          </div>
          <div className="slack-message-content">
            <div className="slack-message-user-name">{message.username}</div>
            {messageDate(teamInfo, message)}
            {channelInfo(message, showChannel)}
            <div className="slack-message-text"
              dangerouslySetInnerHTML={createMarkup(text)}></div>
          </div>
        </div>
      );
    };
    let normalMessage = (teamInfo, message, user, showChannel) => {
      return (
        <div className="slack-message">
          <div className="slack-message-user-image">
            <img src={user && user.profile.image_48} />
          </div>
          <div className="slack-message-content">
            <div className="slack-message-user-name">{user && user.name}</div>
            {messageDate(teamInfo, message)}
            {channelInfo(message, showChannel)}
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
    let showChannel = this.props.type === MessagesType.SEARCH_MESSAGES;
    switch (this.props.message.subtype) {
      case 'bot_message':
        return botMessage(this.props.teamInfo, message, showChannel);
        break;
      default:
        return normalMessage(this.props.teamInfo, message, this.getUser(message.user), showChannel);
        break;
    }
  }
}
