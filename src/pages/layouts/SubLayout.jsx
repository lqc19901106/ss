/* eslint-disable no-unused-vars */
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import Logo from '../../components/logo/index';
import { BasicRouteConfig, SubRouteConfig } from './route.config';
import PrivateRoute from './PrivateRoute';
import HospitalInfo from './HospitaInfo';
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
  const sub = SubRouteConfig;

  const menus = basic.concat(sub);
  const { role } = props;

  const subMenu = arr => {
    arr = arr.filter(subItem => {
      return subItem.authorized && subItem.authorized.includes(role);
    });

    return arr.map((subItem, index) => {
      return (
        <Menu.Item key={subItem.label}>
          <Link to={`/sub/${subItem.name}`}>
            <span>{subItem.label}</span>
          </Link>
        </Menu.Item>
      );
    });
  };

  const filterMenus = menus.filter(item => {
    return item.authorized && item.authorized.includes(role);
  });
  // 目前不存在三级菜单，生写
  return filterMenus.map((item, index) => {
    if (item.hide) {
      return false;
    }

    const visible = item.authorized.includes(role);
    if (item.children && visible) {
      return (
        <Menu.SubMenu key={item.label} title={item.label}>
          {subMenu(item.children)}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item key={item.name}>
        <span className="nav-text">
          <Link to={`/sub/${item.name}`}>
            <span>{item.label}</span>
          </Link>
        </span>
      </Menu.Item>
    );
  });
};

const SubLayout = props => {
  return (
    <Layout className="layoutWrap">
      <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => {}} onCollapse={(collapsed, type) => {}}>
        <Logo />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
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
            justifyContent: 'space-between'
          }}
        >
          <HospitalInfo />
          <Logout />
        </Header>
        <Content style={{ margin: '24px 16px 0', padding: 24, background: '#fff', display: 'flex', flex: 1 }}>
          {/* <div style={{ padding: 24, background: '#fff', display: 'flex' }}> */}
          <Switch>
            <PrivateRoute path="/sub/click" component={generateLoadableComponent('click')} />
            <PrivateRoute path="/sub/prediction" component={generateLoadableComponent('prediction')} />
            <PrivateRoute path="/sub/service" component={generateLoadableComponent('service')} />
            <PrivateRoute path="/sub/network" component={generateLoadableComponent('network')} />
            <PrivateRoute path="/sub/hardware" component={generateLoadableComponent('hardware')} />
            <PrivateRoute path="/sub/studylist" component={generateLoadableComponent('studyList')} />
            <PrivateRoute path="/sub/config/global" component={generateLoadableComponent('config/global')} />
            <PrivateRoute path="/sub/config/lung" component={generateLoadableComponent('config/lung')} />
            <PrivateRoute path="/sub/upload" component={generateLoadableComponent('upload')} />
            <PrivateRoute path="/sub" component={generateLoadableComponent('click')} />
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

export default connect(mapStateToProps, null)(SubLayout);
