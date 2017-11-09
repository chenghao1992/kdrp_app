import {infoDetail} from '../services/infoDetail'
import {browserHistory, hashHistory} from 'dva/router'
import {Toast} from 'antd-mobile'


export default {

  namespace: 'informationDetail',

  state: {
    headerStatus: false,
    data: {},
    clickGoTo: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/information/informationDetail') {
          dispatch({
            type: 'clearData',
            payload: {}
          })
          dispatch({
            type: 'fetchRemote',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *fetchRemote({ payload }, { call, put }) {
      Toast.loading('请稍候',1.2)
      const data = yield call(infoDetail, payload);
      if(data && data.status === 'success') {
        yield put({
          type: 'setState',
          payload: data.data
        })
      }
    },
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
    setState(state, action) {
      return {...state, data: action.payload}
    },
    clickToDetails (state, action) {
      return {...state, clickGoTo: action.payload}
    },
    clearData (state, action) {
      return {...state, data: action.payload}
    }
  },
}
