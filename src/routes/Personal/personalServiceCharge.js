import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { WhiteSpace, WingBlank } from 'antd-mobile';

import Header from '../../components/Common/header'
import ServiceChargeDate from '../../components/Personal/serviceChargeDate'

function PersonalServiceCharge({
  location,
  personalServiceCharge,
  dispatch
}) {

  const headerProps = {
    headerText: '返回',
    goBack: true,
    mode: 'light'
  }

  const serviceChargeProps = {
    data: personalServiceCharge,
    handleChange(data){
        dispatch({
          type: 'personalServiceCharge/getServiceCharge',
          payload: data
        })
    },
    handleChangeBtn(){
        dispatch({
          type: 'personalServiceCharge/changeBtnStatus',
        })
    },

  }

  return (
    <div>
      <Header {...headerProps}/>
      <WhiteSpace size='xl'/>
      <ServiceChargeDate  {...serviceChargeProps}/>

    </div>
  );
}

PersonalServiceCharge.propTypes = {
  location: PropTypes.object.isRequired
};

export default connect(({ personalServiceCharge }) => ({ personalServiceCharge }))(PersonalServiceCharge)
