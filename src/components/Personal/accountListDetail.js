import React, {PropTypes} from 'react';
import { WhiteSpace } from 'antd-mobile';
import {routerRedux, Link} from 'dva/router';
import styles from './accountListDetail.less';
import {STATUS} from '../../utils/enums'
import {formatMoney} from '../../utils/helper'

function AccountListDetail(data) {
  if(!data.data.data) return (<div></div>);
  const D = data.data.data; 
	return (
    <div className={styles.personal_account_detail}>
        <div className={styles.total_amount}>
          交易金额<span>￥{formatMoney(D.invest_amount)}</span>
        </div>
        <table>
          <tbody>
            <tr>
              <td>客户姓名</td>
              <td>{D.customer_name}</td>
            </tr>
            <tr>
              <td>客户账号</td>
              <td>{D.customer_mobile}</td>
            </tr>
            <tr>
              <td>相关标的</td>
              <td>{D.loan_title}</td>
            </tr>
            <tr>
              <td>服务费比例</td>
              <td>{D.rate}%</td>
            </tr>
            <tr>
              <td>服务费金额</td>
              <td>¥{formatMoney(D.fee_amount)}</td>
            </tr>
            <tr>
              <td>客户投标时间</td>
              <td>{D.invest_time}</td>
            </tr>
            <tr>
              <td>标的放款时间</td>
              <td>{D.loan_time}</td>
            </tr>
            <tr>
              <td>服务费生成时间</td>
              <td>{D.create_time}</td>
            </tr>
            <tr>
              <td>服务费发放时间</td>
              <td>{D.pay_time?D.pay_time:'--'}</td>
            </tr>
            <tr>
              <td>状态</td>
              <td>{STATUS[D.status]}</td>
            </tr>
          </tbody>
        </table>
    </div>
	)
}


export default AccountListDetail;
