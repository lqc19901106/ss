import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu, Dropdown, Button, Icon, Modal } from 'antd';
import { operations as loginOperations } from '../../redux/login';
import { operations as organizationListOperations } from '../../redux/organizationList';
import ChangePassword from '../userManage/ChangePassword';
import I18n from '../../utils/i18n';

const { logoutText } = I18n.getModule('login');

const Logout = props => {
  const { loginName, logout, clearHospitalInfo } = props;
  const routerHistory = useHistory();
  const [visible, setVisible] = useState(false);

  function handleMenuClick(e) {
    if (e.key === '1') {
      logout();
      clearHospitalInfo();
      setTimeout(() => routerHistory.push('/login'), 1000);
    }
    if (e.key === '2') {
      setVisible(true);
    }
  }

  function modalCallback() {}

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">{logoutText}</Menu.Item>
      <Menu.Item key="2">修改密码</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          {loginName}
          <Icon type="down" />
        </Button>
      </Dropdown>
      <ChangePassword visible={visible} callback={setVisible} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loginName: state.user.loginName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(loginOperations.logout()),
    clearHospitalInfo: () => dispatch(organizationListOperations.clearHospitalInfo)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
