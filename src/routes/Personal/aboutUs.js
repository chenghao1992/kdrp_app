import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {WhiteSpace, WingBlank } from 'antd-mobile';

import Header from '../../components/Common/header'
import About from '../../components/Personal/about'

function AboutUs({
  location,
  aboutUs
}) {

  console.log(aboutUs)

  const headerProps = {
    headerText: '我的',
    goToUrl: '/personal/personalCenter',
    mode: 'light'
  }

  return (
    <div>
      <Header {...headerProps}/>
      <About />
    </div>
  );
}

AboutUs.propTypes = {
  location: PropTypes.object.isRequired
};


export default connect(({ aboutUs }) => ({ aboutUs }))(AboutUs)


