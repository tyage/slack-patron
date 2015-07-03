import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';

let _loggerStatus = null;

let CHANGE_EVENT = Symbol();

class LoggerStatusStore extends EventEmitter {
  getLoggerStatus() { return _loggerStatus; }
  emitChange() { this.emit(CHANGE_EVENT); }
  addChangeListener(callback) { this.on(CHANGE_EVENT, callback); }
  removeChangeListener(callback) { this.removeListener(CHANGE_EVENT, callback); }
}
let loggerStatusStore = new LoggerStatusStore();

SlackDispatcher.register((action) => {
  switch(action.actionType) {
    case SlackConstants.UPDATE_LOGGER_STATUS:
      _loggerStatus = action.status;
      loggerStatusStore.emitChange();
      break;
  }
});

export default loggerStatusStore;
