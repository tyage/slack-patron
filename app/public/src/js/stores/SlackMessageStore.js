import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';

let _messages = [];
let _hasMoreMessages = true;
let _messagesType = null;

let CHANGE_EVENT = Symbol();

class SlackMessageStore extends EventEmitter {
  getMessages() { return _messages; }
  hasMoreMessages() { return _hasMoreMessages; }
  messagesType() { return _messagesType; }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}
let slackMessageStore = new SlackMessageStore();

SlackDispatcher.register((action) => {
  switch(action.actionType) {
    case SlackConstants.UPDATE_MESSAGES:
      _messages = action.messages;
      _hasMoreMessages = true;
      _messagesType = SlackConstants.CHANNEL_MESSAGES;
      slackMessageStore.emitChange();
      break;
    case SlackConstants.UPDATE_MORE_MESSAGES:
      _messages = [...action.messages, ..._messages];
      _hasMoreMessages = action.messages.length > 0;
      _messagesType = SlackConstants.CHANNEL_MESSAGES;
      slackMessageStore.emitChange();
      break;
    case SlackConstants.UPDATE_SEARCH_RESULT:
      _messages = action.messages;
      _hasMoreMessages = true;
      _messagesType = SlackConstants.SEARCH_MESSAGES;
      slackMessageStore.emitChange();
      break;
  }
});

export default slackMessageStore;
