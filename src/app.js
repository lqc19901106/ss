import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import LOGIN_API from './api/login';
import './index.global.scss';
import Unauthorized from './pages/authorized/index';
import { MainLayout, SubLayout } from './pages/layouts';
import Login from './pages/login/index';
import InitPassword from './pages/login/initPassword';
import NotFound from './pages/notFound/index';
import actions from './redux/login/actions';
import http from './utils/axios';

const getCurrent = async () => {
  const api = LOGIN_API.current;
  const result = await http[api.method](api.uri);
  return result;
};

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      const { userRole, userName, loginName, userUuid } = userInfo;
      dispatch(
        actions.login({
          userRole,
          userName,
          isFirstLogin: 0,
          loginName,
          userUuid
        })
      );
      dispatch(actions.check());
    }
  }, [userInfo]);

  useEffect(() => {
    getCurrent()
      .then(res => {
        setUserInfo(res.data);
      })
      .catch(() => {
        dispatch(actions.check());
      });
  }, []);

  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/main/organizationList" />
        <Route path="/main" component={MainLayout} />
        <Route path="/sub" component={SubLayout} />
        <Route path="/login" component={Login} />
        <Route path="/initPassword" component={InitPassword} />
        <Route path="/401" component={Unauthorized} />
        <Route path="/404" component={NotFound} />
        <Redirect from="/*" to="/login" />
      </Switch>
    </Router>
  );
};

export default hot(withRouter(App));
