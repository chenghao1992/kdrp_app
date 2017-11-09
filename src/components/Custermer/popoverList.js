import React, {PropTypes,Component }from 'react';
import { Popup, List, Button, InputItem, Icon,Toast } from 'antd-mobile';
import {INIT_CODE} from '../../utils/enums'

import styles from '../Custermer/popoverList.less'

function PopupContent({onClose,value,propCode,changeInitCode}) {

  const onSel = (sel,data,code) => {
    onClose();
    propCode(sel,data);
    const dataCode = INIT_CODE[data];
    const params = {[dataCode]: code};
    changeInitCode(params)
  };
  return (
    <List>
      {
        value.map(d => {
          return (
            <List.Item
              thumb=""
              key={d.value}
              onClick={() => {onSel(d.value,d.data,d.code); }}
            >{d.label}</List.Item>
          )
          }
        )
      }
    </List>
  );
}

const Test = ({onSearchCode,initCode={},changeInitCode}) => {

  const onMaskClose = () => {
    console.log('onMaskClose');
  };
  const onClick1 = (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    const value = [{label:'不限制',value:'',data:'is_pnr',code:'开户'},{label:'已开户',value: 1,data:'is_pnr',code: '已开户'},{label:'未开户',value: 0,data:'is_pnr',code:'未开户'}]
    Popup.show(<PopupContent  onClose={() => Popup.hide()} value={value} propCode={onSearchCode} changeInitCode={changeInitCode}/>, { onMaskClose});
    document.getElementsByTagName('body')[0].scrollTop = 0;
  };

  const onClick2 = (e) => {
    e.preventDefault();
    const value = [{label:'不限制',value:'',data:'is_invest',code: '投资'},{label:'已投资',value: 1,data:'is_invest',code: '已投资'},{label:'未投资',value: 0,data:'is_invest',code: '未投资'}]
    Popup.show(<PopupContent onClose={() => Popup.hide()} value={value} propCode={onSearchCode} changeInitCode={changeInitCode}/>, { onMaskClose});
    document.getElementsByTagName('body')[0].scrollTop = 0;
  }

  const onClick3 = (e) => {
    e.preventDefault();
    const value = [{label:'不限制',value:'',data:'available',code: '余额'},{label:'小于￥100',value: 'lt_100',data:'available',code: '<100'},{label:'大于￥100',value: 'gt_100',data:'available',code: '>100'},{label:'大于￥10000',value: 'gt_10000',data:'available',code:'>10000'}]
    Popup.show(<PopupContent onClose={() => Popup.hide()} value={value} propCode={onSearchCode} changeInitCode={changeInitCode}/>, { onMaskClose});
    document.getElementsByTagName('body')[0].scrollTop = 0;
  }

  const onClick4 = (e) => {
    e.preventDefault();
    const value = [{label:'不限制',value:'',data: 'is_follow',code: '关注'},{label:'已关注',value: 1,data: 'is_follow',code: '已关注'},{label:'未关注',value: 0,data: 'is_follow',code: '未关注'}]
    Popup.show(<PopupContent onClose={() => Popup.hide()} value={value} propCode={onSearchCode} changeInitCode={changeInitCode}/>, { onMaskClose});
    document.getElementsByTagName('body')[0].scrollTop = 0;
  }


  return (
    <div className={styles.body_style}>
      <span className={styles.span_edit} onClick={onClick1}>{initCode.isPnr}<span className={styles.choice}></span></span>
      <span className={styles.span_edit} onClick={onClick2}>{initCode.isInvest}<span className={styles.choice}></span></span>
      <span className={styles.span_edit} onClick={onClick3}>{initCode.availableCode}<span className={styles.choice}></span></span>
      <span className={styles.span_edit1} onClick={onClick4}>{initCode.isFollow}<span className={styles.choice}></span></span>
    </div>
  );
};


export default Test
