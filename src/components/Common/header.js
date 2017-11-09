import React, {PropTypes} from 'react';
import {NavBar, Icon} from 'antd-mobile';
import {browserHistory, hashHistory} from 'dva/router'

import styles from './header.less';

function Header({
  location,
  headerText,
  goToUrl,
  goBack,
  mode,
  testCode
}) {

  const onLeft = ()=>{
    if(testCode){
      testCode();
      return;
    }
    goBack? hashHistory.goBack() : hashHistory.push(`${goToUrl}`)
  }

  return (
    <div className={styles.header_container} >
        <NavBar
          leftContent={headerText}
          mode={mode}
          onLeftClick={onLeft}
          rightContent={[
          ]}
        >
        </NavBar>
    </div>
  );
}

Header.propTypes = {
  //location: PropTypes.object.isRequired
};

export default Header;
