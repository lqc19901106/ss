
import React,{useState} from 'react';
import { Input, DatePicker, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import I18n from '../../utils/i18n';
import './SearchForm.scss';

export const modalityOptions = [{
  key: 'all',
  text: 'all_options'
},{
  key: 'CT',
  text: 'CT'
},{
  key: 'CR',
  text: 'CR'
},{
  key: 'DX',
  text: 'DX'
},{
  key: 'MR',
  text: 'MR'
}];
export const stateOptions = [{
  key: 'all',
  text: 'all_options'
},{
  key: 1,
  text: 'uploading'
},{
  key: 19,
  text: 'uploaded_ds'
},{
  key: 29,
  text: 'ds_running'
},{
  key: 34,
  text: 'unknown'
},{
  key: 44,
  text: 'failed'
},{
  key: 49,
  text: 'finished'
}];

const SearchFrom = ({fieldChange = () => {}}) => {
    const studyLocale = I18n.getModule('studyList');
    const [ fields, setFields] = useState({});
    
    const onChange = (fieldName, value) => {
        const newFields = {...fields};
        newFields[fieldName] = value;
        setFields(newFields);
        fieldChange(newFields);
    }

    return (
      <div className='search-from'>
        <div className='form-item'>
          <label>{studyLocale.accession_no}</label>
          <div className='search-field'>
            <Input
              placeholder={studyLocale.accessNumber_placeholder}
              onChange={(evt) => onChange('accession_no', evt.target.value)}
            />
          </div>
        </div>
        <div className='form-item'>
          <label>{studyLocale.state}</label>
          <div className='search-field'>
            <Select 
              style={{ width: 180 }}
              onChange={value => onChange('state', value === 'all' ? '' : value)}
              placeholder={studyLocale.select_placeholder}
            >
              {
                stateOptions.map(item => {
                 return (
                   <Select.Option key={item.key}>
                     {studyLocale[item.text] || item.text}
                   </Select.Option>
                  )
                })
              }
            </Select>
          </div>
        </div>
        <div className='form-item'>
          <label>{studyLocale.created_at}</label>
          <div className='search-field datetime'>
            <DatePicker.RangePicker
              locale={locale}
              onChange={(date,datestring) => onChange('created_at',datestring)}
            />
          </div>
        </div>
        <div className='form-item'>
          <label>{studyLocale.modality}</label>
          <div className='search-field'>
            <Select 
              style={{ width: 180 }}
              onChange={value => onChange('modality', value === 'all' ? '' : value)}
              placeholder={studyLocale.select_placeholder}
            >
              {
                modalityOptions.map(item => {
                 return (
                   <Select.Option key={item.key}>
                     {studyLocale[item.text] || item.text}
                   </Select.Option>
                   )
                 })
              }
            </Select>
          </div>
        </div>
        <div className='form-item'>
          <label>{studyLocale.study_date}</label>
          <div className='search-field datetime'>
            <DatePicker.RangePicker
              onChange={(date,datestring) => onChange('study_date',datestring)}
              locale={locale}
              format="YYYYMMDD"
            />
          </div>
        </div>
      </div>
    )
}
export default SearchFrom;