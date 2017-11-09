import {customerDetail, giveCustomer, followCustomer} from '../services/customer'
import { Toast } from 'antd-mobile'
import { hashHistory } from 'dva/router'

export default {
  namespace: 'custermerDetail',
  state: {
    getDetails: {},
    querySaves: {},
    isFollows: false
  },

  subscriptions: {
    setup({dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/custermer/custermerDetail') {
          dispatch({
            type: 'querySave',
            payload: location.query
          })
          dispatch({
            type: 'customerDetail',
            payload: location.query
          })
        }
      })
    },
  },

  effects: {
    *customerDetail({ payload }, { call, put }) {
      const data = yield call(customerDetail,payload.id);
      if(data && data.status === 'success') {
        yield put({
          type: 'getDetail',
          payload: data.data
        })
        yield put({
          type: 'isFollow',
          payload: data.data.is_follow
        })
      }
    },
    *saveCustomer ({ payload }, { call, put }) {
      const params = {customer_ids:[payload.id]}
      const data = yield call(giveCustomer,params);
      if (data && data.status === 'success') {
        console.log(data.data)
        Toast.info('上交成功',0.8);
        yield put({
          type: 'custermerList/customerList'
        });
        setTimeout(() => {
          hashHistory.push('/custermer/custermerList')
        },800)

      }
    },
    *handleFllow ({ payload }, { call, put }) {
      const data = yield call(followCustomer,payload);
      if(data && data.status === 'success') {
        yield put({
          type: 'customerDetail',
          payload: payload.querySaves
        })
        Toast.info(data.data, 0.8)
      }
    }
  },

  reducers: {
    getDetail(state, action) {
      return { ...state, getDetails: action.payload };
    },
    querySave (state, action) {
      return {...state, querySaves: action.payload }
    },
    isFollow (state, action) {
      return {...state, isFollows: action.payload }
    }
  },
}
