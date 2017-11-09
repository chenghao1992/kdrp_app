import React, {PropTypes} from 'react';
import {connect} from 'dva';

import Header from '../../components/Common/header'

import styles from './personal.less';

function CommonProblem({
  location,
  commonProblem
}) {

  console.log(commonProblem);

  const headerProps = {
    headerText: '我的',
    goToUrl: '/personal/personalCenter',
    mode: 'light'
  }

  const setContent = ()=>{
      if(commonProblem.data){
        console.log(commonProblem.data)
        const ct = document.getElementById('content');
        if(ct){
          ct.innerHTML = commonProblem.data.content;
        }
        
      }
  }
  setContent();
  return (
    <div className={styles.common_problem}>
      <Header {...headerProps}/>
      <div className={styles.content}>
          <h3>常见问题</h3>
          <div id="content" >


          </div>
      </div>
      
    </div>
  );
}

CommonProblem.propTypes = {
  location: PropTypes.object.isRequired
};


export default connect(({ commonProblem }) => ({ commonProblem }))(CommonProblem)

