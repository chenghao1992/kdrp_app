import {getCommonProblem} from '../services/personalCenter'
import {browserHistory, hashHistory} from 'dva/router'

export default {

  namespace: 'commonProblem',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/personal/commonProblem') {
          dispatch({
            type: 'getContent'
          })
        }
      })
    },
  },

  effects: {
    *getContent({ payload }, { call, put }) {
        const data = yield call(getCommonProblem);
        yield put({
          type: 'setState',
          payload: data
        })
    },
  },

  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
