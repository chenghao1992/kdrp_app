import React, {PropTypes} from 'react';
import {  WhiteSpace, Button,WingBlank } from 'antd-mobile';
import {connect} from 'dva';

import Header from '../../components/Common/header'
import ResetPassword from '../../components/Personal/resetPassword.js'

import styles from './personal.less';

function PersonalResetPassword({
  location,
  personalResetPassword,
  dispatch,
}) {


  const headerProps = {
    headerText: '我的',
    goToUrl: '/personal/personalCenter',
    mode: 'light'
  }
  const resetPwdProps = {
     data: personalResetPassword,
     changeImageCaptcha(){
      dispatch({
        type: 'personalResetPassword/getImageCaptcha'
      })
    },
    changePwd(data){
      dispatch({
        type: 'personalResetPassword/changePwd',
        payload: data
      })
    }
  }

  return (
    <div className={styles.normal}>
      <Header {...headerProps}/>
      <ResetPassword {...resetPwdProps}/>
      
    </div>
  );
}

PersonalResetPassword.propTypes = {
  location: PropTypes.object.isRequired
};

export default connect(({ personalResetPassword }) => ({ personalResetPassword }))(PersonalResetPassword)
