/**
 * Created by Administrator on 2017/8/22.
 */
import React, {PropTypes} from 'react';
import { List, InputItem, WhiteSpace, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Link } from 'dva/router'
import { Rules } from '../../utils/verificationCode'
import classNames from 'classnames'

import commonStyle from '../Common/common_list.less'
import styles from './login.less'

function Login({
  location,
  disabled,
  handleLogin,
  OnChange2,
  passwordError,
  phoneError,
  OnChange1,
  form: {
    getFieldProps,
    getFieldsValue,
  }
}) {

  const onSubmit = (e) => {
    e.preventDefault();
    if (!passwordError && !phoneError && !disabled) {
      const data = {...getFieldsValue()};
      const datas = {...data,username: data.username.replace(/\s/g, '')}
      handleLogin(datas)
    }
  };

  const handleOnChange1 = (value) => {
    if (!Rules.phoneNumber.pattern.test(value.replace(/\s/g, ''))){
      OnChange1(true)
    } else {
      OnChange1(false)
    }
  };

  const handleOnChange2 = (value) => {
    if (value.replace(/\s/g, '').length < 6){
      OnChange2(true)
    } else {
      OnChange2(false)
    }
  }

  const onErrorClick = (code) => {
    Toast.info(code,1)
  }


  return (
      <div>
        <List renderHeader={() => ''} className={styles.loginInput}>
          <InputItem
            {...getFieldProps('username',
              {
                onChange: handleOnChange1
              }
            )}
            clear
            type="number"
            error={phoneError}
            onErrorClick={ () => {onErrorClick('13、14、15、17、18开头，共11位数字!')}}
            placeholder="请输入您的手机号"
          ><div className={styles.loginIcon} style={{ backgroundImage: 'url(./src/assets/icon_01.png)' }} /></InputItem>
          <InputItem
            {...getFieldProps('password',
              {
                onChange: handleOnChange2
              }
            )}
            clear
            error={passwordError}
            onErrorClick={ () => {onErrorClick('6-16位字符，至少包含数字、字母（区分大小写）、符号中的2种')}}
            type="password"
            placeholder="请输入密码"
          > <div className={styles.loginIcon} style={{ backgroundImage: 'url(./src/assets/icon_02.png)' }} /></InputItem>
        </List>
        <Button onClick={onSubmit} type="primary" className={classNames({ [commonStyle.common_btn_b]: true,[styles.disabled]:disabled})}>登录</Button>
        <Link style={{color: '#ee7700',marginLeft: '0.2rem'}}  to={{ pathname: '/forgotPassword' }}>忘记密码</Link>
      </div>
  )
}

export default createForm()(Login)
