import types from './types';

const INITIAL_STATE = {

};

const reducer = (state = INITIAL_STATE, { type, ...payload }) => {
  return { ...state };
};

export default reducer;
