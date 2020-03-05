import React, {useEffect} from 'react';
import {Button} from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import I18n from '../../utils/i18n';

const HospitalInfo = (props) => {
  const routerHistory = useHistory();
  const {currentHospitalName} = props;
  const hospitalsList = I18n.getModule('hospitalsList');

  useEffect(() => {
    if(!currentHospitalName){
      routerHistory.push('/main/organizationList')
    }
  }, [currentHospitalName])

  return(
    <div className="hospital-info" style={{display: 'flex', alignItems: 'center'}}>
      <div
        className="hospital-name" 
        style={{padding: '4px 11px'}}
      >
        {currentHospitalName}
      </div>
      <Button href="/main/organizationList" type="primary">{hospitalsList}</Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentHospitalName: state.hospitalList.currentHospitalName
  };
};

export default connect(mapStateToProps)(HospitalInfo);