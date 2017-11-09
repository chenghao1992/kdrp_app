import React, {PropTypes} from 'react';
import {connect} from 'dva';
import QRCode from 'qrcode-react'
import styles from './code.less'
import {iosOrAn} from '../../utils/helper'

function Code({getCodes}) {
  let height
  if (iosOrAn() === 'isAndroid') {
    height = 600
  } else if (iosOrAn() === 'isiOS') {
    height = window.screen.height >= 736 ? 600 : 398
  }

  return (
    <div className={styles.div_body}>
      <div className={styles.div_header}>
        <div className={styles.div_img}>
          <img className={styles.img_div} src={getCodes.avatar || './src/assets/avatar.png'} alt=""/>
          <p>{getCodes.name}</p>
        </div>
      </div>
      <div className={styles.div_2_body}>
        <div className={styles.div_2_code}>
          <QRCode value={getCodes.promo_url} size={height} />
        </div>
        <div className={styles.div_2_img}>
          <img src="./src/assets/logo_footer.png" alt=""/>
        </div>
      </div>
    </div>
  )
}
export default Code
