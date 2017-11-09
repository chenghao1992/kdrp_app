import {banners,dashboard} from '../services/home'
import {getUserInfo} from '../services/personalCenter'
import {hashHistory} from 'dva/router'
import {Toast} from 'antd-mobile'

export default {

  namespace: 'home',

  state: {
    headerStatus: false,
    bannerList: [],
    dashboardCode: {},
    autoPlay: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      if (location.pathname === '/home') {
        dispatch({
          type: 'getBanners',
        })
        dispatch({
          type: 'dashboard',
        })
      }
      })
    },
  },

  effects: {
    *getBanners({ payload }, { call, put }) {
      const data = yield call(banners);
      if(data && data.status === 'success') {
        if (data.data.length <= 1) {
          yield put({
            type: 'changeAutoPlay',
            payload: false
          })
        } else {
          yield put({
            type: 'changeAutoPlay',
            payload: true
          })
        }
        yield put({
          type: 'bannerLists',
          payload: data.data
        })
      }
    },
    *dashboard ({ payload }, { call, put }) {
      const data = yield call(dashboard);
      if (data && data.status === 'success') {
        yield put({
          type: 'dashboardCodes',
          payload: data.data
        })
      }
    },
    *detail ({ payload }, { call, put }) {
      const data = yield call(getUserInfo);
      if(data && data.status === 'success') {
        if (data.data.personal_info.agreement_label) {
          hashHistory.push(`/extensionCode`)
        } else {
          Toast.info('您还没有签署合作协议。请登录PC端签署合作协议后进行推广',3)
        }
      }
    }
  },

  reducers: {
    bannerLists (state, action) {
      return { ...state, bannerList: action.payload };
    },
    dashboardCodes (state, action) {
      return { ...state, dashboardCode: action.payload };
    },
    changeAutoPlay (state, action) {
      return { ...state, autoPlay: action.payload}
    }
  },
}
