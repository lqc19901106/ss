import actions from './actions';
import types from './types'

const INITIAL_HOSPITAL = {
  currentHospitalName: '',
  currentHospitalCode: ''
};

const userReducer = (state = INITIAL_HOSPITAL, { type, ...payload }) => {
  switch(type) {
    case types.SET_CURRENT_HOSPITAI:
      return {
        ...state,
        ...payload
      };
    case types.CLEAR_HOSPITAL_INFO:
      return{
        INITIAL_HOSPITAL
      }
    default: 
    return state
  }
  
};

export default userReducer;
