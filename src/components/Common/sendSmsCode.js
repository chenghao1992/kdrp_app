
import React, {PropTypes, Component} from 'react';
import { Button } from 'antd-mobile';

let SendS = null;
class SendSmsCode extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '发送'
    }
  }

  
  
  sendSmsCode = () =>{
    if(SendS) clearInterval(SendS);
    let S = 10;
    const self = this;
    SendS = window.setInterval(function(){
        S --;
        if(S <=0){
          self.setState({
            title: '重新发送'
          })
          clearInterval(SendS);
        }else{
          self.setState({
            title: S+'s'
          })
        }
      },1000);
  }

  render(){
    console.log(this.props.mobileCaptchData);
    return (
        <Button  type="primary" size="small" onClick={this.props.getMobileCaptcha}>{this.state.title}</Button>  
    );
  }

}

export default SendSmsCode;


