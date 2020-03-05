const LOGIN_API = {
  login: {
    method: 'post',
    uri: '/portal/sessions/_login'
  },
  logout: {
    method: 'post',
    uri: '/portal/sessions/_logout'
  },
  current: {
    method: 'get',
    uri: '/portal/sessions/_current'
  }
};

export default LOGIN_API;
