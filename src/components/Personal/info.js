import React, {PropTypes} from 'react';
import {WhiteSpace, Button, WingBlank, Flex } from 'antd-mobile';
import {connect} from 'dva';
import {routerRedux, Link, hashHistory} from 'dva/router';
import classNames from 'classnames'


import styles from './info.less'
import commonStyles from '../Common/common_list.less'

function Info({
  location,
  data,
  contactAccount,
  refreshContact,
  refreshOpenAccount
}) {


  let D = data.userInfo.data;
  if(!D) return (<div></div>);


  const isContactBool = D.kaisa_account_info||data.contact.isConnect;

  const isOpenBool = (D.kaisa_account_info?D.kaisa_account_info.open_status:D.kaisa_account_info)||data.openAccount.isConnect;

  const replaceNull = (val)=>{
    return val?val:'--';
  }

	return (
    <div className={styles.personalInfo}>
      <div className={styles.user_info}>
          <img src={D.personal_info.avatar?D.personal_info.avatar:'./src/assets/avatar.png'} alt="" />
          <p>{D.personal_info.name}</p>
      </div>
      <div className={styles.basic_info}>
          <p className={styles.title}>基本信息</p>
          <table>
            <tbody>
              <tr>
                <td>姓名</td>
                <td>{D.personal_info.name}</td>
              </tr>
              <tr>
                <td>用户名</td>
                <td>{D.personal_info.username}</td>
              </tr>
              <tr>
                <td>性别</td>
                <td>{replaceNull(D.personal_info.sex)}</td>
              </tr>
              <tr>
                <td>身份证号</td>
                <td>{replaceNull(D.personal_info.id_no)}</td>
              </tr>
              <tr>
                <td>身份证签发机关</td>
                <td>{replaceNull(D.personal_info.id_publisher)}</td>
              </tr>
              <tr>
                <td>固定电话</td>
                <td>{replaceNull(D.personal_info.phone)}</td>
              </tr>
              <tr>
                <td>备用手机号</td>
                <td>{replaceNull(D.personal_info.mobile2)}</td>
              </tr>
              <tr>
                <td>紧急联系人</td>
                <td>{replaceNull(D.personal_info.emergency_contact)}</td>
              </tr>
              <tr>
                <td>紧急联系人手机</td>
                <td>{replaceNull(D.personal_info.emergency_mobile)}</td>
              </tr>
            </tbody>
          </table>
          <Link to={{ pathname: `/personal/personalInfo/edit`,query:{id:D.personal_info.id}}}>编辑</Link>
      </div>
      <div className={styles.account_connect}>
          <p className={styles.title}>账户关联</p>
          <div className={styles.account_list}>
            <div className={styles.al_left}>
              <p className={classNames({[`${styles.has_connect}`]:isContactBool})}><span></span>{isContactBool?'已关联':'未关联'}</p>
              <p>账户关联状态</p>
            </div>
            <div className={classNames({[`${commonStyles.common_hide}`]:isContactBool},styles.al_right)}>
              <span onClick = {refreshContact} className={styles.refresh_icon}><img className={classNames({[`${styles.Rotation}`]:data.contact.rotate})} src="./src/assets/refresh.png" alt=""/></span>
              <Button type="primary" inline size="small" onClick={() =>{contactAccount(D.personal_info.id)} }>去关联</Button>
            </div>
          </div>
          <div className={styles.account_list}>
            <div className={styles.al_left}>
              <p className={classNames({[`${styles.has_connect}`]:isOpenBool})}><span></span>{isOpenBool?'已开户':'未开户'}</p>
              <p>存管账户开户</p>
            </div>
            <div className={classNames({[`${commonStyles.common_hide}`]:isOpenBool},styles.al_right)}>
              <span onClick = {refreshOpenAccount} className={styles.refresh_icon}><img className={classNames({[`${styles.Rotation}`]:data.openAccount.rotate})} src="./src/assets/refresh.png" alt=""/></span>
              <Button type="primary" inline size="small" onClick={() => {hashHistory.push(`/goH5?url=https://h5.kaisafax.com/m/login/index`)}}>去开户</Button>
            </div>
          </div>
          <div className={styles.account_brief}>
            <p>我们使用您的当前 手机号码 查询了您在金服网站www.kaisafax.com的账号注册、账号关联绑定、汇付/中信银行第三方存管账号开户状态显示在上方。请先完成账号关联和存管账号开户，否则无法收到您的推荐佣金。</p>
            <p>系统会在您登陆APP后检测您的状态并自动跳转到金服注册页面，请您按照提示完成注册及存管开户。如您没能完成绑定及开户，请通过邮件发送到BD@kaisafax.com联系我们。</p>
          </div>
      </div>
      <div className={styles.account_group}>
        <p className={styles.title}>隶属组织</p>
        <table>
          <tbody>
          {
            D.agency_info.map(function(value){
              return (
                  <tr key={value.level_key}>
                    <td>{value.level_key}</td>
                    <td>{value.level_name}</td>
                  </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    </div>
	)
}


export default Info;
