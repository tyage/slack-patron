import SlackConstants from '../constants/SlackConstants';

const messages = (state = { messages: [], hasMoreMessage: true, messagesInfo: {} }, action) => {
  switch (action.type) {
    case SlackConstants.UPDATE_MESSAGES:
      return {
        messages: action.messages,
        hasMoreMessage: action.hasMoreMessage,
        messagesInfo: action.messagesInfo
      };
    case SlackConstants.UPDATE_MORE_MESSAGES:
      return {
        ...state,
        messages: [...action.messages, ...state.messages],
        hasMoreMessage: action.hasMoreMessage
      };
    default:
      return state;
  }
};

export default messages;
