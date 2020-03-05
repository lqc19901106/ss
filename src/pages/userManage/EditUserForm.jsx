import React, { useState, useEffect } from 'react';
import { Input, Switch, Radio, Select } from 'antd';
import UserService from './UserService';
import './UserModel.scss';
import I18n from '../../utils/i18n';

const {
  loginName,
  initPassword,
  gender,
  female,
  male,
  userRole,
  admin,
  veteran,
  doctor,
  userStatus,
  hospitals,
  selectHospital,
  on,
  off,
  userNameErr,
  userRoleErr,
  userHospitalErr,
  selectRole,
  namePlaceholder
 } = I18n.getModule('users');

const EditUserForm = ({ modelOptions = {}, postData, setPostData, tip }) => {
  const { type, data = {} } = modelOptions;
  const [hospitalSelect, setHospitalSelect] = useState([])
  const [hospital, setHospital] = useState([])
  const [formData] = useState(type === 'add' ? {
    userName: "",
    loginName: "",
    gender: "",
    userRole: UserService.getCookie('userRole') === '1' ? 2 : null,
    userStatus: 1,
    hospitals: []
  } : data)

  useEffect(() => {
    setPostData(formData)
    UserService.getUserHospitals().then((hospitalData=[]) => {
      setHospital(hospitalData)
      const hospitalList = [];
      for (let i = 0; i < hospitalData.length; i += 1) {
        hospitalList.push(
          <Option key={
            // `${data[i].hospitalCode},${data[i].hospitalName},${data[i].status},${data[i].userUuid}`
            `${hospitalData[i].hospitalName}`

          }
          >
            {hospitalData[i].hospitalName}
          </Option>);
      }
      setHospitalSelect(hospitalList)
    })
  }, [])
  const { Option } = Select;

  function handleChange(value=[]) {
    const hospitalsData = [];
    for (let i = 0; i < value.length; i +=1) {
      for (let j = 0; j < hospital.length; j +=1) {
        if (hospital[j].hospitalName === value[i]) {
          hospitalsData.push(hospital[j])
        }
      }
    }
    setPostData({ ...postData, hospitals: hospitalsData})
  }

  const selectDefaultValue = []
  formData.hospitals.map((item) => (
    selectDefaultValue.push(item.hospitalName)
    ))
  return (
    <form className='user-form'>
      <div className="user-form-row">
        <div className="row-content">
          <label>
            <span className="form-require">*</span>
            {loginName}
          </label>
          <Input
            className='row-input'
            defaultValue={formData.loginName}
            placeholder={namePlaceholder}
            onChange={e => setPostData({ ...postData, loginName: e.target.value})}
          />
        </div>
        <div className='row-tip'>{tip.userNameTip && tip.userNameTip[0] && userNameErr}</div>
      </div>
      <div className="user-form-row" style={{ display: type !== 'add' && 'none' }}>
        <div className="row-content">
          <label>{initPassword}</label>
          <div className='row-input text'>111111</div>
        </div>
        <div className='row-tip' />
      </div>
      <div className="user-form-row">
        <div className="row-content">
          <label>{gender}</label>
          <div className='row-input'>
            <Radio.Group
              defaultValue={data.gender}
              onChange={e => setPostData({ ...postData, gender: e.target.value})}
            >
              <Radio value="M">{male}</Radio>
              <Radio value="F">{female}</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className='row-tip' />
      </div>
      <div className="user-form-row">
        <div className="row-content">
          <label>
            <span className="form-require">*</span>
            {userRole}
          </label>
          <div className={`row-input ${UserService.getCookie('userRole') === '1' && 'text'}`}>
            {
              UserService.getCookie('userRole') === '1' ?
                admin : (
                  <Select
                    placeholder={selectRole}
                    optionFilterProp="children"
                    style={{ width: '100%' }}
                    defaultValue={data.userRole}
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={value => setPostData({ ...postData, userRole: value})}
                  >
                    <Option value={3}>{veteran}</Option>
                    <Option value={4}>{doctor}</Option>
                  </Select>
              )
}

          </div>
        </div>
        <div className='row-tip'>{tip.userRoleTip && tip.userRoleTip[0] && userRoleErr}</div>
      </div>
      <div className="user-form-row">
        <div className="row-content">
          <label>
            <span className="form-require">*</span>
            {hospitals}
          </label>
          <div className='row-input'>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder={selectHospital}
              defaultValue={selectDefaultValue}
              onChange={handleChange}
              maxTagTextLength={6}
              maxTagCount={3}
            >
              {hospitalSelect}
            </Select>
          </div>
        </div>
        <div className='row-tip'>{tip.userHospitalTip && tip.userHospitalTip[0] && userHospitalErr}</div>
      </div>
      <div className="user-form-row">
        <div className='row-content'>
          <label>{userStatus}</label>
          <div className='row-input'>
            <Switch
              checkedChildren={on}
              unCheckedChildren={off}
              defaultChecked={formData.userStatus === 1}
              onClick={(checked) => setPostData({ ...postData, userStatus: checked ? 1 : 0})}
            />
          </div>
        </div>
        <div className='row-tip' />
      </div>
    </form>
  )
}

export default EditUserForm;