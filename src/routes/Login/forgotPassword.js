/**
 * Created by xiaoys on 2017/9/4.
 */
import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router'

import ForgotPasswords from '../../components/Login/forgotPassword'

import styles from './login.less';

function ForgotPassword({
  location,
  dispatch,
  forgotPassword
}) {

  const forgetProps = {
    data: forgotPassword,
    goNext(data){
      dispatch({
        type: 'forgotPassword/changeFirst',
        payload:data
      })
    },
    changeImageCaptcha(){
      dispatch({
        type: 'forgotPassword/getImageCaptcha'
      })
    },
    resetPwd(data){
      dispatch({
          type:'forgotPassword/resetPwd',
          payload: data
      })
    },
    getMobileCaptcha(data){
      dispatch({
          type:'forgotPassword/getMobileCaptcha',
          payload: data
      })
    },
    getSmsText(data){
      dispatch({
          type:'forgotPassword/getSmsText',
          payload: data
      })
    },
    firstInit(){
      dispatch({
        type:'forgotPassword/firstInit',
      })
    }
  }


  return (
    <div className={styles.forgotPwd}>
      <div className={styles.header_logo} id="header_logo"></div>
      <ForgotPasswords {...forgetProps}/>
    </div>
  );
}

ForgotPassword.propTypes = {
  location: PropTypes.object.isRequired
};



export default connect(({ forgotPassword }) => ({ forgotPassword }))(ForgotPassword)
