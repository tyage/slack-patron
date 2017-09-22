import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';

let _searchWord = null;

let CHANGE_EVENT = Symbol();

class SearchWordStore extends EventEmitter {
  getSearchWord() { return _searchWord; }
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
let searchWordStore = new SearchWordStore();

SlackDispatcher.register((action) => {
  switch(action.actionType) {
    case SlackConstants.UPDATE_SEARCH_WORD:
      _searchWord = action.word;
      searchWordStore.emitChange();
      break;
  }
});

export default searchWordStore;
