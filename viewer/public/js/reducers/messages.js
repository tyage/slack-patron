import SlackConstants from '../constants/SlackConstants';

const users = (state = { messages: [], hasMoreMessage: true, messagesInfo: {} }, action) => {
  switch (action.type) {
    case SlackConstants.UPDATE_MESSAGES:
      return {
        messages: action.messages,
        hasMoreMessage: action.hasMoreMessage,
        messagesInfo: action.messagesInfo
      };
    default:
      return state;
  }
}

export default users;
