import SlackConstants from '../constants/SlackConstants';

const channels = (state = { channels: [], ims: [] }, action) => {
  switch (action.type) {
    case SlackConstants.UPDATE_CHANNELS:
      return {
        ...state,
        channels: action.channels
      };
    case SlackConstants.UPDATE_IMS:
      return {
        ...state,
        ims: action.ims
      };
    default:
      return state;
  }
};

export default channels;
