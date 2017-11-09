import {login,testCode} from '../services/app'
import {browserHistory, hashHistory} from 'dva/router'
import {Toast} from 'antd-mobile'
import {setLoginIn} from '../utils/index'



export default {

  namespace: 'app',

  state: {
    headerStatus: false,
    phoneError: false,
    passwordError: false,
    disabled: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *login({ payload }, { call, put }){
      const data = yield call(login,payload);
      console.log(data)
      if(data && data.status === 'success') {
        yield setLoginIn(payload.username);
        const datas = yield call(testCode);
        yield put({
          type: 'changeDisabled',
          payload: false
        })
        if (datas && datas.status === 'success') {
          hashHistory.push("/home")
        }
      } else {
        Toast.info(data.message)
        yield put({
          type: 'changeDisabled',
          payload: false
        })
      }
    }
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
    phoneErrors (state, action) {
      return {...state, phoneError: action.payload}
    },
    passwordErrors (state, action) {
      return {...state, passwordError: action.payload}
    },
    changeDisabled (state, action) {
      return {...state, disabled: action.payload}
    }
  },

}
