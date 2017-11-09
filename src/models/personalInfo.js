import {getUserInfo, getIsContact, getIsOpenAccount, contactAccount} from '../services/personalCenter'
import { testCode} from '../services/app'
import {browserHistory, hashHistory} from 'dva/router'

export default {

  namespace: 'personalInfo',

  state: {
    
    contact: {
      rotate: false,
      isConnect: false
    },
    openAccount:{
      rotate: false,
      isConnect: false
    },
    userInfo: {
      opt_status: false,
      kaisa_account_info: null
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/personal/personalInfo') {
          dispatch({
            type: 'getUserInfo'
          })
        }
      })
    },
  },

  effects: {
    *getUserInfo({ payload }, { call, put }) {

        const data = yield call(getUserInfo);
          yield put({
              type: 'changeUserInfo',
              payload: data
          })
    },
    *testCode({ payload }, { call, put }) {

      const data = yield call(testCode);
      if(data.status == 'success'){
        hashHistory.push("/personal/personalCenter");
      }
    },    
    *goContactAccount({ payload }, { call, put }) {
        const data = yield call(contactAccount,payload);
        if(data.status == 'success'){
            if(data.data.bind_account_url){
                hashHistory.push(`/goH5?url=${data.data.bind_account_url}`)
            }else{
              yield put({
                type: 'changeContactRotate',
                payload: {
                  rotate: false,
                  isConnect: true
                }
              })
            }
        }
    },
    *getIsContact({ payload }, { call, put }) {
        yield put({
            type: 'changeContactRotate',
            payload
        })
        const data = yield call(getIsContact);
        if(data.status == 'success'){
          yield put({
              type: 'changeContactRotate',
              payload: {
                rotate: false,
                isConnect: true
              }
          })
        }else{
          yield put({
              type: 'changeContactRotate',
              payload: {
                rotate: false,
              }
          })
        }
    },
    *getIsOpenAccount({ payload }, { call, put }) {
        yield put({
          type: 'changeOpenAccountRotate',
          payload
        })
        const data = yield call(getIsOpenAccount);
        if(data.status == 'success'){
          yield put({
              type: 'changeOpenAccountRotate',
              payload: {
                  rotate: false,
                  isConnect: true
              }
          })
        }else{
          yield put({
              type: 'changeOpenAccountRotate',
              payload: {
                  rotate: false,
              }
          })
        }
    },
  },

  reducers: {
    changeUserInfo(state, action) {
      return { ...state, userInfo:action.payload };
    },
    changeContactRotate(state, action) {
      return { ...state, contact: action.payload };
    },
    changeOpenAccountRotate(state, action) {
      return { ...state, openAccount:action.payload };
    },
  },
}
