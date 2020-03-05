/* eslint-disable new-cap */
import { Alert, message } from 'antd';
import md5 from 'md5';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { operations as loginOperations } from '../../redux/login';
import I18n from '../../utils/i18n';
import actions from '../../redux/login/actions';
import './Login.scss';

const {
  loginTitle,
  defaultTxt,
  successTxt,
  failTxt,
  scanningTxt,
  forgetPassword,
  copyright,
  forgetPasswordWarning,
  loginSuccessTip,
  inferVision,
  inferVisionIntroduction,
  infoEmptyErr,
  userOrPsdError,
  userNotExist,
  roleFrozen,
  verificationFailed
} = I18n.getModule('login');

// 智能验证配置
window.NVC_Opt = {
  appkey: 'FFFF0N1N000000008750',
  scene: 'ic_login',
  renderTo: '#captcha',
  trans: { key1: 'code0', nvcCode: 200 }
};
const timestamp = new Date().getTime();
// 引入guide.js
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = `https://g.alicdn.com/sd/nvc/1.1.112/guide.js?t=${timestamp}`;
document.body.appendChild(script);

const Login = props => {
  const routerHistory = useHistory();
  const [prompt, setPrompt] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [SCData, setSCdata] = useState({});

  const { isLogin, errCode, isFirstLogin, logout, userUuid } = props;
  const ic = useRef();

  useEffect(() => {
    const icc = new window.smartCaptcha({
      renderTo: '#sc',
      width: 418,
      height: 42,
      defaultTxt,
      successTxt,
      failTxt,
      scanningTxt,
      success(data) {
        setSCdata({
          sessionId: data.sessionId,
          sig: data.sig,
          token: window.NVC_Opt.token,
          scene: window.NVC_Opt.scene
        });
      },
      fail(data) {}
    });
    ic.current = icc;
    ic.current.init();
  }, []);

  function resetSmartVerification() {
    setSCdata({});
    ic.current.reset();
  }

  function handleForgetPassword() {
    message.warning(forgetPasswordWarning);
  }
  const hiddenPrompt = () => {
    setTimeout(() => {
      setPrompt(false);
    }, 3000);
  };

  const loginSuccess = () => {
    if (username && password) {
      message.success(loginSuccessTip, 3, () => {
        routerHistory.push('/main/organizationList');
      });
    }
  };

  useEffect(() => {
    if (isLogin === 1) {
      if (errCode === '400010') {
        setPrompt(roleFrozen);
        hiddenPrompt();
        logout();
        resetSmartVerification();
        return;
      }
      if (errCode === '400002') {
        setPrompt(userNotExist);
        hiddenPrompt();
        logout();
        resetSmartVerification();
        return;
      }
      if (errCode === '400003') {
        setPrompt(userOrPsdError);
        hiddenPrompt();
        logout();
        resetSmartVerification();
        return;
      }
      if (props.isFirstLogin === 1) {
        routerHistory.push('/initPassword');
      } else {
        loginSuccess();
      }
    }
  }, [isLogin, errCode, isFirstLogin, userUuid]);

  const handleLogin = e => {
    e.preventDefault();
    if (!username || !password) {
      setPrompt(infoEmptyErr);
      hiddenPrompt();
      return;
    }
    if (Object.keys(SCData).length <= 0) {
      setPrompt(verificationFailed);
      hiddenPrompt();
      return;
    }
    props.login({ username, password: md5(password), ...SCData });
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="logo-header">
          <img src="@/assets/img/logo.png" alt="logo" width="150px" />
          <div className="loginTitleWrapper">
            <div className="loginTit">{loginTitle}</div>
          </div>
        </div>
        <form className="login-index">
          <div>
            <div className="inputs-container">
              <span className="input-Icon-Container">
                <img className="inputIcon" src="@/assets/img/loginImg/username.svg" alt="logo" />
              </span>
              <input
                onChange={e => setUsername(e.target.value)}
                value={username}
                className="input"
                type="text"
                placeholder="请输入用户名"
              />
            </div>
            <div className="inputs-container" style={{ marginTop: '2rem' }}>
              <span className="input-Icon-Container">
                <img className="inputIcon" src="@/assets/img/loginImg/password.svg" alt="logo" />
              </span>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                className="input"
                type="password"
                placeholder="请输入密码"
              />
            </div>
          </div>
          <div
            id="sc"
            className="sc"
            style={{
              height: '2.5rem',
              marginTop: '2rem',
              marginLeft: '0px'
            }}
          />
          <div className="login-prompt-container">{prompt && <Alert message={prompt} type="error" showIcon />}</div>
          <input type="submit" className="submits" value={loginTitle} onClick={handleLogin} />
          <div className="forgetPassword">
            <button type="button" className="exitChange" onClick={handleForgetPassword}>
              {forgetPassword}
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
    isFirstLogin: state.user.isFirstLogin,
    errCode: state.user.errCode,
    errMsg: state.user.errMsg,
    userUuid: state.user.userUuid
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: userInfo => dispatch(loginOperations.login(userInfo)),
    logout: () => dispatch(actions.logout({}))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
