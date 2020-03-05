import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';
import { operations as organizationListOperations } from "../../redux/organizationList";
import UserService from '../userManage/UserService';
import I18n from '../../utils/i18n';

import './index.scss';

const inputHospitalName = I18n.getModule('inputHospitalName');

const OrganizationList = props => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const routerHistory = useHistory();

  useEffect(() => {
    UserService.getUserHospitals().then(userData => {
      setDataSource(userData)
      setData(userData)
    })
  }, [])

  const handleSearch = (value) => {
    setData(dataSource.filter(item => item.hospitalName.indexOf(value) !== -1))
  }

  return (
    <div className="organization-list">
      <div className="list-search">
        <Search
          onSearch={value => handleSearch(value)}
          style={{ width: 200, height: '38px' }}
          placeholder={inputHospitalName}
        />
      </div>
      <div className="list-body">
        {data.map(({hospitalCode, hospitalName}) => (

          <button
            type="button"
            className="organization"
            key={hospitalCode}
            onClick={() => {
              window.sessionStorage.setItem('currentHospital', JSON.stringify({
                hospitalCode, hospitalName
              }));
              props.setHospital({hospitalCode, hospitalName})
              routerHistory.push('/sub/studylist')
            }}
          >
            {hospitalName}
          </button>
        )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    hospitalInfo: state.hospitalList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setHospital: hospitalInfo => dispatch(organizationListOperations.setCurrentHospital(hospitalInfo))
  };
};

export default connect(mapStateToProps ,mapDispatchToProps)(OrganizationList);
