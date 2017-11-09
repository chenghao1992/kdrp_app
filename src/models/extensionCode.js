import {getUserInfo} from '../services/personalCenter'
import {browserHistory, hashHistory} from 'dva/router'
import {Toast} from 'antd-mobile'

export default {

  namespace: 'extensionCode',

  state: {
    getCodes: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/extensionCode') {
          dispatch({
            type: 'getUserInfo',
          })
        }
      })
    },
  },

  effects: {
    *getUserInfo ({ payload }, { call, put }) {
      const data = yield call(getUserInfo);
      if(data && data.status === 'success') {
        yield put({
          type: 'getCode',
          payload: data.data.personal_info
        })
      }
    }
  },

  reducers: {
    getCode (state,action) {
      return {...state,getCodes: action.payload}
    }
  },

}
