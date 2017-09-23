import SlackConstants from '../constants/SlackConstants';

const teamInfo = (state = {}, action) => {
  switch (action.type) {
    case SlackConstants.UPDATE_TEAM_INFO:
      return action.teamInfo;
    default:
      return state;
  }
};

export default teamInfo;
