import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router'
import { Icon, Grid, Toast, Button } from 'antd-mobile';

import PersonalList from '../../components/Personal/list'
import Header from '../../components/Common/header'

import styles from './personal.less';


function PersonalCenter({
  location,
  personalCenter,
  dispatch
}) {


   const listProps = {
    logout:function(){
        dispatch({
          type: 'personalCenter/logout'
        })
    }
  }


  const data = personalCenter.data.data;
  if(!data)  return (<div></div>);

  return (
    <div className={styles.normal}>
        <div className={styles.personal_header}>我的</div>
        <div className={styles.personal_userinfo}>
          <Link to={{ pathname: '/personal/personalInfo'}}>
            <img src={data.personal_info.avatar?data.personal_info.avatar:'./src/assets/avatar.png'} alt="" />
            <div className={styles.personal_info_cont}>
              <p>{data.personal_info.name}</p>
              <p>{data.personal_info.username}</p>
            </div>
            <Icon type="right" />
          </Link>
        </div>
        <PersonalList {...listProps}/>
    </div>
  );
}


PersonalCenter.propTypes = {
  location: PropTypes.object.isRequired
};

export default connect(({ personalCenter }) => ({ personalCenter }))(PersonalCenter)
