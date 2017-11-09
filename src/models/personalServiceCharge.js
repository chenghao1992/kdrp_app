import {getServiceCharge} from '../services/personalCenter'
import {browserHistory, hashHistory} from 'dva/router'


export default {

  namespace: 'personalServiceCharge',

  state: {
     disabled: false,
     show:false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/personal/personalServiceCharge') {
          dispatch({
            type: 'getServiceCharge'
          })
        }
      })
    },
  },

  effects: {
    *getServiceCharge({ payload }, { call, put }) {
        const data = yield call(getServiceCharge,payload);
        if(data){
          yield put({
            type: 'setState',
            payload: data
          })


          if(payload){
            yield put({
              type: 'changeShow',
              payload: true
            })
            yield put({
              type: 'setBtnstate',
              payload: true
            })
          }else{
            yield put({
              type: 'changeShow',
              payload: false
            })
            yield put({
              type: 'setBtnstate',
              payload: false
            })
          }
        }
        

    },
    *changeBtnStatus({ payload }, { call, put }) {
        yield put({
          type: 'setBtnstate',
          payload: false
        })
    },
  },

  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload };
    },
    setBtnstate(state, action) {
      return { ...state, disabled:action.payload };
    },
    changeShow(state, action) {
      return { ...state, show:action.payload };
    }
  },
}
