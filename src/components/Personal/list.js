import React, {PropTypes} from 'react';
import { List, Button, Popup, Icon, Toast } from 'antd-mobile';
import {connect} from 'dva';
import {browserHistory, hashHistory} from 'dva/router'

import styles from './list.less'

const Item = List.Item;
const Brief = Item.Brief;


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let maskProps;
if (isIPhone) {
  // Note: the popup content will not scroll.
  maskProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

function PersonalList({
  logout
}) {

  
    const onClose = () => {
        Popup.hide();
    };

    const onQuit= () => {
      onClose();
      logout();
    }

    const onClick = () => {
        // Toast.info('执行了')
        Popup.show(<div>
          <ul className = {styles.quit}>
            <li>退出后不会删除任何历史数据，下次登录依然可以使用本账号。</li>
            <li onClick={onQuit}>退出登录</li>
            <li className = {styles.line}></li>
            <li onClick={() => onClose()}>取消</li>
          </ul>
        </div>, { animationType: 'slide-up', maskProps, maskClosable: false });
    };


	return (
    <div className={styles.personal_list}>
      <List>
        <Item
          arrow="horizontal"
          onClick={() => { hashHistory.push('/personal/personalAccountList?url=/personal/personalCenter') }}
          className = 'item'
        >
          账单
        </Item>
        <Item
          arrow="horizontal"
          onClick={() => { hashHistory.push('/personal/personalServiceCharge') }}
        >
          服务费统计
        </Item>
        <Item
          arrow="horizontal"
          onClick={() => { hashHistory.push('/personal/personalResetPassword') }}
        >
          修改密码
        </Item>
        <Item
          arrow="horizontal"
          onClick={() => { hashHistory.push('/personal/aboutUs') }}
          className = 'item'
        >
          关于我们
        </Item>
        <Item
          arrow="horizontal"
          extra={'已经是最新版本'}
        >
          版本更新
        </Item>
        <Item
          arrow="horizontal"
          onClick={() => { hashHistory.push('/personal/commonProblem')}}
        >
          常见问题
        </Item>
      </List>
      <Button  onClick={() => { onClick() }}>退出登录</Button>
    </div>
	)
}


export default PersonalList;
