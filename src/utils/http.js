import { message } from 'antd';

const globalError = data => {
  if (data.status === 401 || data.status === 403) {
    message.error('您尚未登录，或者登录Session已失效，请您重新登录', 3000);

    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
  }
};
const request = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      ...options
    })
      .then(resp => {
        if (resp.status === 200 || resp.status === 400) {
          return resp.json();
        }
        globalError(resp);
        reject(resp);
        return false;
      })
      .then(data => {
        resolve(data);
      });
  });
};

const urlAppendParams = (url = '', params = {}) => {
  Object.keys(params).forEach(key => {
    if (url.indexOf('?') > -1) {
      url = `${url}&${key}=${params[key]}`;
    } else {
      url = `${url}?${key}=${params[key]}`;
    }
  });
  return url;
};

const get = (url, params = {}) => {
  return request(urlAppendParams(url, params), {
    method: 'GET'
  });
};

const post = (url, body = {}, params = {}) => {
  return request(urlAppendParams(url, params), {
    method: 'POST',
    body: JSON.stringify(body)
  });
};

const put = (url, body = {}, params = {}) => {
  return request(urlAppendParams(url, params), {
    method: 'PUT',
    body: JSON.stringify(body)
  });
};

const deleteFetch = (url, params = {}) => {
  return request(urlAppendParams(url, params), {
    method: 'DELETE'
  });
};

const http = {
  get,
  post,
  put,
  delete: deleteFetch
};
export default http;
