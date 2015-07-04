import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';

let _teamInfo = {};

let CHANGE_EVENT = Symbol();

class SlackTeamStore extends EventEmitter {
  getTeamInfo() { return _teamInfo; }
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
let slackTeamStore = new SlackTeamStore();

SlackDispatcher.register((action) => {
  switch(action.actionType) {
    case SlackConstants.UPDATE_TEAM_INFO:
      _teamInfo = action.teamInfo;
      slackTeamStore.emitChange();
      break;
  }
});

export default slackTeamStore;
