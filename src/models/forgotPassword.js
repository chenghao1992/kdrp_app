
import {resetPwd, getMobileCaptcha, confirmMobileCaptcha} from '../services/app'
import {browserHistory, hashHistory} from 'dva/router'
import { Toast } from 'antd-mobile';

export default {

  namespace: 'forgotPassword',

  state: {
    isFirstShow: false,
    isSecondShow: true,
    imageSrc: '/mobile/captcha_code',
    sms:{
      text: '发送',
      disabled: true
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/forgotPassword') {
          //do something
        }
      })
    },
  },

  effects: {
    *changeFirst({ payload }, { call, put }) {
        const data = yield call(confirmMobileCaptcha,payload);
        if(data.status == 'success'){
          yield put({
            type: 'changeFirstState',
            payload: {
                isFirstShow: true,
                isSecondShow: false,
            }
          })
        }
       
    },
    *firstInit({ payload }, { call, put }) {
        yield put({
          type: 'changeFirstState',
          payload: {
              isFirstShow: false,
              isSecondShow: true,
          }
        })
    },
    *getImageCaptcha({ payload }, { call, put }) {
        yield put({
          type: 'changeImageCaptcha',
          payload:{
            imageSrc: `/mobile/captcha_code?${new Date().getTime()}`
          }
      })
    },
    *resetPwd({ payload }, { call, put }) {
        const data = yield call(resetPwd,{...payload});
        if(data.status == 'success'){
           Toast.info('设置成功', 2, function(){
              hashHistory.push('/login');
           })
           
        }
    },
    *getMobileCaptcha({ payload }, { call, put }) {
        const data = yield call(getMobileCaptcha,payload.data);
        if(data.status == 'success'){
          yield put({
            type:'changeMobileCaptcha',
            payload: data
          })
          payload.callBack();
        }
    },
    *getSmsText({ payload }, { call, put }) {
        yield put({
          type:'changeSmsText',
          payload
        })
    },
  },

  reducers: {
    changeFirstState(state, action) {
      return { ...state, ...action.payload };
    },
    changeImageCaptcha(state, action) {
      return { ...state, ...action.payload };
    },
    changeMobileCaptcha(state, action) {
      return { ...state, ...action.payload };
    },
    changeSmsText(state, action) {
      return { ...state, sms:action.payload };
    },
  },
}
