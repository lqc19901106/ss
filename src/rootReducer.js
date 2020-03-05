import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import loginReducer from './redux/login/reducer';
import userReducer from './redux/userManager/reducer';
import hospitalReduce from './redux/organizationList/reducer'

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: loginReducer,
    userManage: userReducer,
    hospitalList: hospitalReduce
  });

export default createRootReducer;
