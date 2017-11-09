import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router'
import { WhiteSpace, WingBlank, Button } from 'antd-mobile';


import Header from '../../components/Common/header'
import Bill from '../../components/Personal/bill'
import AccountListDate from '../../components/Personal/accountListDate'
import styles from './personal.less';

function PersonalAccountList({
  location,
  personalAccountList,
  dispatch
}) {

  const headerProps = {
    headerText: '返回',
    goToUrl: location.query.url,
    mode: 'light'
  }

  const accountList = personalAccountList.data;

  const  accountListProps = {
    location,
    handleChange(params){
      dispatch({
        type:'personalAccountList/fetchRemote',
        payload: params
      })
    }
  }

  const billProps = {
    location,
    accountList,
  }

  return (
    <div className={styles.personal_account}>
      <Header {...headerProps}/>
      <WhiteSpace size='xl'/>  
      <AccountListDate {...accountListProps} />
      <Bill {...billProps}/>
    </div>
  );
}

PersonalAccountList.propTypes = {
  location: PropTypes.object.isRequired
};


export default connect(({ personalAccountList }) => ({ personalAccountList }))(PersonalAccountList)

