import React, { useState } from 'react';
import { Modal, message } from 'antd';
import EditUserForm from './EditUserForm'
import UserService from './UserService';
import I18n from '../../utils/i18n';

const { 
  delUserMessage1,
  delUserMessage2,
  delUserTip,
  delUserSuccess,
  delUserErr,
  resetPasswordMessage1,
  resetPasswordMessage2,
  resetPasswordTip,
  resetPassWordSuccess,
  resetPasswordTipErr,
  editUserSuccess,
  editUserErr,
  addUserSuccess,
  addUserErr,
  nameExist,
  submit,
  cancle
 } = I18n.getModule('users');

const addEditBody = ({ modelOptions, postData, setPostData, tip }) => {
  return (
    <EditUserForm modelOptions={modelOptions} postData={postData} setPostData={setPostData} tip={tip} />
  )
}

const delBody = ({ modelOptions = {} }) => {
  return (
    <div className="model-content">
      <div className="model-row-tip top">
        {delUserMessage1 + modelOptions.data.loginName + delUserMessage2}
      </div>
      <div className="model-row-tip bottom">{delUserTip}</div>
    </div>
  )
}

const resetBody = ({ modelOptions = {} }) => {
  return (
    <div className="model-content">
      <div className="model-row-tip top">
        {resetPasswordMessage1 + modelOptions.data.loginName + resetPasswordMessage2}
      </div>
      <div className="model-row-tip bottom">{resetPasswordTip}</div>
    </div>
  )
}

const bodySelect = {
  del: delBody,
  reset: resetBody,
  edit: addEditBody,
  add: addEditBody
}
const UserModal = ({ modelOptions = {}, setModelOptions, setUserFetchId }) => {
  const [postData, setPostData] = useState(modelOptions.data);
  const [tip, setTip] = useState({
    userNameTip: '',
    userRoleTip: '',
    userHospitalTip: '',
    count: 0
  });

  const delSubmit = (props) => {
    UserService.deleteUser(modelOptions.data).then((res) => {
      if (res.errorCode === undefined) {
        message.success(delUserSuccess);
        props.setUserFetchId(Math.random());
        setModelOptions({ ...modelOptions, visible: false});
      } else {
        message.error(delUserErr)
      }
    })
  }

  const resetSubmit = (props) => {
    UserService.updatePassword(modelOptions.data).then((res) => {
      if (res.errorCode === undefined) {
        message.success(resetPassWordSuccess);
        props.setUserFetchId(Math.random());
        setModelOptions({ ...modelOptions, visible: false});
      } else {
        message.error(resetPasswordTipErr)
      }
    })
  }

  const editSubmit = (props) => {
    setTip({})
    const role = UserService.getCookie('userRole')
    const editErr = UserService.validateForm({ ...props.postData, role })
    setTip({ ...tip, ...editErr})
    if (editErr.count === 0) {
      UserService.updateUser(props.postData).then((res) => {
        if (res.errorCode === undefined) {
          message.success(editUserSuccess)
          props.setUserFetchId(Math.random());
          setModelOptions({ ...modelOptions, visible: false});
        } else {
          message.error(editUserErr)
        }
        return ''
      })
    }
  }

  const addSubmit = (props) => {
    setTip({})
    const role = UserService.getCookie('userRole')
    const addErr = UserService.validateForm({ ...props.postData, role })
    setTip({ ...tip, ...addErr})
    if (addErr.count === 0) {
      UserService.createUser(props.postData).then(data => {
        if (data.errorCode === "400007") {
          message.error(nameExist)
        } else {
          message.success(addUserSuccess);
          props.setUserFetchId(Math.random());
          setModelOptions({ ...modelOptions, visible: false});
        }
      }, () => {
        message.error(addUserErr);
      })
    }
  }

  const submitType = {
    add: addSubmit,
    edit: editSubmit,
    del: delSubmit,
    reset: resetSubmit
  }

  return (
    <Modal
      className="user-model"
      title={modelOptions.title}
      visible={modelOptions.visible}
      onOk={() => {
        setTip({});
        submitType[modelOptions.type]({ postData, setUserFetchId })
      }}
      onCancel={() => {
        setTip({});
        setModelOptions({ ...modelOptions, visible: false})
      }}
      mask
      maskClosable={false}
      okText={submit}
      cancelText={cancle}
      width='800px'
      destroyOnClose
      bodyStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {bodySelect[modelOptions.type] && bodySelect[modelOptions.type]({ modelOptions, postData, setPostData, tip })}
    </Modal>
  )
}

export default UserModal;