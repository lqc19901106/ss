import React, { useEffect, useState } from 'react';

import { Table, Divider, Icon, Button, Tooltip } from 'antd';
import UserService from './UserService';
import I18n from '../../utils/i18n';
import UserModal from './UserModel';
import './index.scss';

const {
  index,
  loginName,
  userRole,
  gender,
  hospitals,
  userStatus,
  action,
  superAdmin,
  admin,
  veteran,
  doctor,
  userEnable,
  userUnEnable,
  female,
  male,
  editUser,
  delUser,
  resetUser,
  addUser
 } = I18n.getModule('users');

const dataConversion = {
  userRole: [
    { value: 1, text: superAdmin },
    { value: 2, text: admin },
    { value: 3, text: veteran },
    { value: 4, text: doctor }
  ],
  gender: [
    { value: 'F', text: female },
    { value: 'M', text: male },
  ],
  userStatus: [
    { value: 1, text: userEnable, color: '' },
    { value: 0, text: userUnEnable, color: 'rgba(0, 0, 0, 0.4)' }
  ]
}

const userManage = props => {
  const [userList, setUserList] = useState([]);
  const [userFetchId,setUserFetchId] = useState(Math.random());
  useEffect(() => {
    UserService.getUserList()
      .then(data => {
        setUserList(data.map((item, id) => {
          item.index= id + 1;
          return item;
        }))
      })
  }, [userFetchId]);

  const [modelOptions, setModelOptions] = useState({
    title: '',
    visible: false,
    data: {},
    type: ''
  });


  const columns = [
    {
      title: index,
      dataIndex: 'index',
      align: 'center',
      width: '14%'
    },
    {
      title: loginName,
      dataIndex: 'loginName',
      align: 'center',
      width: '14%'
    },
    {
      title: userRole,
      dataIndex: 'userRole',
      align: 'center',
      width: '14%',
      render: (text) => {
        const dataItem = dataConversion.userRole.find(item => item.value === text)
        return (
          <span>
            {dataItem && dataItem.text}
          </span>
        )
      }
    },
    {
      title: gender,
      dataIndex: 'gender',
      align: 'center',
      width: '14%',
      render: (text) => {
        const dataItem = dataConversion.gender.find(item => item.value === text)
        return (
          <span>
            {dataItem && dataItem.text}
          </span>
        )
      }
    },
    {
      title: hospitals,
      dataIndex: 'hospitals',
      align: 'center',
      width: '16%',
      render: (text) => {
        const showText = text && text.reduce((a, b) =>
          a.length ? `${a},${b.hospitalName}` : `${a}${b.hospitalName}`, '')
        return (
          <Tooltip title={showText}>
            {showText.length > 15 ? `${showText.substr(0, 15)}...` : showText}
          </Tooltip>
        )
      }
    },
    {
      title: userStatus,
      dataIndex: 'userStatus',
      align: 'center',
      width: '14%',
      render: (text) => {
        const dataItem = dataConversion.userStatus.find(item => item.value === text)
        return (
          <span style={{ color: dataItem.color }}>
            {dataItem && dataItem.text}
          </span>
        )
      }
    },
    {
      title: action,
      dataIndex: 'action',
      align: 'center',
      width: '14%',
      render: (text, record) => (
        <span>
          <Tooltip title={editUser}>
            <Icon
              type="form"
              onClick={() =>
            setModelOptions({ ...modelOptions,
              data: record,
                type: 'edit',
                visible: true,
                title: editUser})}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={delUser}>
            <Icon
              type="delete"
              onClick={() => {
            setModelOptions({ ...modelOptions,
              data: record,
                type: 'del',
                visible: true,
                title: delUser})
          }}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={resetUser}>
            <Icon
              type="redo"
              onClick={() =>
            setModelOptions({ ...modelOptions,
              data: record,
                type: 'reset',
                visible: true,
                title: resetUser})}
            />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <>
      <Table
        className="user-list-table"
        columns={columns}
        dataSource={userList}
        bordered
        rowKey={record => record.userUuid + Math.random()}
        pagination={{ pageSize: 20 }}
        scroll={{ y: 'calc(100vh - 350px)' }}
        title={() => (
          <Button
            type="primary"
            onClick={() => {
          setModelOptions({ ...modelOptions,
            data: [],
              type: 'add',
              visible: true,
              title: addUser})
        }}
          >
            {addUser}
          </Button>
     )}
      />
      <UserModal modelOptions={modelOptions} setModelOptions={setModelOptions} setUserFetchId={setUserFetchId} />
    </>
  );
};

export default userManage;
