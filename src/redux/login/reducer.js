import produce from 'immer';
import types from './types';

const INITIAL_STATE = {
  isLogin: -1,
  userRole: -1,
  isFirstLogin: 1,
  userName: '',
  loginName: '',
  loginFailed: undefined,
  errMsg: '',
  errCode: '',
  checkLogin: true,
  userUuid: ''
};

const reducer = (state = INITIAL_STATE, { type, ...payload }) => {
  switch (type) {
    case types.LOGIN:
      return produce(state, draft => {
        const { info } = payload;

        draft.isLogin = 1;

        if (info.errorCode) {
          draft.loginFailed = true;
          draft.errMsg = info.errMessage;
          draft.errCode = info.errorCode;
          return;
        }
        draft.userRole = info.userRole;
        draft.userName = info.userName;
        draft.isFirstLogin = info.isFirstLogin;
        draft.loginName = info.loginName;
        draft.userUuid = info.userUuid;
      });

    case types.LOGOUT:
      return {...INITIAL_STATE, checkLogin: false};
    case types.CHECK:
      return produce(state, draft => {
        draft.checkLogin = false;
      });
    default:
      return state;
  }
};

export default reducer;
