import types from './types';

const testAA = () => {
  return {
    type: types.AA
  };
};

const testBB = param => {
  return {
    type: types.BB,
    ...param
  };
};

const actions = {
  testAA,
  testBB
};

export default actions;
