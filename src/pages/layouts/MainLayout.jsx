/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import Logo from '@/components/logo/index';
import { Layout, Menu } from 'antd';
import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './index.scss';
import PrivateRoute from './PrivateRoute';
import { BasicRouteConfig, MainRouteConfig } from './route.config';
import Logout from '../login/Logout';

const { Header, Content, Sider } = Layout;

const generateLoadableComponent = path => {
  return Loadable({
    loader: () => import(`./../${path}/index`),
    loading() {
      return <div>Loading...</div>;
    }
  });
};

const MenuCreator = props => {
  const basic = BasicRouteConfig;
  const main = MainRouteConfig;

  const menus = basic.concat(main);
  const { role } = props;

  const subMenu = arr => {
    arr = arr.filter(subItem => {
      return subItem.authorized && subItem.authorized.includes(role);
    });

    return arr.map(subItem => {
      return (
        <Menu.Item key={`${subItem.label}-subMenu`}>
          <Link to={`/main/${subItem.name}`}>
            <span style={{ color: '#fff' }}>{subItem.label}</span>
          </Link>
        </Menu.Item>
      );
    });
  };

  // 目前不存在三级菜单，生写
  const filterMenus = menus.filter(item => {
    return item.authorized && item.authorized.includes(role);
  });
  return filterMenus.map((item, index) => {
    if (item.hide) {
      return false;
    }

    const visible = item.authorized.includes(role);
    if (item.children && visible) {
      return (
        <Menu.SubMenu key={`${item.label}-sub`} title={item.label}>
          {subMenu(item.children)}
        </Menu.SubMenu>
      );
    }
    return visible ? (
      <Menu.Item key={`${item.name}-menu`}>
        <Link to={`/main/${item.name}`}>
          <span className="nav-text">
            <span style={{ color: '#fff' }}>{item.label}</span>
          </span>
        </Link>
      </Menu.Item>
    ) : (
      <React.Fragment key={`${item.name}-${item.index}`}></React.Fragment>
    );
  });
};

const MainLayout = props => {
  return (
    <Layout className="layoutWrap">
      <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => {}} onCollapse={(collapsed, type) => {}}>
        <Logo />
        <Menu theme="dark" mode="inline">
          {MenuCreator(props)}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Logout />
        </Header>
        <Content style={{ margin: '24px 16px 0', padding: 24, background: '#fff', display: 'flex' }}>
          {/* <div style={{ padding: 24, background: '#fff', minHeight: '100%', display: 'flex'}}> */}
          <Switch>
            <Route path="/main/404" component={generateLoadableComponent('notFound')} />
            {/* <Route path="/main/studyList" component={generateLoadableComponent('studyList')} /> */}
            <PrivateRoute path="/main/organizationList" component={generateLoadableComponent('organizationList')} />
            <PrivateRoute path="/main/studyList" component={generateLoadableComponent('studyList')} />
            <PrivateRoute path="/main/organizationManage" component={generateLoadableComponent('organizationManage')} />
            <PrivateRoute path="/main/userManage" component={generateLoadableComponent('userManage')} />
            <PrivateRoute exact path="/main" component={generateLoadableComponent('organizationList')} />
            <Redirect from="/main/login" to="/login" />
            <Redirect from="/*" to="/404" />
          </Switch>
          {/* </div> */}
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    role: state.user.userRole
  };
};

export default connect(mapStateToProps, null)(MainLayout);
