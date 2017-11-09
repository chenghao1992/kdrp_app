import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router'

import Tab from '../../components/Info/tab';

import styles from './informationList.less';

function InformationList({
  location,
  informationList,
  dispatch
}) {
	const tabProps = {
		data: informationList.data,
    pageData: informationList.pageData,
    page: informationList.page,
    query: location.query.catalog_id,
    hasMore: informationList.hasMore,
    onClick: function(params){
      dispatch({
        type: 'informationList/fetchList',
        payload: params
      })
    },
    clickToDetailsId: function (params) {
      dispatch({
        type: 'informationDetail/clickToDetails',
        payload: params
      })
    }
	}

  return (
    <div className={styles.normal}>
      <Tab {...tabProps}/>
    </div>
  );
}

InformationList.propTypes = {
  location: PropTypes.object.isRequired
};


export default connect(({ informationList }) => ({ informationList }))(InformationList)
