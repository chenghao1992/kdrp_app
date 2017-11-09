import React, {PropTypes} from 'react';
import {TabBar} from 'antd-mobile';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import styles from './footer.less';

function Footer({
  dispatch, childrens, location, hidden
}) {
  return (
    <div className={styles.normal}>
      <TabBar
        unselectedTintColor="#a0a0a0"
        tintColor="#ee7700"
        barTintColor="white"
        hidden={false}
      >
        <TabBar.Item
          title="首页"
          key="首页"
          icon={{uri: './src/assets/tab-menu1_1.png'}}
          selectedIcon={{uri: './src/assets/tab-menu1.png'}}
          selected={location.pathname === '/home'}
          onPress={() => dispatch(routerRedux.push('/home'))}
        >
          {childrens}
        </TabBar.Item>
        <TabBar.Item
          title="客户"
          key="客户"
          icon={{uri: './src/assets/tab-menu2_1.png'}}
          selectedIcon={{uri: './src/assets/tab-menu2.png'}}
          selected={location.pathname === '/custermer/custermerList'}
          onPress={() => dispatch(routerRedux.push('/custermer/custermerList'))}
        >
          {childrens}
        </TabBar.Item>
        <TabBar.Item
          title="资讯"
          key="资讯 "
          icon={{uri: './src/assets/tab-menu3_1.png'}}
          selectedIcon={{uri: './src/assets/tab-menu3.png'}}
          selected={location.pathname === '/information/informationList'}
          onPress={() => dispatch(routerRedux.push('/information/informationList'))}
        >
          {childrens}
        </TabBar.Item>
        <TabBar.Item
          title="我的"
          key="我的"
          icon={{uri: './src/assets/tab-menu4_1.png'}}
          selectedIcon={{uri: './src/assets/tab-menu4.png'}}
          selected={location.pathname === '/personal/personalCenter'}
          onPress={() => dispatch(routerRedux.push('/personal/personalCenter'))}
        >
          {childrens}
        </TabBar.Item>
      </TabBar>
    </div>
  );
}

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  childrens: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Footer);
