
import React, {PropTypes} from 'react';
import {connect} from 'dva';

import Header from '../../components/Common/header'
import AccountListDetail from '../../components/Personal/accountListDetail'

import styles from './personal.less';

function PersonalAccountListDetail({
  location,
  personalAccountListDetail
}) {


  const headerProps = {
    headerText: '返回',
    goToUrl: `/personal/personalAccountList?current_month=${location.query.current_month}&url=${location.query.url}`,
    mode: 'light'
  }

  return (
    <div>
      <Header {...headerProps}/>
      <AccountListDetail data = {personalAccountListDetail}  />
    </div>
  );
}

PersonalAccountListDetail.propTypes = {
  location: PropTypes.object.isRequired
};


export default connect(({ personalAccountListDetail }) => ({ personalAccountListDetail }))(PersonalAccountListDetail)

