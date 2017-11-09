import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router'

import DomeList from '../../components/Custermer/custermerList'

import styles from './custermerList.less';


function CustermerList({location, custermerList,dispatch}) {

  const {customerListes,initCode,initSearchValues} = custermerList;

  const domeListProps = {
    initCode,
    initSearchValues,
    provinceData: customerListes,
    onSearch (params,data) {
      dispatch({
        type: 'custermerList/search',
        payload: {params,data}
      })
    },
    onSearchName (params,data) {
      dispatch({
        type: 'custermerList/search',
        payload: {params,data}
      })
      dispatch({
        type: 'custermerList/initSearchValue',
        payload: params
      })
    },
    changeInitCode (params) {
      dispatch({
        type: 'custermerList/changeInitCode',
        payload: params
      })
    }
  }

  return (
    <div className={styles.normal} >
      <DomeList {...domeListProps}/>
    </div>
  );
}

CustermerList.propTypes = {
  location: PropTypes.object.isRequired
};

export default connect(({ custermerList }) => ({ custermerList }))(CustermerList)
