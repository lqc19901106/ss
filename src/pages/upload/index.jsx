import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Upload, message, Icon} from 'antd';
import http from '../../utils/http';
import I18n from '../../utils/i18n';

const {
  requireZip,
  uploadSuccess,
  noSpace,
  fileExist,
  uploadFiald,
  fileFormat
 } = I18n.getModule('upload');

const OrganizationManage = props => {
  const {currentHospitalCode} = props;
  const {Dragger} = Upload;
  const [uploadAction] = useState(`/portal/tasks/${currentHospitalCode}/upload`)
  const [uploadDisabled, setUploadDisabled] = useState(false)

  useEffect(() => {
    http.get(`/portal/tasks/${currentHospitalCode}/capacity`).then(res => {
      const {balance, total} = res;
      if((balance / total) < 0.05){
        setUploadDisabled(true)
      }
    })
  }, [])

  const beforeUpload = (info) => {
    const fileType = info.type.split('/') && info.type.split('/').pop();
    if (fileType !== 'zip') {
      message.error(requireZip);
      return false;
    }
    return true;
  }

  const onChange = (info) =>{
    const {status, response} = info.file;
    if (status === undefined) {
      info.fileList.pop();
    }
    if (status === 'done') {
      message.success(`${info.file.name}${uploadSuccess}`);
    } else if (status === 'error') {
      if(response.errorCode === '400021'){
        message.error(noSpace)
      }else if(response.errorCode === '400022'){
        message.error(fileFormat)
      }else if(response.errorCode === '400025'){
        message.error(fileExist)
      }else{
        message.error(`${info.file.name}${uploadFiald}`);
      }
    }
  }

  return (
    <div
      id="addTest"
      style={{display: 'flex',
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      marginTop: '80px'
    }}
    >
      <Dragger
        name='file'
        multiple
        disabled={uploadDisabled}
        action={uploadAction}
        beforeUpload={beforeUpload}
        width="400px"
        height="180px"
        showUploadList={{'showRemoveIcon': false, 'showDownloadIcon': false}}
        onChange={onChange}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit
          from uploading company data or other band files
        </p>
      </Dragger>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    currentHospitalCode: state.hospitalList.currentHospitalCode
  };
};

export default connect(mapStateToProps)(OrganizationManage);

