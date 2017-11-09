import {getUserInfo} from '../services/personalCenter'
import {logout} from '../services/app'
import {browserHistory, hashHistory} from 'dva/router'
import { Toast } from 'antd-mobile';
import {setLoginIn} from '../utils/index'
import {Popup} from 'antd-mobile'

export default {

  namespace: 'personalCenter',

  state: {
    data: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/personal/personalCenter') {
          dispatch({
            type: 'fetchRemote',

          })
        } else {
          Popup.hide()
        }
      })
    },
  },

  effects: {
    *fetchRemote({ payload }, { call, put }) {
        const data = yield call(getUserInfo);
        yield put({
          type: 'setState',
          payload: data
        })
    },
    *logout({ payload }, { call, put,select }) {
        Toast.loading('正在注销...', 0);
        const data = yield call(logout);
        if(data.status == 'success'){
          const usename = yield select(({ personalCenter }) => personalCenter.data.data.personal_info.username)
          yield setLoginIn(usename);
          Toast.hide();
          hashHistory.push('/login');
        }
    },
  },

  reducers: {

    setState(state, action) {
      return { ...state, data:action.payload };
    },
  },
}
