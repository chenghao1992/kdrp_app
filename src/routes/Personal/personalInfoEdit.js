import React, {PropTypes} from 'react';
import { WhiteSpace, WingBlank } from 'antd-mobile';
import {connect} from 'dva';
import Header from '../../components/Common/header';
import InfoEditForm from '../../components/Personal/infoEditForm';
import styles from './personal.less';

function PersonalInfoEdit({
  location,
  personalInfoEdit,
  dispatch
}) {

  const headerProps = {
    headerText: '个人信息',
    goToUrl:'/personal/personalInfo',
    mode: 'light'
  }

  const infoEditProps = {
    location,
    handleInforEdit(params){
      dispatch({
        type: 'personalInfoEdit/reviseUserInfo',
        payload: params
      })
    },
    personalInfoEdit,
  }


  return (
    <div className={styles.personalInfo_edit}>
      <Header {...headerProps}/>
      <WhiteSpace size='xl'/>
      <InfoEditForm {...infoEditProps} />
    </div>
  );
}

PersonalInfoEdit.propTypes = {
  location: PropTypes.object.isRequired
};

export default connect(({ personalInfoEdit }) => ({ personalInfoEdit }))(PersonalInfoEdit)
