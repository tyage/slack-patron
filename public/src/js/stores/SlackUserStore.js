import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';

let _members = {};

let CHANGE_EVENT = Symbol();

class SlackUserStore extends EventEmitter {
  getMembers() { return _members; }
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
let slackUserStore = new SlackUserStore();

SlackDispatcher.register((action) => {
  switch(action.actionType) {
    case SlackConstants.UPDATE_MEMBERS:
      _members = action.members;
      slackUserStore.emitChange();
      break;
  }
});

export default slackUserStore;
