import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Table , Button} from 'antd';
import SearchFrom, {stateOptions} from './SearchForm';
import I18n from '../../utils/i18n';
import http from '../../utils/http';

const studyLang = I18n.getModule("studyList");
const AiResult = [{
    key: 0,
    text: studyLang.ai_result0
},{
    key: 1,
    text: studyLang.ai_result1
},{
    key: 2,
    text: studyLang.ai_result2
},{
    key: 3,
    text: studyLang.ai_result3
}];



class StudyList extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            dataSource: [],
            pagination: {
                total: 0,
                pageSize: 10,
                pageIndex: 1
            },
            searchData: {
                equal:{}
            }
        }
    }

    componentDidMount(){
        const {searchData, pagination} = this.state;
        this.queryStudyList(searchData, pagination);
    }

    fieldChange = (data) => {
        const searchData = {
            equal: {}
        };
        Object.keys(data).forEach(key => {
            const value = data[key];
            if(key === 'accession_no' && value) {
                searchData.like = {
                    'accession_no': `%${value}%`
                }
            }
            if(['modality', 'state'].includes(key) && value) {
                searchData.equal[key] = value;
            }
            if(['study_date', 'created_at'].includes(key)) {
                const [ gt, lt ] = value;
                if(lt) {
                    if(!searchData.lt){
                        searchData.lt = {}
                    }
                    searchData.lt[key]= lt;
                }
                if(gt) {
                    if(!searchData.gt){
                        searchData.gt = {}
                    }
                    searchData.gt[key]= gt;
                }
            }
        });
        const pagination = {
            total: 0,
            pageSize: 10,
            pageIndex: 1
        };
        this.setState({
            searchData: { ...searchData},
            pagination,
        }, () => this.queryStudyList(searchData, pagination))
    }

    queryStudyList = (searchData, pagination) => {
        const { hospitalCode } = JSON.parse(window.sessionStorage.getItem('currentHospital'));
        
        http.post('/portal/tasks/study/query', {
            page: {
                no: pagination.pageIndex,
                length: pagination.pageSize
            },
            ...searchData,
            "equal":{
                hospital_code: hospitalCode,
                ...searchData.equal
            }
        }).then((data) => {
            if(!data.errorCode){
                this.setState({
                    pagination: {...pagination , total: data.total},
                    dataSource: data.items.map((item, index) => {
                        item.index = index + 1;
                        item.key = index + item.accession_no;
                        return item;
                    })
                });
            }
        });
    }

    render() {
        const { dataSource,pagination, searchData } = this.state;
        const {pageSize,pageIndex,total} = pagination;
        const studyLocale = I18n.getModule('studyList');

        const columns = [{
            title: studyLocale.index,
            dataIndex: 'index',
            width: 120
        }, {
            title: studyLocale.patient_id,
            dataIndex: 'patient_id',
            width: 200,
        }, {
            title: studyLocale.accession_no,
            dataIndex: 'accession_no',
            width: 200,
        }, {
            title: studyLocale.patient_sex,
            dataIndex: 'patient_sex',
            width: 160
        }, {
            title: studyLocale.patient_birthdate,
            dataIndex: 'patient_birthdate',
            width: 280,
        }, {
            title: studyLocale.study_date,
            dataIndex: 'study_date',
            width: 280
        }, {
            title: studyLocale.created_at,
            dataIndex: 'created_at',
            width: 280
        }, {
            title: studyLocale.modality,
            dataIndex: 'modality',
            width: 280
        }, {
            title: studyLocale.product,
            dataIndex: 'product',
            width: 280
        }, {
            title: studyLocale.state,
            dataIndex: 'state',
            width: 240,
            render: (text, record) => {
                const options = stateOptions.filter(item => item.key === record.state)[0] || {};
                return studyLocale[options.text];
            }
        }, {
            title: studyLocale.ai_result,
            dataIndex: 'ai_result',
            width: 240,
            render:(text, record)=>{
                const options = AiResult.filter(item => item.key === record.ai_result)[0] || {};
                return options.text;
            }
        }, {
            title: studyLocale.operation,
            dataIndex: 'operation',
            width: 240,
            render: (text, record) =>{
                return (
                  <a href={record.viewer_url} target='_blank' rel='noopener noreferrer' className="ant-btn">
                    <span>{studyLocale.viewUrl}</span>
                  </a>
                )
            }
        }];
        return (
          <div style={{ flex: 1, background: '#fff', overflowY: 'auto'}}>
            <header>
              <span>{studyLocale.pageName}</span>
            </header>
            <SearchFrom fieldChange={this.fieldChange} />
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ 
                    position: 'bottom',
                    total,
                    showSizeChanger: true,
                    pageSizeOptions:[ '10' ,'20' ,'30', '40','50'],
                    showQuickJumper: true,
                    onChange: (page) => this.queryStudyList(searchData,{pageSize, total,pageIndex: page}),
                    onShowSizeChange: (current, size) => this.queryStudyList(searchData, {total, pageIndex: current, pageSize: size})
                   }}
              bordered
            />
          </div>
          )
    }
}

export default StudyList;
