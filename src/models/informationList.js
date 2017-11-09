import {infoTab, infoList} from '../services/infoList'
import {browserHistory, hashHistory} from 'dva/router'
import {Toast} from 'antd-mobile'


export default {

  namespace: 'informationList',

  state: {
    headerStatus: false,
    data: {},
    pageData: {},
    dataArr: [],
    page: 1,
    hasMore: true
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/information/informationList') {
          dispatch({
            type: 'fetchRemote',
            payload: location.query
          })
        }
      })
    },
  },

  effects: {
    *fetchRemote({ payload }, { call, put }) {
      Toast.loading('请稍候',1.2)
      const data = yield call(infoTab);
      if (data && data.status === 'success'){
        if(data.data.length){
          const initListData = payload.catalog_id ? payload.catalog_id : data.data[0].id;
          yield put({
            type: 'fetchList',
            payload: {
              page: 1,
              catalog_id: initListData
            }
          })
        } else {
          Toast.info('暂时没有栏目',1.2)
        }
      }

      yield put({
        type: 'setState',
        payload: data
      })
    },
    *fetchList({ payload }, { call, put, select }) {
      const data = yield call(infoList, payload);
      const dataArr = yield select(state => state.informationList.dataArr);
      let newData = [];
      if(payload.page > 1){
        newData = dataArr.concat(data.data);
        data.data = newData;
      } else {
        newData = data.data;
      }

      yield put({
        type: 'concatArr',
        payload: newData
      })

      yield put({
        type: 'setState2',
        payload: data
      })

      yield put({
        type: 'setPage',
        payload: payload.page
      })

      if (payload.hasMore == undefined) {
        payload.hasMore = true;
      }
      yield put({
        type: 'setMore',
        payload: payload.hasMore
      })
    },
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
    setState(state, action) {
      return { ...state, data: action.payload}
    },
    concatArr(state, action) {
      return { ...state, dataArr: action.payload}
    },
    setState2(state, action) {
      return { ...state, pageData: action.payload}
    },
    setPage(state, action) {
      return { ...state, page: action.payload}
    },
    setMore(state, action) {
      return { ...state, hasMore: action.payload}
    }
  },
}
