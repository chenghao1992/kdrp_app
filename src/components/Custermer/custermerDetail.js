/**
 * Created by xiaoys on 2017/9/4.
 */
import React, {PropTypes,Component }from 'react';
import {Icon,Button,Modal} from 'antd-mobile';
import styles from './custermerDetail.less';
import commonStyle from '../Common/common_list.less';
import {iosOrAn} from '../../utils/helper'

var app = {
  sendSms: function(number) {
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // send SMS with the native android SMS messaging
        //intent: '' // send SMS without open any other app
      }
    };

    var error = function (e) { alert('Message Failed:' + e); };
    sms.send(number, '', options, null, error);
  }
};

function callMobiles(number){
  phonedialer.dial(number,null,null);
}

function CustermerDetails({getDetail,querySaves,handleClick,isFollows,handleFllow}) {

  console.log(isFollows);

  const alert = Modal.alert;

  const onClick = () => {
   alert('上交客户', '确认上交客户么？', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确认', onPress: () => handleClick(querySaves) },
    ]);
  };

  const callMobile = (number) => {
    callMobiles(number)
  }

  const sendSms = (number) => {
    app.sendSms(number)
  }

  const onFllow = () => {
    const data = {
      querySaves,
      isFollow: {
        follow_status: isFollows ? 0 : 1
      }
    };
    console.log(data)
    handleFllow(data)
  };

  return (
    <div>
      <div className={styles.div_body}>
        <div>
          <img src="./src/assets/custermerLogo.png" alt=""/>
        </div>
        <div className={styles.custermerName}><p>{getDetail.name}</p></div>
        <div className={styles.div_body1}>
          <div>
            <a id="call_mobile" onClick={() => {callMobile(getDetail.mobile)}} className={styles.div_a1}>
            </a>
            <p>打电话</p>
          </div>
          <div className={styles.div_div1}>
            <a id="send_sms" onClick={() => {sendSms(getDetail.mobile)}} className={styles.div_a2}>
            </a>
            <p>发短信</p>
          </div>
          <div className={styles.div_div1} onClick={ () => {onFllow()}}>
            <a className={isFollows ? styles.div_a3 : styles.div_a3_1}>
            </a>
            <p style={{textAlign: 'center'}}>关注</p>
          </div>
        </div>
      </div>
      <p style={{fontSize: '0.28rem',color: '#a0a0a0',marginLeft: '0.2rem'}}>基本信息</p>
      <div className={styles.div_list}>
        <p><span>手机号码</span><span>{getDetail.mobile || '--'}</span></p>
        <p><span>注册时间</span><span>{getDetail.register_time || '--'}</span></p>
        <p><span>最后登录</span><span>{getDetail.last_login || '--'}</span></p>
        <p><span>是否开户</span><span>{getDetail.is_pnr ? '是' :　'否'}</span></p>
        <p><span>是否投资</span><span>{getDetail.is_invest ? '是' :　'否'}</span></p>
        <p><span>账户余额</span><span>{getDetail.available}</span></p>
      </div>
      <Button type="primary" className={commonStyle.common_btn_b} onClick={() => {onClick()}}>上交客户</Button>
    </div>
  )
}

export default CustermerDetails
