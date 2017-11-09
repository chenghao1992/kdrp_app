import {getAccountList} from '../services/personalAccountList'
import {browserHistory, hashHistory} from 'dva/router'
import moment from 'moment';
import { Toast } from 'antd-mobile';

export default {

  namespace: 'personalAccountList',

  state: {
    data: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/personal/personalAccountList') {
          let current_month = moment(location.query.current_month).format('YYYY-MM');
          let prev_month = moment().subtract(1, 'months').format('YYYY-MM');
          current_month = location.query.current_month?current_month:prev_month;
          dispatch({
            type: 'fetchRemote',
            payload: current_month
          })
        }
      })
    },
  },

  effects: {
    *fetchRemote({ payload }, { call, put }) {
        Toast.loading('正在加载...',0);
        const data = yield call(getAccountList,payload);
        if(data.status == 'success'){
          yield put({
            type: 'setState',
            payload: data
          })
          Toast.hide();
        }
        
    },
  },

  reducers: {
    setState(state, action) {
      return { ...state, data:action.payload };
    },
  },
}
