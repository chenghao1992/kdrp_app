/**
 * Created by xiaoys on 2017/8/29.
 */
import React, {PropTypes} from 'react';
import { Modal, Button, WhiteSpace, WingBlank } from 'antd-mobile';

function ModalBtn({
  title,
  message1,
  message2,
  handlePressOk,
  handlePressCannel,
}) {

  const onPressOk = () => {
    handlePressOk()
  };

  const onPressCannel = () => {
    handlePressCannel()
  };

  return (
    <Modal
      title={title}
      transparent
      maskClosable={false}
      visible={true}
      onClose={onPressCannel}
      footer={[
        { text: '取消', onPress: onPressCannel},
        { text: '确定', onPress: onPressOk}
        ]}
    >
      {message1}<br />
      {message2}<br />
    </Modal>
  )
}

export default ModalBtn
