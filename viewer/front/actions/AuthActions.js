import AuthConstants from '../constants/AuthConstants';

export default {
  changeAuthState(user) {
    return dispatch => {
      user ?
        dispatch({
          type: AuthConstants.SIGN_IN,
        }) :
        dispatch({
          type: AuthConstants.SIGN_OUT,
        })
    }
  }
};
