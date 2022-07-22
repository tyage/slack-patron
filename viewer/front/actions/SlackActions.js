import SlackConstants from '../constants/SlackConstants';
import MessagesType from '../constants/MessagesType';
import { push } from 'connected-react-router'
import 'whatwg-fetch'
import {Uint8ArrayReader, ZipReader} from "@zip.js/zip.js";
import {db} from '../databases/messages';

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

export default {
  getChannels() {
    return async dispatch => {
      const channels = await db.channels.toArray();
      dispatch({
        type: SlackConstants.UPDATE_CHANNELS,
        channels
      });
    };
  },
  getIms() {
    return dispatch => { 
      // noop
     };
  },
  getUsers() {
    return async dispatch => { 
      const users = await db.users.toArray();
      dispatch({
        type: SlackConstants.UPDATE_USERS,
        users: Object.assign({}, ...users.map(user => ({[user.id]: user}))),
      });
     };
  },
  getEmojis() {
    return dispatch => { 
      // noop
    };
  },
  getAroundMessages(channel, ts) {
    return async dispatch => {
      dispatch({
        type: SlackConstants.START_UPDATE_MESSAGES
      });

      const updateMessage = callableIfLast(({ messages, has_more_past_message: hasMorePastMessage, has_more_future_message: hasMoreFutureMessage }) => {
        dispatch({
          type: SlackConstants.UPDATE_MESSAGES,
          messages,
          hasMorePastMessage,
          hasMoreFutureMessage,
          messagesInfo: {
            type: MessagesType.CHANNEL_MESSAGES,
            channel
          }
        });
      });

      // https://dexie.org/docs/Collection/Collection.offset()#a-better-paging-approach
      const fastForward = (lastTs, otherCriteria, inclusive = false) => {
        let fastForwardComplete = false;
        return item => {
          if (fastForwardComplete) return otherCriteria(item);
          if (item.ts === lastTs) {
            fastForwardComplete = true;
            if (inclusive) {
              return otherCriteria(item);
            }
          }
          return false;
        };
      }

      const pastMessages = await db.messages
        .orderBy('ts').reverse()
        .filter(fastForward(ts, (message) => message.channel === channel, true))
        .limit(51)
        .toArray();
      const hasMorePastMessage = pastMessages.length > 50;

      const futureMessages = await db.messages
        .orderBy('ts')
        .filter(fastForward(ts, (message) => message.channel === channel))
        .limit(51)
        .toArray();
      const hasMoreFutureMessage = futureMessages.length > 50;
     
      updateMessage({
        messages: pastMessages.reverse().slice(-50).concat(futureMessages.slice(0, 50)),
        has_more_past_message: hasMorePastMessage,
        has_more_future_message: hasMoreFutureMessage,
      });
    };
  },
  getMessages(channel) {
    return async dispatch => {
      dispatch({
        type: SlackConstants.START_UPDATE_MESSAGES
      });

      const updateMessage = callableIfLast(({ messages, has_more_message: hasMoreMessage }) => {
        dispatch({
          type: SlackConstants.UPDATE_MESSAGES,
          messages,
          hasMorePastMessage: hasMoreMessage,
          messagesInfo: {
            type: MessagesType.CHANNEL_MESSAGES,
            channel
          }
        });
      });

      const messages = await db.messages
        .orderBy('ts').reverse()
        .filter((message) => message.channel === channel)
        .limit(101)
        .toArray();
      console.log(messages);
      const hasMoreMessage = messages.length > 100;
      
      updateMessage({messages: messages.reverse().slice(-100), has_more_message: hasMoreMessage});
    };
  },
  getMoreMessages(channel, { isPast, limitTs }) {
    return async dispatch => {
      const updateMessage = callableIfLast(({ messages, has_more_message: hasMoreMessage }) => {
        dispatch({
          type: isPast ? SlackConstants.UPDATE_MORE_PAST_MESSAGES : SlackConstants.UPDATE_MORE_FUTURE_MESSAGES,
          messages,
          hasMoreMessage
        });
      });

      // https://dexie.org/docs/Collection/Collection.offset()#a-better-paging-approach
      const fastForward = (lastTs, otherCriteria) => {
        let fastForwardComplete = false;
        return item => {
          if (fastForwardComplete) return otherCriteria(item);
          if (item.ts === lastTs) {
            fastForwardComplete = true;
          }
          return false;
        };
      }

      const messages = await (
        isPast
          ? db.messages
            .orderBy('ts').reverse()
            .filter(fastForward(limitTs, (message) => message.channel === channel))
            .limit(101)
            .toArray()
          : db.messages
            .orderBy('ts')
            .filter(fastForward(limitTs, (message) => message.channel === channel))
            .limit(101)
            .toArray()
      );
      const hasMoreMessage = messages.length > 100;
      
      updateMessage({messages: messages.reverse().slice(-100), has_more_message: hasMoreMessage});
    };
  },
  getThreadMessages(threadTs) {
    return async dispatch => {
      const updateMessage = callableIfLast(({ messages }) => {
        dispatch({
          type: SlackConstants.UPDATE_MESSAGES,
          messages,
          hasMorePastMessage: false,
          hasMoreFutureMessage: false,
          messagesInfo: {
            type: MessagesType.THREAD_MESSAGES,
            threadTs,
          }
        });
      });

      const messages = await db.messages
        .where('thread_ts').equals(threadTs)
        .sortBy('ts');
      
      updateMessage({messages});
    };
  },
  getTeamInfo() {
    return (dispatch) => { 
      // noop
    };
  },
  importBackup(formData) {
    return dispatch => {
      const file = formData.get('file');
      const reader = new FileReader();

      reader.addEventListener('load', async (event) => {
        const arrayBuffer = event.target.result;
        const zipReader = new ZipReader(new Uint8ArrayReader(new Uint8Array(arrayBuffer)));
        const entries = (await zipReader.getEntries()).filter((entry) => entry.filename.endsWith('.json'));
        await zipReader.close();

        const channelIds = new Map();

        {
          const channelsEntry = entries.find((entry) => entry.filename === 'channels.json');
          const contentStream = new TransformStream();
          const contentTextPromise = new Response(contentStream.readable).text();

          await channelsEntry.getData(contentStream);

          const contentText = await contentTextPromise;
          const channels = JSON.parse(contentText);

          for (const channel of channels) {
            channelIds.set(channel.name, channel.id)
          }
        }

        for (const entry of entries) {
          const filename = new TextDecoder().decode(entry.rawFilename);
          dispatch({
            type: SlackConstants.UPDATE_IMPORT_MESSAGE,
            text: `Importing ${filename}...`,
          });

          const contentStream = new TransformStream();
          const contentTextPromise = new Response(contentStream.readable).text();

          await entry.getData(contentStream);

          const contentText = await contentTextPromise;
          const contents = JSON.parse(contentText);

          for (const content of contents) {
            try {
              if (filename === 'channels.json') {
                await db.channels.add(content);
              } else if (filename === 'users.json') {
                await db.users.add(content);
              } else if (filename.includes('/')) {
                const channelName = filename.split('/')[0];
                const channelId = channelIds.get(channelName);
                await db.messages.add({...content, channel: channelId});
              } else {
                continue;
              }
            } catch (e) {
            }
          }
        }

        dispatch({
          type: SlackConstants.UPDATE_IMPORT_MESSAGE,
          text: 'Complete!',
        });

        location.reload(true);
      });

      reader.readAsArrayBuffer(file);
    }
  },
  openSidebar() {
    return dispatch => {
      // noop
    };
  },
  closeSidebar() {
    return dispatch => {
      // noop
    };
  },
  updateSearchWord(word) {
    return push(`/search/${encodeURIComponent(word)}`);
  },
  search(word) {
    return dispatch => {
      // noop
    };
  },
  searchMore(word, { isPast, limitTs }) {
    return dispatch => {
      // noop
    };
  }
};
