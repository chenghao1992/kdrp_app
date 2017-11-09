import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router'

import Logins from '../../components/Login/login'

import styles from './login.less';

function Login({
  location,dispatch,app
}) {

  const {phoneError,passwordError,disabled} = app

  const loginProps = {
    disabled,
    location,
    phoneError,
    passwordError,
    handleLogin (params) {
      dispatch({
        type: 'app/login',
        payload: params
      })
      dispatch({
        type: 'app/changeDisabled',
        payload: true
      })
    },
    OnChange1 (params) {
      dispatch({
        type: 'app/phoneErrors',
        payload: params
      })
    },
    OnChange2 (params) {
      dispatch ({
        type: 'app/passwordErrors',
        payload: params
      })
    }
  }

  return (
    <div className={styles.normal}>
      <div className={styles.header_logo}></div>
      <Logins {...loginProps}/>
    </div>
  );
}

Login.propTypes = {
  location: PropTypes.object.isRequired
};

function mapStateToProps({app}) {
  return {
    app: app
  };
}

export default connect(mapStateToProps)(Login);
