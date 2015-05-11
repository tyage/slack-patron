import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';

let _currentChannel = null;
let setCurrentChannel = (channel) => {
  _currentChannel = channel;
  window.history.pushState({ channel }, null, '/' + channel);
};
let getChannelFromPath = () => window.location.pathname.slice(1);

let CHANGE_EVENT = Symbol();

class SlackCurrentChannelStore extends EventEmitter {
  getCurrentChannel() { return _currentChannel; }
  getChannelFromPath() { return getChannelFromPath(); }
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
      setCurrentChannel(action.currentChannel);
      slackCurrentChannelStore.emitChange();
      break;
  }
});

export default slackCurrentChannelStore;
