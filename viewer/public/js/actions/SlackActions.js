import SlackConstants from '../constants/SlackConstants';
import MessagesType from '../constants/MessagesType';
import 'whatwg-fetch'

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

const fetchJSON = (url, params) => {
  return fetch(url, params).then(res => res.json());
};

export default {
  getChannels() {
    fetchJSON(generateApiUrl('./channels.json')).then((channels) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_CHANNELS,
        channels
      });
    });
  },
  getIms() {
    fetchJSON(generateApiUrl('./ims.json')).then((ims) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_IMS,
        ims
      });
    });
  },
  getUsers() {
    return (dispatch) => (
      fetchJSON(generateApiUrl('./users.json')).then((users) => {
        dispatch({
          type: SlackConstants.UPDATE_USERS,
          users
        });
      })
    );
  },
  getMessages(channel) {
    let updateMessage = callableIfLast(({ messages, has_more_message: hasMoreMessage }) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MESSAGES,
        messages,
        hasMoreMessage,
        messagesInfo: {
          type: MessagesType.CHANNEL_MESSAGES,
          channel
        }
      });
    });

    let url = generateApiUrl('./messages/' + channel + '.json');
    fetchJSON(url, { method: 'POST' }).then(updateMessage);
  },
  getMoreMessages(channel, minTs) {
    let updateMessage = callableIfLast(({ messages, has_more_message: hasMoreMessage }) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MORE_MESSAGES,
        messages,
        hasMoreMessage,
        messagesInfo: {
          type: MessagesType.CHANNEL_MESSAGES,
          channel
        }
      });
    });

    let url = generateApiUrl('./messages/' + channel + '.json');
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: `min_ts=${minTs}` // TODO: post json format
    };
    fetchJSON(url, params).then(updateMessage);
  },
  updateCurrentChannel({ channel, pushState = true, replaceState = false }) {
    SlackDispatcher.dispatch({
      actionType: SlackConstants.UPDATE_CURRENT_CHANNEL,
      currentChannel: channel,
      option: { pushState, replaceState }
    });
  },
  getTeamInfo() {
    return (dispatch) => (
      fetchJSON(generateApiUrl('./team.json')).then((teamInfo) => {
        dispatch({
          type: SlackConstants.UPDATE_TEAM_INFO,
          teamInfo
        });
      })
    );
  },
  importBackup(formData) {
    let url = generateApiUrl('./import_backup');
    fetchJSON(url, {
      method: 'post',
      body: formData
    });
  },
  updateSearchWord(word) {
    SlackDispatcher.dispatch({
      actionType: SlackConstants.UPDATE_SEARCH_WORD,
      word
    });
  },
  search(word) {
    let updateMessage = callableIfLast(({ messages, has_more_message: hasMoreMessage }) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MESSAGES,
        messages,
        hasMoreMessage,
        messagesInfo: {
          type: MessagesType.SEARCH_MESSAGES,
          searchWord: word
        }
      });
    });

    let url = generateApiUrl('./search');
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: `word=${encodeURIComponent(word)}` // TODO: post json format
    };
    fetchJSON(url, params).then(updateMessage);
  },
  searchMore(word, minTs) {
    let updateMessage = callableIfLast(({ messages, has_more_message: hasMoreMessage }) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MORE_MESSAGES,
        messages,
        hasMoreMessage,
        messagesInfo: {
          type: MessagesType.SEARCH_MESSAGES,
          searchWord: word
        }
      });
    });

    let url = generateApiUrl('./search');
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: `word=${encodeURIComponent(word)}&min_ts=${minTs}` // TODO: post json format
    };
    fetchJSON(url, params).then(updateMessage);
  }
};
