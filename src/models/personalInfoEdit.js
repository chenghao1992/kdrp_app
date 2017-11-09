import {getUserInfo, reviseUserInfo} from '../services/personalCenter'
import {browserHistory, hashHistory} from 'dva/router'
import { Toast } from 'antd-mobile';

export default {

  namespace: 'personalInfoEdit',

  state: {
      initData: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/personal/personalInfo/edit') {
            dispatch({
              type: 'getEidtUserInfo',
            })
        }
      })
    },
  },

  effects: {
    *getEidtUserInfo({ payload }, { call, put }) {
        const data = yield call(getUserInfo);
        yield put({
          type: 'setInitData',
          payload: data
        })
    },
    *reviseUserInfo({ payload }, { call, put }) {
        const data = yield call(reviseUserInfo,payload);
        if(data.status == 'success'){
          hashHistory.go(-1);
        }
    },
  },

  reducers: {
    setInitData(state, action) {
      return { ...state, initData:action.payload};
    },
    setReviseData(state, action) {
      return { ...state, reviseData:action.payload };
    }
  }

}
