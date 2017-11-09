import React, {PropTypes} from 'react';
import {connect} from 'dva';

import ListIcon from '../../components/Home/listIcon.js'
import Banner from '../../components/Home/banner'
import List from '../../components/Home/list'

import styles from './index.less';

function Index({dispatch, home,}) {
  const {headerStatus, bannerList,dashboardCode,autoPlay} = home;

  const {customer,employee_fee_bill,employee_fee_detail} = dashboardCode;

  const bannerProps = {
    autoPlay,
    bannerList,
    clickToDetails (params) {
      dispatch({
        type: 'informationDetail/clickToDetails',
        payload: params
      })
    }
  }

  const listProps = {
    dashboardCode,
    customer,
    employee_fee_bill,
    employee_fee_detail,
    onRefreshs () {
      dispatch({
        type: 'home/dashboard'
      })
    }
  }

  const listIconProps = {
    handleQRcode(params) {
      dispatch ({
        type: 'home/detail',
        payload: params
      })
    }
  }

  return (
    <div className={styles.normal}>
      <Banner {...bannerProps}/>
      <ListIcon {...listIconProps}/>
      {dashboardCode.customer ? <List {...listProps}/> : ''}
    </div>
  );
}

Index.propTypes = {
  location: PropTypes.object.isRequired
};

export default connect(({ home }) => ({ home }))(Index)

