import SlackConstants from '../constants/SlackConstants';

const isSidebarActive = (state = false, action) => {
  switch (action.type) {
    case SlackConstants.OPEN_SIDEBAR:
      return true;
    case SlackConstants.CLOSE_SIDEBAR:
      return false;
    default:
      return state;
  }
};

export default isSidebarActive;
