import React, {PropTypes} from 'react';
import { createForm } from 'rc-form';
import { DatePicker, MonthPicker ,List } from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';


function AccountListDate({
  location,
  form: {
    getFieldProps,
    getFieldsValue,
  },
  handleChange
}) {


  const zhNow = moment().locale('zh-cn').utcOffset(8);
  const prev_month  = moment().subtract(1, 'months');
  const onChange = (value)=>{
    let currentMonth = value.format('YYYY-MM');
    handleChange(currentMonth)
  }

  let current_month = moment(location.query.current_month);
  current_month = location.query.current_month?current_month:prev_month;

  return (
    <div>
      <List
        className="date-picker-list"
        style={{ backgroundColor: 'white' }}
      >
        <DatePicker
          mode="month"
          title="选择日期"
          extra="请选择"
          {...getFieldProps('change',{
            initialValue: current_month,
            onChange: onChange
          })}
          format={val => val.format('YYYY-MM')}
          maxDate = {zhNow}
        >
          <List.Item arrow="horizontal">账单月份</List.Item>
        </DatePicker>
      </List>
    </div>
  );
}


export default createForm()(AccountListDate)

