import SlackConstants from '../constants/SlackConstants';

const users = (state = {}, action) => {
  switch (action.type) {
    case SlackConstants.UPDATE_USERS:
      return action.users;
    default:
      return state;
  }
};

export default users;
