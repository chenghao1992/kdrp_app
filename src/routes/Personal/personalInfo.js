import React, {PropTypes} from 'react';
import { Button} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';


import Header from '../../components/Common/header'
import Info from '../../components/Personal/info'


function PersonalInfo({
  location,
  personalInfo,
  dispatch
}) {

  const headerProps = {
    headerText: '我的',
    goToUrl: '/personal/personalCenter',
    mode: 'light',
    testCode(){
      dispatch({
        type:'personalInfo/testCode'
      })
    }
  }

  const infoProps = {
    location,
    data: personalInfo,
    refreshContact(){
      dispatch({
        type: 'personalInfo/getIsContact',
        payload: {
          rotate: true
        }
      })
    },
    refreshOpenAccount(){
      dispatch({
        type: 'personalInfo/getIsOpenAccount',
        payload: {
          rotate: true
        }
      })
    },
    contactAccount(id){
      dispatch({
        type: 'personalInfo/goContactAccount',
        payload: id
      })
    }

  }




  return (
    <div>
      <Header {...headerProps}/>
      <Info {...infoProps}/>
    </div>
  );
}

PersonalInfo.propTypes = {
  location: PropTypes.object.isRequired
};

export default connect(({ personalInfo }) => ({ personalInfo }))(PersonalInfo)
