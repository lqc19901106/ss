import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { BasicRouteConfig, MainRouteConfig, SubRouteConfig } from './route.config';

const hasPermission = props => {
  const { isLogin, role, path } = props;
  if (!isLogin) {
    return false;
  }

  const routes = BasicRouteConfig.concat(MainRouteConfig).concat(SubRouteConfig);
  // 根据路由信息匹配 权限，查看是否有权限进行访问
  const flatChildren = arr => {
    return arr.map(item => {
      if (!item.children) {
        return item;
      }
      return flatChildren(item.children);
    });
  };

  const myFlat = arr => {
    return arr.reduce((prev, cur) => {
      return prev.concat(Array.isArray(cur) ? myFlat(cur) : cur);
    }, []);
  };

  const routeInfos = myFlat(flatChildren(routes));
  const canRoute = routeInfos.some(info => {
    if (info.url !== path) {
      return false;
    }

    if (!info.authorized) {
      return true;
    }

    if (info.authorized && info.authorized.includes(role)) {
      return true;
    }

    return false;
  });

  return canRoute;
};

const privateRoute = ({ component: Component, ...rest }) => {
  const { checkLogin } = rest;
  const routes = (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) =>
        hasPermission(rest) ? <Component /> : <Redirect to={{ pathname: '/login', state: { from: location } }} />}
    />
  );
  return !checkLogin && routes;
};

const mapStateToProps = state => {
  return {
    checkLogin: state.user.checkLogin,
    isLogin: state.user.isLogin,
    role: state.user.userRole
  };
};

export default connect(mapStateToProps, null)(privateRoute);
