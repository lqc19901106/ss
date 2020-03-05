import types from './types';

const setCurrentHospital = (hospitalInfo) => {
  return {
    type: types.SET_CURRENT_HOSPITAI,
    currentHospitalName: hospitalInfo.hospitalName,
    currentHospitalCode: hospitalInfo.hospitalCode
  };
};

const clearHospitalInfo = () => {
  return {
    type: types.CLEAR_HOSPITAL_INFO
  }
}

const actions = {
  setCurrentHospital,
  clearHospitalInfo,
};

export default actions;
