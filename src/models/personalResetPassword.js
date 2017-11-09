
import {changePwd} from '../services/personalCenter'
import {browserHistory, hashHistory} from 'dva/router'
export default {

  namespace: 'personalResetPassword',

  state: {
    imageSrc: '/mobile/captcha_code',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/personal/personalResetPassword') {
          //do something
        }
      })
    },
  },

  effects: {
    *getImageCaptcha({ payload }, { call, put }) {
        yield put({
          type: 'changeImageCaptcha',
          payload:{
            imageSrc: `/mobile/captcha_code?${new Date().getTime()}`
          }
      })
    },
    *changePwd({ payload }, { call, put }) {
        const data = yield call(changePwd,payload);
       if(data.status == 'success'){
          hashHistory.push('/login');
       }
    },
  },

  reducers: {
    changeImageCaptcha(state, action) {
      return { ...state, ...action.payload };
    }
  },
}
