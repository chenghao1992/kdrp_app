/**
 * Created by Administrator on 2017/8/22.
 */
import React, {PropTypes} from 'react';
import { List, InputItem, WhiteSpace, Button, Toast } from 'antd-mobile';
import {browserHistory, hashHistory} from 'dva/router'
import { createForm } from 'rc-form';
import { Link } from 'dva/router'
import classNames from 'classnames'
import {Rules} from '../../utils/verificationCode'
import commonStyle from '../Common/common_list.less'
import styles from './login.less'
  
  

let SendS = null;

class ForgotPassword extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hasPhoneError: false,
      hasImageCaptchError: false,
      hasMsgCodeError: false,
      hasPwdError: false,
      isEqual: false,
    }
  }



  componentWillUnmount(){
    clearInterval(SendS);
    this.props.getSmsText({
      text: '发送',
      disabled: true
    });
    this.props.firstInit();
  }

  onclick = (id)=>{
    var u = navigator.userAgent;
    if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
      document.body.style.marginTop = '-2rem';
    }
  }


getElementPosition = (elem) => {
    var defaultRect = {top: 0, left: 0};
    var rect = (elem.getBoundingClientRect && elem.getBoundingClientRect()) || defaultRect;
    var ret = {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    }
    return ret;
}





  goIndex = ()=>{
      hashHistory.push('/login');
  }

  goNextSubmit = () => {
      this.props.form.validateFields(['mobile','image_captcha','mobile_captcha'],(error,value)=>{
          if(!value.mobile){
            this.setState({
               hasPhoneError: true
            })
            return ;
          }
          if(!value.image_captcha){
            this.setState({
               hasImageCaptchError: true
            })
            return ;
          }
          if(!value.mobile_captcha){
            this.setState({
               hasMsgCodeError: true
            })
            return ;
          }
          if(this.state.hasPhoneError || this.state.hasImageCaptchError || this.state.hasImageCaptchError) return;
          const data = {...this.props.form.getFieldsValue(['mobile', 'mobile_captcha'])};
          let datas;
          if(data.mobile){
            datas = {...data,mobile: data.mobile.replace(/\s/g, '')}
            this.props.goNext(datas);
          }
          
      })
  } 

  onSubmit = () => {

    this.props.form.validateFields(['password','confirm'],(error, value)=>{
        if(!value.password){
          this.setState({
               hasPwdError: true
          })
          return ;
        }
        if(!value.confirm){
          this.setState({
               isEqual: true
          })
          return;
        }
        if(this.state.hasPwdError || this.state.isEqual ) return;
          const data = {...this.props.form.getFieldsValue(['mobile','password','confirm'])};
          let datas;
          if(data.mobile){
            datas = {...data,mobile: data.mobile.replace(/\s/g, '')}
          }
          this.props.resetPwd(datas);
     
    })
    
  };


  onErrorClick = (text,error) => {
      if(error){
        Toast.info(text);
      }  

  }

  onPhoneChange = (value) => {
    if (Rules.phoneNumber.pattern.test(value.replace(/\s/g, ''))) {
      // this.changeError('hasPhoneError',false)
      this.setState({
        hasPhoneError: false
      })

    } else {
      this.setState({
        hasPhoneError: true
      })
    }
  }

  onImageCaptchChange = (value) => {

    if (value.replace(/\s/g, '').length == 4) {
      this.setState({
        hasImageCaptchError: false
      })
    } else {
      this.setState({
        hasImageCaptchError: true
      })
    }
  }

  onMsgCodeChange = (value) => {

    if (value.replace(/\s/g, '').length == 6) {
      this.setState({
        hasMsgCodeError: false
      })
    } else {
      this.setState({
        hasMsgCodeError: true
      })
    }
  }

  onPwdChange = (value) => {

    if (Rules.passWord.pattern.test(value.replace(/\s/g, ''))) {
      this.setState({
        hasPwdError: false
      })
    } else {
      this.setState({
        hasPwdError: true
      })
    }
  }


  onRepeatPwdChange = (value) => {
    let obj = {...this.props.form.getFieldsValue(['password'])};

    if (value == obj.password) {
      this.setState({
        isEqual: false
      })
    }else {
      this.setState({
        isEqual: true
      })
    }
  }

  getSmsCode = () => {
     const data = {...this.props.form.getFieldsValue(['mobile', 'image_captcha'])}
     if(!data.mobile){
        this.setState({
          hasPhoneError: true
        })
        return;
     }
     if(!data.image_captcha){
        this.setState({
          hasImageCaptchError: true
        })
        return;
     }
      if(this.state.hasPhoneError || this.state.hasImageCaptchError ) return;
     
      const datas = {...data,mobile: data.mobile.replace(/\s/g, '')}
      this.props.getMobileCaptcha({data: datas,callBack: this.sendSmsCode });
    

  }

  sendSmsCode = () =>{
    const $this = this;
    if(SendS) clearInterval(SendS);
    let S = 60;
    SendS = window.setInterval(function(){
        S --;
        if(S <=0){
          $this.props.getSmsText({
            text: '重新发送',
            disabled: true
          });
          clearInterval(SendS);
        }else{
          $this.props.getSmsText({
            text: S+'s',
            disabled: false
          });
        }
      },1000);
  }


  

  render(){
    const { getFieldProps, getFieldsValue, validateFields } = this.props.form;
    const {data,goNext,changeImageCaptcha,resetPwd,getMobileCaptcha,getSmsText} =this.props;
    return (
      <div>
        <div className={classNames({[`${styles.isShow}`]:data.isFirstShow})} >
          <List renderHeader={() => ''} className={styles.loginInput} id="first_box">
            <InputItem
              {...getFieldProps('mobile',{
                onChange: this.onPhoneChange,
                rules: [
                  {
                    required: true,
                  }
                ],
              })}
              clear
              type = 'number'
              ref = 'inp'
              error={this.state.hasPhoneError}
              placeholder="请输入您的手机号"
              onErrorClick={()=>this.onErrorClick(Rules.phoneNumber.message,this.state.hasPhoneError)}
              
            >
            <div className={styles.loginIcon} style={{ backgroundImage: 'url(./src/assets/icon_01.png)' }} />
            </InputItem>
            <InputItem
              {...getFieldProps('image_captcha',{
                  onChange: this.onImageCaptchChange,
                  rules: [
                    {
                      type: 'string',
                      max: 4
                    }
                  ],
              })}
              clear
              placeholder="请输入图形验证码"
              maxLength = '4'
              error={this.state.hasImageCaptchError}
              onErrorClick={()=>this.onErrorClick('请输入4位图形验证码',this.state.hasImageCaptchError)}
              className={styles.imageInput}
            ><div className={styles.loginIcon} style={{ backgroundImage: 'url(./src/assets/icon_02.png)' }} />
            <div className={styles.imageCaptch}><img src={data.imageSrc}  alt="" onClick={changeImageCaptcha} /></div>
            </InputItem>
            <InputItem
              {...getFieldProps('mobile_captcha',{
                onChange: this.onMsgCodeChange,
                rules: [
                  {
                    required: true,
                    max: 6
                  }
                ],
              })}
              clear
              type="number"
              maxLength = '6'
              placeholder="短信验证码"
              id='msgCode'
              onClick={()=>{this.onclick('msgCode')}}
              error={this.state.hasMsgCodeError}
              onErrorClick={()=>this.onErrorClick('请输入6位短信验证码',this.state.hasMsgCodeError)}
              className={styles.msgInput}
              //onChange={this.handleOnChange}
            ><div className={styles.loginIcon} style={{ backgroundImage: 'url(./src/assets/icon_03.png)' }} />
            <Button  type="primary" size="small" className={classNames({[`${styles.disabled}`]:!data.sms.disabled})} onClick={data.sms.disabled?this.getSmsCode:''} >{data.sms.text}</Button>
            </InputItem>
          </List>
          <Button onClick={this.goNextSubmit} type="primary" className={commonStyle.common_btn_b}>下一步</Button>
          <Link style={{color: '#ee7700',marginLeft: '0.2rem'}}  onClick={this.goIndex}>返回登录</Link>
        </div>
        <div  className={classNames({[`${styles.isShow}`]:data.isSecondShow})}>
          <List renderHeader={() => ''} className={styles.loginInput}>
            <InputItem
              {...getFieldProps('password',{
                  onChange: this.onPwdChange,
                  rules: [
                    {
                      required: true,
                    }
                  ],
              })}
              clear
              type="password"
              placeholder="请输入新的密码"
              error={this.state.hasPwdError}
              onErrorClick={()=>this.onErrorClick(Rules.passWord.message,this.state.hasPwdError)}
            >
            <div className={styles.loginIcon} style={{ backgroundImage: 'url(./src/assets/icon_04.png)' }} />
            </InputItem>
            <InputItem
              {...getFieldProps('confirm',{
                  onChange: this.onRepeatPwdChange,
                  rules: [
                    {
                      required: true,
                    }
                  ],
              })}
              clear
              type="password"
              placeholder="再次输入密码"
              error={this.state.isEqual}
              onErrorClick={()=>this.onErrorClick('两次密码输入不一致，请重新输入',this.state.isEqual)}
            ><div className={styles.loginIcon} style={{ backgroundImage: 'url(./src/assets/icon_04.png)' }} />
            </InputItem>
          </List>
          <Button onClick={this.onSubmit} type="primary" className={commonStyle.common_btn_b}>保存</Button>
          <Link style={{color: '#ee7700',marginLeft: '0.2rem'}} onClick={this.goIndex}>返回登录</Link>
        </div>
      </div>

    )
  }
    

}




export default createForm()(ForgotPassword)
