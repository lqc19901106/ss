import produce from 'immer';
import types from './types';

const INITIAL_USER_STATE = {
  username: ''
};

const userReducer = (state = INITIAL_USER_STATE, { action, ...payload }) => {
  return {...state};
};

// https://juejin.im/post/5c079f9b518825689f1b4e88
// const userReducer = produce((draftState = INITIAL_USER_STATE, { type, ...payload }) => {
//   switch (type) {
//     case types.AA:
//       draftState.username = 'a';
//       break;
//     case types.BB:
//       break;
//     default:
//       break;
//   }
// });

export default userReducer;
