import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';
import _ from 'lodash';

let _channels = {};
let _currentChannel = null;

let CHANGE_EVENT = Symbol();
let defaultChannelStorageKey = 'Slack.defaultChannel';

class SlackChannelStore extends EventEmitter {
  getChannels() { return _channels; }
  getCurrentChannel() { return _currentChannel; }
  initializeDefaultChannel() {
    let defaultChannel = window.localStorage.getItem(defaultChannelStorageKey);
    if (!defaultChannel) {
      let channel = _.findKey(_channels);
      this.setDefaultChannel(channel);
    }
  }
  getDefaultChannel() {
    return window.localStorage.getItem(defaultChannelStorageKey);
  }
  setDefaultChannel(channel) {
    window.localStorage.setItem(defaultChannelStorageKey, channel || '');
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
let slackChannelStore = new SlackChannelStore();

SlackDispatcher.register((action) => {
  switch(action.actionType) {
    case SlackConstants.UPDATE_CHANNELS:
      _channels = action.channels;
      slackChannelStore.initializeDefaultChannel();
      slackChannelStore.emitChange();
      break;
    case SlackConstants.UPDATE_CURRENT_CHANNEL:
      _currentChannel = action.currentChannel;
      slackChannelStore.setDefaultChannel(_currentChannel);
      slackChannelStore.emitChange();
      break;
  }
});

export default slackChannelStore;
