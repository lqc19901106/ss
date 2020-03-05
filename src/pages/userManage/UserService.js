import http from '../../utils/http';
// import {USER_API} from './api';

class UserService {
  constructor() {
    this.USER_API = {
      GET_USER_HOSPITALS: '/portal/users/hospitals',
      CREATE_USER: '/portal/users',
      GET_USER_LIST: '/portal/users/',
      UPDATE_USER: '/portal/users/{userId}',
      RESET_PASSWORD: '/portal/users/{userId}/reset_password',
      DELETE_USER: '/portal/users/{userId}',
      INIT_PASSWORD: '/portal/users/{userUuid}/init_password',
      CHANGE_PASSWORD: '/portal/users/{userUuid}/update_password'
    };
  }

  // eslint-disable-next-line class-methods-use-this
  getCookie(cookiename) {
    const name = `${cookiename}=`;
    const cs = document.cookie.split(';');
    for (let i = 0; i < cs.length; i += 1) {
      const c = cs[i].trim();
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
  }

  createUser(user) {
    return http.post(this.USER_API.CREATE_USER, user);
  }

  deleteUser(obj) {
    const {
      userUuid: userId
    } = obj;
    const url = this.USER_API.DELETE_USER.replace(/{userId}/g, userId);
    return http.delete(url);
  }

  getUserList() {
    return http.get(this.USER_API.GET_USER_LIST);
  }

  updateUser(user) {
    const {
      userUuid: userId
    } = user;
    const url = this.USER_API.UPDATE_USER.replace(/{userId}/g, userId);
    return http.put(url, user);
  }

  updatePassword(obj) {
    const {
      userUuid
    } = obj;
    const url = this.USER_API.RESET_PASSWORD.replace(/{userId}/g, userUuid);
    return http.post(url, obj);
  }

  changePassword(obj) {
    const {
      userUuid
    } = obj;
    const url = this.USER_API.CHANGE_PASSWORD.replace(/{userUuid}/g, userUuid);
    return http.post(url, obj);
  }

  initPassword(obj) {
    const {
      userUuid
    } = obj;
    const url = this.USER_API.INIT_PASSWORD.replace(/{userUuid}/g, userUuid);
    return http.post(url, obj);
  }

  getUserHospitals() {
    return http.get(this.USER_API.GET_USER_HOSPITALS);
  }

  // eslint-disable-next-line class-methods-use-this
  validateForm({
    loginName,
    userRole,
    hospitals,
    role
  }) {
    const errList = {
      userNameTip: [],
      userRoleTip: [],
      userHospitalTip: [],
      count: 0
    };
    if (!/^[a-zA-Z0-9]{1,30}$/.test(loginName)) {
      errList.userNameTip.push('userNameErr');
      errList.count += 1;
    }
    if (!userRole && role !== '1') {
      errList.userRoleTip.push('userRoleErr');
      errList.count += 1;
    }
    if (!hospitals.length) {
      errList.userHospitalTip.push('userHospitalErr');
      errList.count += 1;
    }
    return errList;
  }
}

export default new UserService();
