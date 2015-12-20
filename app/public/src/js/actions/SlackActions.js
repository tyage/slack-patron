import $ from 'jquery';
import SlackDispatcher from '../dispatcher/SlackDispatcher';
import SlackConstants from '../constants/SlackConstants';
import MessagesType from '../constants/MessagesType';

let generateApiUrl = (url) => url + '?t=' + (new Date()).getTime();

// callback becomes callable if it is passed to this function last time
let _lastCallback;
let callableIfLast = (callback) => {
  _lastCallback = callback;
  return (...args) => {
    if (_lastCallback === callback) {
      callback(...args);
    }
  };
};

export default {
  getChannels() {
    $.get(generateApiUrl('./channels.json')).then((channels) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_CHANNELS,
        channels
      });
    });
  },
  getUsers() {
    $.get(generateApiUrl('./users.json')).then((users) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_USERS,
        users
      });
    });
  },
  getMessages(channel) {
    let updateMessage = callableIfLast((messages) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MESSAGES,
        messages,
        messagesInfo: {
          type: MessagesType.CHANNEL_MESSAGES,
          channel
        }
      });
    });

    let url = generateApiUrl('./messages/' + channel + '.json');
    $.post(url).then(updateMessage);
  },
  getMoreMessages(channel, minTs) {
    let updateMessage = callableIfLast((messages) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MORE_MESSAGES,
        messages,
        messagesInfo: {
          type: MessagesType.CHANNEL_MESSAGES,
          channel
        }
      });
    });

    let url = generateApiUrl('./messages/' + channel + '.json');
    $.post(url, { min_ts: minTs }).then(updateMessage);
  },
  updateCurrentChannel({ channel, pushState = true, replaceState = false }) {
    SlackDispatcher.dispatch({
      actionType: SlackConstants.UPDATE_CURRENT_CHANNEL,
      currentChannel: channel,
      option: { pushState, replaceState }
    });
  },
  getTeamInfo() {
    let url = generateApiUrl('./team.json');
    $.get(url).then((teamInfo) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_TEAM_INFO,
        teamInfo
      });
    });
  },
  importBackup(formData) {
    let url = generateApiUrl('./import_backup');
    $.ajax({
      url,
      method: 'post',
      data: formData,
      processData: false,
      contentType: false
    });
  },
  updateSearchWord(word) {
    SlackDispatcher.dispatch({
      actionType: SlackConstants.UPDATE_SEARCH_WORD,
      word
    });
  },
  search(word) {
    let updateMessage = callableIfLast((messages) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MESSAGES,
        messages,
        messagesInfo: {
          type: MessagesType.SEARCH_MESSAGES,
          searchWord: word
        }
      });
    });

    let url = generateApiUrl('./search');
    $.post(url, { word }).then(updateMessage);
  }
};
