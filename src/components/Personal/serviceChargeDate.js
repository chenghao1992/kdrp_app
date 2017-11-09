import React, {PropTypes} from 'react';
import { createForm } from 'rc-form';
import { DatePicker, List, Button, WhiteSpace, WingBlank, Toast  } from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './serviceChargeDate.less';
import commonStyles from '../Common/common_list.less'
import classNames from 'classnames'
import {formatMoney} from '../../utils/helper'

function ServiceChargeDate({
  location,
  form: {
    getFieldProps,
    getFieldsValue,
  },
  handleChange,
  handleChangeBtn,
  data
}) {


  const zhNow = moment().locale('zh-cn').utcOffset(8);
  const minDate = moment('2010-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
  if(!data.data) return (<div></div>);
  const D = data.data;
  const onSubmit = (e)=>{
    e.preventDefault();
    const date = {...getFieldsValue()};
    if(!date.startTime){
        Toast.info('请选择开始日期')
        return;
    }
    if(!date.endTime){
        Toast.info('请选择结束日期')
        return;
    }

    if(date.startTime.unix() > date.endTime.unix()){
      Toast.info('开始日期不能大于结束日期')
      return;
    }
    const datas = {
      start_end_time: ''
    }
    datas.start_end_time = `${date.startTime.format('YYYY-MM-DD')}~${date.endTime.format('YYYY-MM-DD')}`;
    handleChange(datas);
  }


  return (
    <div  className={styles.personal_service_chanrge}>
      <List
        className="date-picker-list"
        style={{ backgroundColor: 'white' }}
      >
        <DatePicker
          mode="date"
          title="选择日期"
          extra="请选择"
          {...getFieldProps('startTime',{
            onChange: handleChangeBtn,
          })}
          minDate = {minDate}
          maxDate = {zhNow}
          defaultDate = {zhNow}
        >
          <List.Item arrow="horizontal">开始日期</List.Item>
        </DatePicker>
        <DatePicker
          mode="date"
          title="选择日期"
          extra="请选择"
          {...getFieldProps('endTime',{
             onChange: handleChangeBtn
          })}
          minDate = {minDate}
          maxDate = {zhNow}
          defaultDate = {zhNow}
        >
          <List.Item arrow="horizontal">结束日期</List.Item>
        </DatePicker>
      </List>
      <WhiteSpace size='xl'/>
      <WingBlank>
        <Button onClick={onSubmit} className={classNames({[`${styles.disabled}`]:data.disabled},'btn')} type="primary" >查询</Button>
      </WingBlank>
      <div className={classNames({[`${commonStyles.common_hide}`]:data.show},styles.query_result)}>
          <p>昨日时点值</p>
          <table>
              <tbody>
                <tr>
                  <td>客户数</td>
                  <td>{D.yesterday.customer_cnt}</td>
                </tr>
                <tr>
                  <td>有效客户数</td>
                  <td>{D.yesterday.valid_customer_cnt}</td>
                </tr>
                <tr>
                  <td>活跃客户数</td>
                  <td>{D.yesterday.active_customer_cnt}</td>
                </tr>
                <tr>
                  <td>账户余额总额</td>
                  <td>¥{formatMoney(D.yesterday.available)}</td>
                </tr>
              </tbody>
          </table>
      </div>
       <div className={classNames({[`${commonStyles.common_hide}`]:!data.show},styles.query_result)}>
          <p>区间值</p>
          <table>
              <tbody>
                <tr>
                  <td>投资客户数</td>
                  <td>{D.range.invest_user_cnt}</td>
                </tr>
                <tr>
                  <td>投资笔数</td>
                  <td>{D.range.invest_cnt}</td>
                </tr>
                <tr>
                  <td>投资金额</td>
                  <td>¥{formatMoney(D.range.invest_amount)}</td>
                </tr>
                <tr>
                  <td>年化投资金额</td>
                  <td>¥{formatMoney(D.range.invest_annual_amount)}</td>
                </tr>
              </tbody>
          </table>
      </div>
    </div>
  );
}


export default createForm()(ServiceChargeDate)

