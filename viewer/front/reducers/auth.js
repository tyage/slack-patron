import AuthConstants, {} from '../constants/AuthConstants';
import AuthStatus from '../constants/AuthStatus';

const auth = (state = { status: AuthStatus.loading }, action) => {
  switch (action.type) {
    case AuthConstants.SIGN_IN:
      return {
        ...state,
        status: AuthStatus.signedIn,
      };
    case AuthConstants.SIGN_OUT:
      return {
        ...state,
        status: AuthStatus.signedOut,
      };
    default:
      return state;
  }
};

export default auth;
