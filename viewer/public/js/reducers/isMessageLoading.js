import SlackConstants from '../constants/SlackConstants';

const channels = (state = false, action) => {
  switch (action.type) {
    case SlackConstants.START_UPDATE_MESSAGES:
      return true;
    case SlackConstants.UPDATE_MESSAGES:
      return false;
    default:
      return state;
  }
}

export default channels;
