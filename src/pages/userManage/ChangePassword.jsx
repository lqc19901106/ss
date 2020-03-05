import { Modal, Input, message } from 'antd';
import md5 from 'md5';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import UserService from './UserService';
import { operations as loginOperations } from '../../redux/login';
import I18n from '../../utils/i18n';

const { infoEmptyErr, inconsistentPassword, invalidErr,changeSuccessTip,passwordError } = I18n.getModule('login');

function ChangePassword(props) {
  const [userInfo, setUserInfo] = useState({ originalPassword: '', newPassword: '', confirmNewPassword: '' });
  const [prompt, setPrompt] = useState('');
  const { userUuid, loginName,visible } = props;

  const hiddenPrompt = () => {
    setTimeout(() => {
      setPrompt();
    }, 2000);
  };

  function validateLoginPassword(pwd) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    if (reg.test(pwd)) {
      return true;
    }
    return false;
  }
  function callback() {
    props.callback(false);
    setUserInfo({})
  }
  function onSubmit() {
    if (userInfo.originalPassword === '' || userInfo.newPassword === '' || userInfo.confirmNewPassword === '') {
      setPrompt(infoEmptyErr);
      hiddenPrompt();
      return;
    }
    if (userInfo.newPassword !== userInfo.confirmNewPassword) {
      setPrompt(inconsistentPassword);
      hiddenPrompt();
      return;
    }
    if (!validateLoginPassword(userInfo.newPassword)) {
      setPrompt(invalidErr);
      hiddenPrompt();
      return;
    }
    UserService.changePassword({ originalPassword: md5(userInfo.originalPassword), newPassword: md5(userInfo.newPassword),userUuid}).then(res => {
      
      if (res.errorCode === '400003') {
        setPrompt(passwordError);
        hiddenPrompt();
      } 
      if(res.userUuid){
        message.success(changeSuccessTip,3);
        callback();
      } 
    });
  }
  return (
    <div>
      <Modal
        title="修改密码"
        visible={visible}
        onOk={onSubmit}
        onCancel={callback}
        okText="确认"
        cancelText="取消"
      >
        <form>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label>用户名</label>
            <Input
              placeholder="用户名"
              value={loginName}
              style={{ width: '300px', marginLeft: '20px' }}
              onChange={e => setUserInfo({ ...userInfo, loginName: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <label>原密码</label>
            <Input
              value={userInfo.originalPassword}
              placeholder="请输入原密码"
              type="password"
              style={{ width: '300px', marginLeft: '20px' }}
              onChange={e => setUserInfo({ ...userInfo, originalPassword: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <label>新密码</label>
            <Input
              value={userInfo.newPassword}
              placeholder="请输入6-12位字母和数字的组合"
              type="password"
              style={{ width: '300px', marginLeft: '20px' }}
              onChange={e => setUserInfo({ ...userInfo, newPassword: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <label>确认密码</label>
            <Input
              value={userInfo.confirmNewPassword}
              placeholder="请再次输入密码"
              type="password"
              style={{ width: '300px', marginLeft: '20px' }}
              onChange={e => setUserInfo({ ...userInfo, confirmNewPassword: e.target.value })}
            />
          </div>
        </form>
        <div style={{ marginTop: '20px', color: 'red' }}>{prompt}</div>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loginName: state.user.loginName,
    userUuid: state.user.userUuid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(loginOperations.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
