import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';
import _ from 'lodash';

let _messages = [];
let _members = {};
let _channels = {};
let _currentChannel = null;

let CHANGE_EVENT = Symbol();
let defaultChannelStorageKey = 'Slack.defaultChannel';

class SlackStore extends EventEmitter {
  getChannels() { return _channels; }
  getMembers() { return _members; }
  getMessages() { return _messages; }
  getCurrentChannel() { return _currentChannel; }
  initializeDefaultChannel() {
    let defaultChannel = window.localStorage.getItem(defaultChannelStorageKey);
    if (!defaultChannel) {
      this.setDefaultChannel(_.findKey(_channels));
    }
  }
  getDefaultChannel() {
    return window.localStorage.getItem(defaultChannelStorageKey);
  }
  setDefaultChannel(channel) {
    window.localStorage.setItem(defaultChannelStorageKey, channel);
  }
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
let slackStore = new SlackStore();

SlackDispatcher.register((action) => {
  switch(action.actionType) {
    case SlackConstants.UPDATE_MESSAGES:
      _messages = action.messages;
      slackStore.emitChange();
      break;
    case SlackConstants.UPDATE_MORE_MESSAGES:
      _messages = [...action.messages, ..._messages];
      slackStore.emitChange();
      break;
    case SlackConstants.UPDATE_MEMBERS:
      _members = action.members;
      slackStore.emitChange();
      break;
    case SlackConstants.UPDATE_CHANNELS:
      _channels = action.channels;
      slackStore.initializeDefaultChannel();
      slackStore.emitChange();
      break;
    case SlackConstants.UPDATE_CURRENT_CHANNEL:
      _currentChannel = action.currentChannel;
      slackStore.setDefaultChannel(_currentChannel);
      slackStore.emitChange();
      break;
  }
});

export default slackStore;
