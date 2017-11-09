/**
 * Created by xiaoys on 2017/8/29.
 */
import React, {PropTypes} from 'react';
import {connect} from 'dva';

import Code from '../../components/Extension/code'
import Header from '../../components/Common/header'

function ExtensionCode({extensionCode}) {

  const {getCodes} = extensionCode

  const headerProps = {
    headerText: '返回',
    goToUrl: '/home',
    mode: 'dark'
  };

  const codeProps = {
    getCodes
  }

  return (
    <div>
      <Header {...headerProps}/>
      <Code {...codeProps}/>
    </div>
  )
}

ExtensionCode.propTypes = {
  location: PropTypes.object.isRequired
};


export default connect(({ extensionCode }) => ({ extensionCode }))(ExtensionCode);
