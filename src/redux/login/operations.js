import { push } from 'connected-react-router';
import LOGIN_API from '../../api/login';
import http from '../../utils/http';
import actions from './actions';

const login = obj => {
  return async dispatch => {
    const api = LOGIN_API.login;
    const { username: loginName, password,sessionId,sig,token,scene} = obj;
    const result = await http[api.method](api.uri, {
      loginName,
      password,
      sessionId,
      sig,
      token,
      scene
    });

    dispatch(actions.login(result));
  };
};

const logout = () => {
  return async dispatch => {
    const api = LOGIN_API.logout;
    const result = await http[api.method](api.uri);
    // 如果成功、清理redux内容
    if (!result.errorCode) {
      dispatch(actions.logout({}));
    }
  };
};

const operations = {
  login,
  logout
};

export default operations;
