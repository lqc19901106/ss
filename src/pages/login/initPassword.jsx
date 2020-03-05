import React, { useState } from 'react';
import { Alert, message } from 'antd';
import { connect } from 'react-redux';
import md5 from 'md5';
import { useHistory } from 'react-router-dom';
import { operations as loginOperations } from '../../redux/login';
import I18n from '../../utils/i18n';
import UserService from '../userManage/UserService';
import './Login.scss';
import actions from '../../redux/login/actions';

const {
  copyright,
  inferVision,
  infoEmptyErr,
  inferVisionIntroduction,
  inconsistentPassword,
  invalidErr,
  exitChangeInitPassword,
  changeSuccessTip
} = I18n.getModule('login');

const InitPassword = props => {
  const routerHistory = useHistory();
  const [prompt, setPrompt] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { loginName, userUuid, logout } = props;

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

  const exitChangePassword = () => {
    // 清理redux
    logout();
    // 跳转登录
    routerHistory.push('/login');
  };
  const loginSkip = () => {
    const originalPassword = '111111';
    const passObj = {
      originalPassword: md5(originalPassword),
      newPassword: md5(newPassword),
      userUuid
    };
    UserService.initPassword(passObj).then(res => {
      // 跳转登录
      message.success(changeSuccessTip, 3, () => {
        exitChangePassword();
      });
    });
  };

  const handleChangePassword = e => {
    e.preventDefault();
    if (newPassword === '' || confirmNewPassword === '') {
      setPrompt(infoEmptyErr);
      hiddenPrompt();
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPrompt(inconsistentPassword);
      hiddenPrompt();
      return;
    }
    if (!validateLoginPassword(newPassword)) {
      setPrompt(invalidErr);
      hiddenPrompt();
      return;
    }
    loginSkip();
  };
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="logo-header">
          <img src="@/assets/img/logo.png" alt="logo" width="150px" />
          <div className="loginTitleWrapper">
            <div className="loginTit">修改默认密码</div>
          </div>
        </div>
        <form className="login-index">
          <div>
            <div className="inputs-container">
              <span className="input-Icon-Container">
                <img className="inputIcon" src="@/assets/img/loginImg/username.svg" alt="logo" />
              </span>
              <input className="change-username input" type="text" placeholder="用户名" value={loginName} disabled />
            </div>
            <div className="inputs-container" style={{ marginTop: '2rem' }}>
              <span className="input-Icon-Container">
                <img className="inputIcon" src="@/assets/img/loginImg/password.svg" alt="logo" />
              </span>
              <input
                onChange={e => setNewPassword(e.target.value)}
                value={newPassword}
                className="new-password input"
                type="password"
                placeholder="6-12位字母和数字的组合"
              />
            </div>
            <div className="inputs-container" style={{ marginTop: '2rem' }}>
              <span className="input-Icon-Container">
                <img className="inputIcon" src="@/assets/img/loginImg/password.svg" alt="logo" />
              </span>
              <input
                onChange={e => setConfirmNewPassword(e.target.value)}
                value={confirmNewPassword}
                className="confirm-new-password input"
                type="password"
                placeholder="确认密码"
              />
            </div>
          </div>
          <div className="login-prompt-container">{prompt && <Alert message={prompt} type="error" showIcon />}</div>
          <input type="submit" className="submits" value="确认修改" onClick={handleChangePassword} />
          <div className="forgetPassword">
            <button type="button" className="exitChange" onClick={exitChangePassword}>
              {exitChangeInitPassword}
            </button>
          </div>
        </form>
        <div className="loginFooter">{copyright}</div>
      </div>
      <div className="loginImgContainer">
        <div className="loginImg">
          <div className="container1">
            <img className="img2" src="@/assets/img/loginImg/login2.png" alt="login2 png" />
          </div>
          <div className="container2">
            <img className="img1" id="img1" src="@/assets/img/loginImg/login.png" alt="login png" />
          </div>
        </div>
        <div className="loginImgTitle">
          <h1 className="inferVision">{inferVision}</h1>
          <p className="loginImgIntroduction">{inferVisionIntroduction}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    loginFailed: state.user.loginFailed,
    loginName: state.user.loginName,
    userUuid: state.user.userUuid
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: userInfo => dispatch(loginOperations.login(userInfo)),
    logout: () => dispatch(actions.logout({}))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitPassword);
