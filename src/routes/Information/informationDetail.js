import React, {PropTypes} from 'react';
import {connect} from 'dva';

import Header from '../../components/Common/header'
import Detail from '../../components/Info/detail';

import styles from './informationList.less';

function InformationDetail({
  location,
  informationDetail
}) {
  let catalog_id;
  //const data = informationDetail.data;
  const {data, clickGoTo} = informationDetail;

  if (data) {
    catalog_id = data.catalog_id;
  };

  console.log(location.query.url)
  // const URL = clickGoTo === 'home' ? '/home' : '/information/informationList?catalog_id='+catalog_id;

  const headerProps = {
    headerText: '返回',
    goToUrl: location.query.url?location.query.url:'/information/informationList?catalog_id='+catalog_id,
    mode: 'light'
  }

  const infoProps = {
    data: data,
  }
  console.log(clickGoTo)

  return (
    <div className={styles.normal}>
      <Header {...headerProps}/>
      {data.content? <Detail {...infoProps}/> : ''}
    </div>
  );
}

InformationDetail.propTypes = {
  location: PropTypes.object.isRequired
};

export default connect(({ informationDetail }) => ({ informationDetail }))(InformationDetail)
