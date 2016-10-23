import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';

let baseUri = window.location.pathname.split('/');
baseUri.pop();
baseUri = baseUri.join('/');
let _currentChannel = null;
let setCurrentChannel = (channel, { pushState, replaceState }) => {
  _currentChannel = channel;
  let stateObj = { channel };
  let path = baseUri + '/' + channel;
  if (replaceState) {
    window.history.replaceState(stateObj, null, path);
  } else if (pushState) {
    window.history.pushState(stateObj, null, path);
  }
};
let getChannelFromPath = () => window.location.pathname.split('/').pop();

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
      setCurrentChannel(action.currentChannel, action.option);
      slackCurrentChannelStore.emitChange();
      break;
  }
});

export default slackCurrentChannelStore;
