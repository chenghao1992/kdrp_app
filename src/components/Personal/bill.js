import React, {PropTypes} from 'react';
import {WhiteSpace, Button, WingBlank, Flex } from 'antd-mobile';
import {routerRedux, Link} from 'dva/router';
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './bill.less'
import { STATUS } from '../../utils/enums'
import classNames from 'classnames'
import {formatMoney} from '../../utils/helper'
function Bill({
  accountList,
  location
}) {

  const D  = accountList.data;
  if(!D||JSON.stringify(D) == '{}') return (<div className={styles.noData}>暂无数据</div>);

  const feeBill = D.employee_fee_bill;
  const feeDetail = D.employee_fee_details;
  const month = moment(feeBill.bill_month, "YYYY-MM").get('month')+1;
  const monthTotalDay = moment(feeBill.bill_month, "YYYY-MM").daysInMonth();
  const monthText = `${month}/01-${month}/${monthTotalDay}`;


	return (
    <div>
      <WhiteSpace size='xl'/>
      <div className={styles.bill_month}>
        <div className={styles.bill_month_top}>
          <p>{month}月账单<span>{monthText}</span></p>
          <Button size="small" inline type="primary">{STATUS[feeBill.status]}</Button>
        </div>
        <div className={styles.bill_month_bot}>
            <Flex>
              <Flex.Item>
                  <p>待结算</p>
                  <p>￥{feeBill.status== 'checking' || feeBill.status== 'check_refused' ?formatMoney(feeBill.accrued_amount):'0.00'}</p>
              </Flex.Item>
              <Flex.Item>
                  <p>已发放</p>
                  <p>￥{feeBill.status== 'pay_success'?formatMoney(feeBill.actally_amount):'0.00'}</p>
              </Flex.Item>
            </Flex>
        </div>
      </div>
      <WhiteSpace size='xl'/>
      <div className={classNames({[`${styles.bill_list}`]:feeDetail.length})}>
          <ul>
          { 
            feeDetail.map(function(val){
              return(
                <li key={val.id}>
                  <Link to={{ pathname: '/personal/personalAccountListDetail',query:{id:val.id,current_month:feeBill.bill_month,url:location.query.url}}}>
                      <p><span>{val.invest_time}</span><span>{val.name} {val.mobile}</span></p>
                      <p><span>{val.loan_title}</span><span>￥{formatMoney(val.invest_amount)}</span></p>
                  </Link>
                </li>
              )
              
            })
          }
          </ul>
      </div>
    </div>
	)
}




export default Bill;
