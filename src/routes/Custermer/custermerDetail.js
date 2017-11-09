import React, {PropTypes} from 'react';
import {connect} from 'dva';
import Header from '../../components/Common/header'
import CustermerDetails from '../../components/Custermer/custermerDetail'

import styles from './custermerList.less';

function CustermerDetail({location,dispatch, custermerDetail}) {

  const {getDetails,querySaves,isFollows} = custermerDetail

  const headerProps = {
    headerText: '返回',
    goToUrl: '/custermer/custermerList?detail=1',
    mode: 'light'
  }

  const CustermerDetailsProps = {
    getDetail: getDetails,
    querySaves,
    isFollows,
    handleClick (params) {
      dispatch ({
        type: 'custermerDetail/saveCustomer',
        payload: params
      })
    },
    handleFllow (params) {
      dispatch ({
        type: 'custermerDetail/handleFllow',
        payload: params
      })
    }
  }


  return (
    <div className={styles.normal}>
      <Header {...headerProps}/>
      <CustermerDetails {...CustermerDetailsProps}/>
    </div>
  );
}

CustermerDetail.propTypes = {
  location: PropTypes.object.isRequired
};

export default connect(({ custermerDetail }) => ({ custermerDetail }))(CustermerDetail)
