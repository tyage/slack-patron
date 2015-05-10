import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';

// default channel is stored at localStorage
let defaultChannelStorageKey = 'Slack.defaultChannel';
let setDefaultChannel = (channel) => {
  window.localStorage.setItem(defaultChannelStorageKey, channel || '');
};
let getDefaultChannel = () => window.localStorage.getItem(defaultChannelStorageKey);

let _currentChannel = null;

let CHANGE_EVENT = Symbol();

class SlackCurrentChannelStore extends EventEmitter {
  getCurrentChannel() { return _currentChannel; }
  getDefaultChannel() { return getDefaultChannel(); }
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
let slackCurrentChannelStore = new SlackCurrentChannelStore();

SlackDispatcher.register((action) => {
  switch(action.actionType) {
    case SlackConstants.UPDATE_CURRENT_CHANNEL:
      _currentChannel = action.currentChannel;
      setDefaultChannel(_currentChannel);
      slackCurrentChannelStore.emitChange();
      break;
  }
});

export default slackCurrentChannelStore;
