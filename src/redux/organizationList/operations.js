import actions from './actions';

const setCurrentHospital = hospitalInfo => {
  return async dispatch => {
    dispatch(actions.setCurrentHospital(hospitalInfo))
  }
}

const clearHospitalInfo = () => {
  return async dispatch => {
    dispatch(actions.clearHospitalInfo())
  }
}

const operations = {
  setCurrentHospital,
  clearHospitalInfo,
};

export default operations;
