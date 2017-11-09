import React, {PropTypes} from 'react';
import { createForm } from 'rc-form';
import { Picker, List, WhiteSpace, InputItem, Button,WingBlank, Toast } from 'antd-mobile';
import {Rules} from '../../utils/verificationCode'



const sex = [
  {
    label: '男',
    value: '男',
  },
  {
    label: '女',
    value: '女',
  }
];

class InfoEditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hasIdCardError : false,
      hasEContactError : false,
      hasEContactPhoneError : false,
      hasMobile2Error : false,
    }
  }


  onclick = (id)=>{
    var u = navigator.userAgent;
    if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
      document.body.style.marginTop = '-2rem';
    }
  }

  onErrorClick = (text,error) => {
    if (error) {
      Toast.info(text);
    }
  }


  onIdCardChange = (value) => {
    var reg = Rules.idNumber.pattern;
    if (reg.test(value.replace(/\s/g, ''))) {
      this.setState({
        hasIdCardError: false,
      });
    } else {
      this.setState({
        hasIdCardError: true,
      });
    }
  }

  onMobile2Change = (value) => {
    var reg = Rules.phoneNumber.pattern;
    if (reg.test(value.replace(/\s/g, ''))) {
      this.setState({
        hasMobile2Error: false,
      });
    } else {
      this.setState({
        hasMobile2Error: true,
      });
    }
  }
  onEContacteChange = (value) => {
    if (value.replace(/\s/g, '') != '') {
      this.setState({
        hasEContactError: false,
      });
    } else {
      this.setState({
        hasEContactError: true,
      });
    }
  }
  onEContactPhoneChange = (value) => {
    var reg = Rules.phoneNumber.pattern;
    if (reg.test(value.replace(/\s/g, ''))) {
      this.setState({
        hasEContactPhoneError: false,
      });
    } else {
      this.setState({
        hasEContactPhoneError: true,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.location.query.id;
    this.props.form.validateFields((error,value)=>{
        if(!value.id_no){
          this.setState({
            hasIdCardError: true,
          });
          return ;
        }

        if(!value.mobile2){
          this.setState({
            hasMobile2Error: true,
          });
          return ;
        }
        if(!value.emergency_contact){
          this.setState({
            hasEContactError: true,
          });
          return ;
        }
        if(!value.emergency_mobile){
          this.setState({
            hasEContactPhoneError: true,
          });
          return ;
        }
       
        if(this.state.hasIdCardError ||　this.state.hasMobile2Error ||　this.state.hasEContactError ||　this.state.hasEContactPhoneError) return;
        const data = {...this.props.form.getFieldsValue()};
        const datas = {...data,sex:data.sex[0]};
        this.props.handleInforEdit({
          data: datas,
          id: id
        });
     
    })
    
  }; 


  

  render() {
    const { getFieldProps,getFieldsValue,validateFields } = this.props.form;
    const { handleInforEdit,personalInfoEdit } = this.props;
    let D={
      sex:'',
      id_no: '',
      id_publisher:'',
      phone:'',
      emergency_contact:'',
      emergency_mobile:'',
    }
    if(personalInfoEdit.initData && personalInfoEdit.initData.data){
        D = personalInfoEdit.initData.data.personal_info;
    }
    

      return (
        
          <div>
          <Picker data={sex} cols={1}  className="forss"
              {...getFieldProps('sex',{
                initialValue: D.sex == '其他'||!D.sex?'':[D.sex]
              })}
          >
              <List.Item arrow="horizontal">性别</List.Item>
          </Picker>
          <List renderHeader={() => ''}>
              <InputItem
                {...getFieldProps('id_no',{
                initialValue: D.id_no,
                onChange: this.onIdCardChange
              })}
                type = 'number'
                placeholder="请输入"
                clear
                error={this.state.hasIdCardError}
                onErrorClick={()=>this.onErrorClick(Rules.idNumber.message,this.state.hasIdCardError)}
              >身份证号码</InputItem>
              <InputItem
                {...getFieldProps('id_publisher',{
                initialValue: D.id_publisher,
              })}
                placeholder="请查看身份证背面"
                clear
              >身份证签发机关</InputItem>
              <InputItem
                {...getFieldProps('phone',{
                initialValue: D.phone,
                onChange: this.onFixedPhoneChange
              })}
                placeholder="请输入"
                clear
              >固定电话</InputItem>
              <InputItem
                {...getFieldProps('mobile2',{
                initialValue: D.mobile2,
                onChange: this.onMobile2Change
              })}
                placeholder="请输入"
                clear
                error={this.state.hasMobile2Error}
                onErrorClick={()=>this.onErrorClick(Rules.phoneNumber.message,this.state.hasMobile2Error)}
              >备用手机号</InputItem>
          </List>
          <List renderHeader={() => ''}>
              <InputItem
                {...getFieldProps('emergency_contact',{
                initialValue: D.emergency_contact,
                onChange: this.onEContacteChange
              })}
                placeholder="请输入"
                clear
                error={this.state.hasEContactError}
                 onClick={()=>{this.onclick()}}
                onErrorClick={()=>this.onErrorClick('不能为空',this.state.hasEContactError)}
              >紧急联系人</InputItem>
              <InputItem
                {...getFieldProps('emergency_mobile',{
                initialValue: D.emergency_mobile,
                onChange: this.onEContactPhoneChange
              })}
                placeholder="请输入"
                type = 'number'
                clear
                id='msgCode'
                onClick={()=>{this.onclick()}}
                error={this.state.hasEContactPhoneError}
                onErrorClick={()=>this.onErrorClick(Rules.phoneNumber.message,this.state.hasEContactPhoneError)}
              >紧急联系人手机</InputItem>
          </List>
          <WhiteSpace size='xl'/>
          <WingBlank>
            <Button onClick = {this.onSubmit} className="btn" type="primary" >保存并返回</Button>
          </WingBlank>
        </div>
      );

  }

  

}



export default createForm()(InfoEditForm)

