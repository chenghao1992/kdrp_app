import React, {PropTypes} from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, WhiteSpace, WingBlank, Button, Toast  } from 'antd-mobile';
import styles from './resetPassword.less'
import {Rules} from '../../utils/verificationCode'

class ResetPassword extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      hasOldPwdError: false,
      hasNewPwdError: false,
      hasRepeatPwdError: false,
      hasImageCaptchError: false
    }
  }

  onErrorClick = (text,error) => {
    if (error) {
      Toast.info(text);
    }
  }

  onOldPwdChange = (value) => {
    // var reg = Rules.passWord.pattern;
    if (value.replace(/\s/g, '') != '') {
      this.setState({
        hasOldPwdError: false,
      });
    } else {
      this.setState({
        hasOldPwdError: true,
      });
    }
  }

  onNewPwdChange = (value) => {
    var reg = Rules.passWord.pattern;
    if (reg.test(value.replace(/\s/g, ''))) {
      this.setState({
        hasNewPwdError: false,
      });
    } else {
      this.setState({
        hasNewPwdError: true,
      });
    }
  }

  onRepeatPwdChange = (value) => {
    let obj = {...this.props.form.getFieldsValue(['password'])};
    if (value == obj.password) {
      this.setState({
        hasRepeatPwdError: false,
      });
    } else {
      this.setState({
        hasRepeatPwdError: true,
      });
    }
  }

  onImageCaptchChange = (value) => {
    if (value.replace(/\s/g, '').length == 4) {
      this.setState({
        hasImageCaptchError: false,
      });
    } else {
      this.setState({
        hasImageCaptchError: true,
      });
    }
  }

  onsubmit = (e)=>{

    e.preventDefault();
    this.props.form.validateFields((errors, value)=>{
        if(!value.oldpassword){
          this.setState({
            hasOldPwdError: true,
          });
          return ;
        }
        if(!value.password){
          this.setState({
            hasNewPwdError: true,
          });
          return ;
        }
        if(!value.confirm){
          this.setState({
            hasRepeatPwdError: true,
          });
          return ;
        }
        if(!value.image_captcha){
          this.setState({
            hasImageCaptchError: true,
          });
          return ;
        }
        if(this.state.hasOldPwdError || this.state.hasNewPwdError || this.state.hasRepeatPwdError || this.state.hasImageCaptchError) return;
        const data = {...this.props.form.getFieldsValue()};
        this.props.changePwd(data);
    
    })
    
  }


  render(){
    const { getFieldProps, getFieldsValue, validateFields } = this.props.form;
    const { changeImageCaptcha, changePwd, data} = this.props;
    return (
      <div className={styles.forgot_pwd}>
          <List renderHeader={() => ''}>
            <InputItem
              {...getFieldProps('oldpassword',{
                onChange: this.onOldPwdChange
              })}
              clear
              type = 'password'
              placeholder="请输入原密码"
              error={this.state.hasOldPwdError}
              onErrorClick={()=>this.onErrorClick('原密码不能为空',this.state.hasOldPwdError)}
            >原密码</InputItem>
            <InputItem
              {...getFieldProps('password',{
                onChange: this.onNewPwdChange
              })}
              clear
              type = 'password'
              placeholder="请输入新密码"
              error={this.state.hasNewPwdError}
              onErrorClick={()=>this.onErrorClick(Rules.passWord.message,this.state.hasNewPwdError)}
            >新密码</InputItem>
            <InputItem
              {...getFieldProps('confirm',{
                onChange: this.onRepeatPwdChange
              })}
              clear
              type = 'password'
              placeholder="请再次输入新密码"
              error={this.state.hasRepeatPwdError}
              onErrorClick={()=>this.onErrorClick('两次密码输入不一致，请重新输入',this.state.hasRepeatPwdError)}
              className = {styles.repeatInput}
            >再次输入新密码</InputItem>
            <InputItem
              {...getFieldProps('image_captcha',{
                onChange: this.onImageCaptchChange
              })}
              clear
              placeholder="请输入验证码"
              maxLength = '4'
              error={this.state.hasImageCaptchError}
              onErrorClick={()=>this.onErrorClick('请输入4位图形验证码',this.state.hasImageCaptchError)}
              className={styles.imageInput}
            >图形验证码
              <div className={styles.imageCaptch}><img src={data.imageSrc} alt="" onClick={changeImageCaptcha}  /></div>
            </InputItem>
          </List>
          <WhiteSpace size='xl'/>
          <WingBlank>
            <Button onClick={this.onsubmit} className="btn" type="primary" >保存并返回</Button>
          </WingBlank>
      </div>
    );
  }
}


export default createForm()(ResetPassword)

