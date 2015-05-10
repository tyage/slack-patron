import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';

let _messages = [];

let CHANGE_EVENT = Symbol();

class SlackMessageStore extends EventEmitter {
  getMessages() { return _messages; }
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
      slackMessageStore.emitChange();
      break;
    case SlackConstants.UPDATE_MORE_MESSAGES:
      _messages = [...action.messages, ..._messages];
      slackMessageStore.emitChange();
      break;
  }
});

export default slackMessageStore;
