import SlackConstants from '../constants/SlackConstants';

const searchWord = (state = null, action) => {
  switch (action.type) {
    case SlackConstants.UPDATE_SEARCH_WORD:
      return action.word;
    default:
      return state;
  }
};

export default searchWord;
