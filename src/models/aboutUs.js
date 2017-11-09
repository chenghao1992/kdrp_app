
export default {

  namespace: 'aboutUs',

  state: {
    aaa: 'aboutUs'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/personal/aboutUs') {
          //do something
        }
      })
    },
  },

  effects: {
    *fetchRemote({ payload }, { call, put }) {
    },
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
