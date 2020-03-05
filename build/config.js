const path = require('path');

const config = {
  buildDetail: false,
  devServer: {
    contentBase: path.resolve('dist'),
    port: 2333,
    open: true,
    hot: true,
    host: '0.0.0.0',
    overlay: {
      errors: true,
      warnings: false
    },
    historyApiFallback: true,
    proxy: {
      '/portal': {
        target: 'http://192.168.111.115:3000/',
        changeOrigin: true,
        toProxy: true
      },
      '/viewer': {
        target: 'http://192.168.111.115:3000/',
        changeOrigin: true,
        toProxy: true
      },
      '/static': {
        target: 'http://192.168.111.115:3000/',
        changeOrigin: true,
        toProxy: true
      },
      '/api': {
        target: 'http://192.168.111.115:3000/',
        changeOrigin: true,
        toProxy: true
      },
      '/dicoms': {
        target: 'http://192.168.111.115:3000/',
        changeOrigin: true,
        toProxy: true
      },
      '/logger': {
        target: 'http://192.168.111.115:3000/',
        changeOrigin: true,
        toProxy: true
      }
    }
  },
  local: {
    API_PATH: '/api',
    SUB_DIR: 'static',
    PUBLIC_PATH: '/'
  },
  dev: {
    API_PATH: '/api',
    SUB_DIR: 'static',
    PUBLIC_PATH: '/'
  },
  test: {
    API_PATH: '/api',
    SUB_DIR: 'static',
    PUBLIC_PATH: '/'
  },
  prod: {
    API_PATH: '/api',
    SUB_DIR: 'static',
    PUBLIC_PATH: '/'
  }
};
module.exports = config;
