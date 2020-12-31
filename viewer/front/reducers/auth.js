import AuthConstants from '../constants/AuthConstants';

const auth = (state = { isSignedIn: false }, action) => {
  switch (action.type) {
    case AuthConstants.SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
      };
    case AuthConstants.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
      };
    default:
      return state;
  }
};

export default auth;
