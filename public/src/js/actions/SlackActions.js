import $ from 'jquery';
import SlackDispatcher from '../dispatcher/SlackDispatcher';
import SlackConstants from '../constants/SlackConstants';

let generateApiUrl = (url) => url + '?t=' + (new Date()).getTime();

export default {
  getChannels() {
    $.get(generateApiUrl('/channels.json')).then((channels) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_CHANNELS,
        channels
      });
    });
  },
  getMembers() {
    $.get(generateApiUrl('/members.json')).then((members) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MEMBERS,
        members
      });
    });
  },
  getMessages(channel) {
    let url = generateApiUrl('/messages/' + channel + '.json');
    $.post(url).then((messages) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MESSAGES,
        messages
      });
    });
  },
  getMoreMessages(channel, minTs) {
    let url = generateApiUrl('/messages/' + channel + '.json');
    $.post(url, { minTs }).then((messages) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MORE_MESSAGES,
        messages
      });
    });
  },
  updateCurrentChannel(channel) {
    SlackDispatcher.dispatch({
      actionType: SlackConstants.UPDATE_CURRENT_CHANNEL,
      currentChannel: channel
    });

    this.getMessages(channel);
  }
};