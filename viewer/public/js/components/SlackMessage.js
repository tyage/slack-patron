import React, { Component } from 'react';
import ChannelName from './ChannelName';
import { Link } from 'react-router-dom';
import MessagesType from '../constants/MessagesType';

export default class extends Component {
  getChannel(id) {
    const channels = this.props.channels;
    const ims = this.props.ims;
    if (channels && channels[id]) {
      return channels[id];
    }
    if (ims && ims[id]) {
      return ims[id];
    }
  }
  getUser(id) {
    const users = this.props.users;
    return users && users[id];
  }
  formatDate(date) {
    return new Date(date * 1000).toLocaleString();
  }
  formatText(text) {
    const entity = (str) => {
      return str.replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    };
    const channelLink = (id) => {
      const channel = this.getChannel(id);
      return `#${channel && channel.name}`;
    };
    const userLink = (id) => {
      const user = this.getUser(id);
      return `@${user && user.name}`;
    };
    const specialCommand = (command) => `@${command}`;
    const uriLink = (uri) => `<a href="${uri}" target="_blank">${uri}</a>`;
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
  messageLink(message) {
    return `/${message.channel}/${message.ts}`;
  }
  originalMessageLink(teamInfo, message) {
    const messageId = message.ts.replace('.', '');
    return `https://${teamInfo.domain}.slack.com/messages/${message.channel}/p${messageId}`;
  }
  render() {
    const createMarkup = (text) => {
      return {
        __html: this.formatText(text) || ''
      };
    };
    const SlackMessagePrototype = ({ message, icon, username, showChannel, teamInfo, text }) => {
      const channel = this.getChannel(message.channel);

      return (
        <div className="slack-message" ref={this.props.messageRef}>
          <div className="slack-message-user-image">
            <img src={icon} />
          </div>
          <div className="slack-message-content">
            <div className="slack-message-user-name">{username}</div>
            <div className="slack-message-date">
              <Link to={this.messageLink(message)}>
                {this.formatDate(message.ts)}
              </Link>
            </div>
            { showChannel && channel ? (
                <div className="slack-message-channel">
                  <Link to={ `/${channel.id}` }>
                    <ChannelName channel={channel} />
                  </Link>
                </div>
              ) : null }
            <a href={this.originalMessageLink(teamInfo, message)} target="_blank">original</a>
            <div className="slack-message-text"
              dangerouslySetInnerHTML={createMarkup(text)}></div>
          </div>
        </div>
      );
    };
    const botMessage = (teamInfo, message, showChannel) => {
      const attachment = _.find(message.attachments, (attachment) => attachment.text);
      const text = attachment ? attachment.text : message.text;
      const icon = message.icons ? message.icons.image_48 : (attachment ? attachment.author_icon : '');
      return <SlackMessagePrototype
          message={message}
          icon={icon}
          username={message.username}
          showChannel={showChannel}
          teamInfo={teamInfo}
          text={text}
        />
    };
    const normalMessage = (teamInfo, message, user, showChannel) => {
      return <SlackMessagePrototype
          message={message}
          icon={user && user.profile.image_48}
          username={user && user.name}
          showChannel={showChannel}
          teamInfo={teamInfo}
          text={message.text}
        />
    };

    if (this.props.message.hidden) {
      return null;
    }

    const message = this.props.message;
    const showChannel = this.props.type === MessagesType.SEARCH_MESSAGES;
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
