import SlackConstants from '../constants/SlackConstants';
import MessagesType from '../constants/MessagesType';
import { push } from 'react-router-redux'
import 'whatwg-fetch'

const generateApiUrl = (url) => url + '?t=' + (new Date()).getTime();

// callback becomes callable if it is passed to this function last time
let _lastCallback;
const callableIfLast = (callback) => {
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
    return dispatch => (
      fetchJSON(generateApiUrl('channels.json')).then((channels) => {
        dispatch({
          type: SlackConstants.UPDATE_CHANNELS,
          channels
        });
      })
    );
  },
  getIms() {
    return dispatch => (
      fetchJSON(generateApiUrl('ims.json')).then((ims) => {
        dispatch({
          type: SlackConstants.UPDATE_IMS,
          ims
        });
      })
    );
  },
  getUsers() {
    return dispatch => (
      fetchJSON(generateApiUrl('users.json')).then((users) => {
        dispatch({
          type: SlackConstants.UPDATE_USERS,
          users
        });
      })
    );
  },
  getMessages(channel, ts) {
    return dispatch => {
      dispatch({
        type: SlackConstants.START_UPDATE_MESSAGES
      });

      const updateMessage = callableIfLast(({ messages, has_more_message: hasMoreMessage }) => {
        dispatch({
          type: SlackConstants.UPDATE_MESSAGES,
          messages,
          hasMoreMessage,
          messagesInfo: {
            type: MessagesType.CHANNEL_MESSAGES,
            channel
          }
        });
      });

      const url = generateApiUrl('messages/' + channel + '.json');
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: `ts=${ts}` // TODO: post as json format
      };
      fetchJSON(url, params).then(updateMessage);
    };
  },
  getMoreMessages(channel, minTs) {
    return dispatch => {
      const updateMessage = callableIfLast(({ messages, has_more_message: hasMoreMessage }) => {
        dispatch({
          type: SlackConstants.UPDATE_MORE_MESSAGES,
          messages,
          hasMoreMessage
        });
      });

      const url = generateApiUrl('messages/' + channel + '.json');
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: `min_ts=${minTs}` // TODO: post as json format
      };
      fetchJSON(url, params).then(updateMessage);
    };
  },
  getTeamInfo() {
    return (dispatch) => (
      fetchJSON(generateApiUrl('team.json')).then((teamInfo) => {
        dispatch({
          type: SlackConstants.UPDATE_TEAM_INFO,
          teamInfo
        });
      })
    );
  },
  importBackup(formData) {
    return dispatch => {
      const url = generateApiUrl('import_backup');
      fetchJSON(url, {
        method: 'post',
        body: formData
      });
    };
  },
  updateSearchWord(word) {
    return push(`/search/${encodeURIComponent(word)}`);
  },
  search(word) {
    return dispatch => {
      dispatch({
        type: SlackConstants.START_UPDATE_MESSAGES
      });

      const updateMessage = callableIfLast(({ messages, has_more_message: hasMoreMessage }) => {
        dispatch({
          type: SlackConstants.UPDATE_MESSAGES,
          messages,
          hasMoreMessage,
          messagesInfo: {
            type: MessagesType.SEARCH_MESSAGES,
            searchWord: word
          }
        });
      });

      const url = generateApiUrl('search');
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: `word=${encodeURIComponent(word)}` // TODO: post json format
      };
      fetchJSON(url, params).then(updateMessage);
    };
  },
  searchMore(word, minTs) {
    return dispatch => {
      const updateMessage = callableIfLast(({ messages, has_more_message: hasMoreMessage }) => {
        dispatch({
          type: SlackConstants.UPDATE_MORE_MESSAGES,
          messages,
          hasMoreMessage,
        });
      });

      const url = generateApiUrl('search');
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: `word=${encodeURIComponent(word)}&min_ts=${minTs}` // TODO: post json format
      };
      fetchJSON(url, params).then(updateMessage);
    };
  }
};
