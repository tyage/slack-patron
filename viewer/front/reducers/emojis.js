import SlackConstants from '../constants/SlackConstants';

const emojis = (state = {}, action) => {
  switch (action.type) {
    case SlackConstants.UPDATE_EMOJIS:
      return action.emojis;
    default:
      return state;
  }
};

export default emojis;
