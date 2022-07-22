import SlackConstants from '../constants/SlackConstants';

const importMessage = (state = '', action) => {
  switch (action.type) {
    case SlackConstants.UPDATE_IMPORT_MESSAGE:
      return action.text;
    default:
      return state;
  }
};

export default importMessage;
