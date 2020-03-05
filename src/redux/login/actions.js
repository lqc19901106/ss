import types from './types';

const login = userInfo => {
  return {
    type: types.LOGIN,
    info: userInfo
  }
}

const logout = () => {
  return {
    type: types.LOGOUT
  }
}

const check = () => {
  return {
    type: types.CHECK
  }
}


export default {
  login,
  logout,
  check
}
