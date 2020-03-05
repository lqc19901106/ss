const USER_API = {
  GET_USER_HOSPITALS: '/portal/users/hospitals',
  CREATE_USER: '/portal/users',
  GET_USER_LIST: '/portal/users/',
  UPDATE_USER: '/portal/users/{userId}',
  RESET_PASSWORD: '/portal/users/{userId}/reset_password',
  DELETE_USER: '/portal/users/{userId}',
  INIT_PASSWORD: '/portal/users/{userId}/users/{userUuid}/init_password'
};

export default USER_API;
