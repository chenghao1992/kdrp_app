import React, {PropTypes} from 'react';
import { Grid } from 'antd-mobile';
import {browserHistory, hashHistory} from 'dva/router'
import {HEADER_URL} from '../../utils/enums'

import styles from './home.less';

function ListIcon({handleQRcode}) {

  const handleClick = (_el) => {
    if (_el.text === '推广') {
      handleQRcode(_el.text);
    } else {
      hashHistory.push(`${HEADER_URL[_el.text]}`)
    }
  }

  const data = [
    {icon: './src/assets/logo1.png', text: `推广`,},
    {icon: './src/assets/logo2.png', text: `客户`,},
    {icon: './src/assets/logo3.png', text: `服务费`,},
    {icon: './src/assets/logo4.png', text: `账单`,},
  ]

  return (
    <div className={styles.normal}>
      <Grid data={data} hasLine={false} onClick={(_el) => {handleClick(_el)}}/>
    </div>
  );
}

ListIcon.propTypes = {
  //location: PropTypes.object.isRequired
};

export default ListIcon;
