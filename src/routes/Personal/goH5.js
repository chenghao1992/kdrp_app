import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {WhiteSpace, WingBlank } from 'antd-mobile';
import {hashHistory} from 'dva/router';
import styles from './goH5.less'

function GoH5({
  location,
}) {

  const url = window.location.hash.slice(11,-10);
  return (
    <div className={styles.goH5}>
     	<iframe src={url}></iframe>
     	<div className={styles.return_icon} onClick={()=>{hashHistory.push('/personal/personalInfo')}}>
     		<img src="./src/assets/return.png" alt=""/>
        <span>返回APP</span>
     	</div>
    </div>
  );
}

GoH5.propTypes = {
  location: PropTypes.object.isRequired
};


export default connect(({ GoH5 }) => ({ GoH5 }))(GoH5)


