import {customerList} from '../services/customer'
import {Toast,Popup} from 'antd-mobile'


const query = {
  is_pnr:'',
  is_invest: '',
  available: '',
  is_follow: '',
  name: '',
}
export default {
  namespace: 'custermerList',
  state: {
    customerListes: {},
    queryData: query,
    initSearchValues: '',
    initCode: {
      isPnr: '开户',
      isInvest: '投资',
      availableCode: '余额',
      isFollow: '关注'
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/custermer/custermerList') {
          if(location.query.detail) {
            dispatch({
              type: 'customerList',
            })
          } else {
            dispatch({
              type: 'customerList',
              payload:{is_pnr:'', is_invest: '', available: '', is_follow: '', name: ''}
            });
            dispatch({
              type: 'searchCode',
              payload:{is_pnr:'', is_invest: '', available: '', is_follow: '', name: ''}
            });
            dispatch ({
              type: 'changeInitCode',
              payload: {isPnr: '开户', isInvest: '投资', availableCode: '余额', isFollow: '关注'}
            });
            dispatch ({
              type: 'initSearchValue',
              payload: ''
            })
          }
        }
      })
    },
  },

  effects: {
    *customerList({ payload }, { call, put,select }) {
      Toast.loading('请稍候',1)
      const params = yield select(state => state.custermerList.queryData);
      const res = payload || params;
      console.log(params);
      const data = yield call(customerList,res);
      if (data && data.status === 'success') {
        yield put({
          type: 'customerLists',
          payload: data.data
        })
      }
    },
    *search({ payload }, { select,call,put }) {
      Toast.loading('请稍候',1)
      const d = {[payload.data]: payload.params};
      yield put({
        type: 'searchCode',
        payload: d
      });
      yield put({
        type: 'customerList'
      })
    },
    *onLeaveClose ({ payload }, { select,call,put }) {

    }
  },

  reducers: {
    customerLists(state, action) {
      return { ...state, customerListes: action.payload };
    },
    searchCode (state, action) {
      return {...state,queryData: {...state.queryData,...action.payload}}
    },
    changeInitCode (state, action) {
      return {...state,initCode: {...state.initCode,...action.payload}}
    },
    initSearchValue (state, action) {
      return {...state, initSearchValues: action.payload}
    }
  },
}
