
import {getAccountListDetail} from '../services/personalAccountList'
import {browserHistory, hashHistory} from 'dva/router'

export default {

  namespace: 'personalAccountListDetail',

  state: {
    aaa: 'personalAccountListDetail'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/personal/personalAccountListDetail') {
          dispatch({
            type: 'getListDetail',
            payload: location.query.id
          })
        }
      })
    },
  },

  effects: {
    *getListDetail({ payload }, { call, put }) {
        const data = yield call(getAccountListDetail,payload);
        yield put({
          type: 'changeDetailState',
          payload: data
        })
    },
  },

  reducers: {
    changeDetailState(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
