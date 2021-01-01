import SlackConstants from '../constants/SlackConstants';

const messages = (state = { messages: [], hasMorePastMessage: false, hasMoreFutureMessage: false, messagesInfo: {} }, action) => {
  switch (action.type) {
    case SlackConstants.UPDATE_MESSAGES:
      return {
        messages: action.messages,
        hasMorePastMessage: action.hasMorePastMessage,
        hasMoreFutureMessage: action.hasMoreFutureMessage,
        messagesInfo: action.messagesInfo
      };
    case SlackConstants.UPDATE_MORE_PAST_MESSAGES:
      return {
        ...state,
        messages: [...action.messages, ...state.messages],
        hasMorePastMessage: action.hasMoreMessage
      };
    case SlackConstants.UPDATE_MORE_FUTURE_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...action.messages],
        hasMoreFutureMessage: action.hasMoreMessage
      };
    default:
      return state;
  }
};

export default messages;
