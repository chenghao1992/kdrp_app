import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute} from 'dva/router';
import {isLogin} from './utils/index'

import App from './routes/app.js';

const cached = {};
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1
  }
};

function redirectToLogin(nextState, replace) {
  if (isLogin()) {
    replace({
      pathname: '/home',
    })
  }else {
    replace({
      pathname: '/login',
    })
  }
}

export default function ({history, app}) {

  const routes = [
    {
      path: 'login',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/Login/index'))
        }, 'login')
      }
    },
    {
      path: 'forgotPassword',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/forgotPassword'));
          cb(null, require('./routes/Login/forgotPassword'))
        },'forgotPassword')
      }
    },
    {
      path: 'extensionCode',
      name: 'extensionCode',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/extensionCode'));
          cb(null, require('./routes/Extension/index'))
        },'extensionCode')
      }
    },
    {
      path: 'information/informationDetail',
      name: 'information/informationDetail',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/informationDetail'));
          cb(null, require('./routes/Information/informationDetail'))
        },'informationDetail')
      }
    },
    {
      path: 'custermer/custermerDetail',
      name: 'custermer/custermerDetail',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/custermerDetail'));
          cb(null, require('./routes/Custermer/custermerDetail'))
        },'custermerDetail')
      }
    },
    {
      path: 'goH5',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/Personal/goH5'))
        }, 'goH5')
      }
    },
    {
      path: '/',
      component: App,
      indexRoute: {onEnter:(nextState, replace) => {redirectToLogin(nextState, replace)}},
      childRoutes: [
        {
          path: 'home',
          name: 'home',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/home'))
              cb(null, require('./routes/Home/home.js'))
            }, 'home')
          }
        },{
          path: 'custermer',
          name: 'custermer',
          indexRoute: {onEnter: (nextState, replace) => replace('/custermer/custermerList')},
          childRoutes: [
            {
              path: 'custermerList',
              name: 'custermerList',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/custermerList'));
                  cb(null, require('./routes/Custermer/custermerList'))
                }, 'custermerList')
              },
            },
          ]
        },{
          path: 'information',
          name: 'information',
          indexRoute: {onEnter: (nextState, replace) => replace('/information/informationList')},
          childRoutes: [
            {
              path: 'informationList',
              name: 'informationList',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/informationList'));
                  cb(null, require('./routes/Information/informationList'))
                }, 'informationList')
              },
            }
          ]
        },{
          path: 'personal',
          name: 'personal',
          indexRoute: {onEnter: (nextState, replace) => replace('/personal/personalCenter')},
          childRoutes: [
            {
              path: 'personalCenter',
              name: 'personalCenter',
              getComponent(nextState, cb) {
                require.ensure([],require => {
                  registerModel(app, require('./models/personalCenter'));
                  cb(null, require('./routes/Personal/personalCenter'))
                },'personalCenter')
              }
            },
          ]
        }
      ]
    },
    {
      path: 'personal/personalInfo',
      name: 'personal/personalInfo',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/personalInfo'));
          cb(null, require('./routes/Personal/personalInfo'))
        },'personalInfo')
      }
    },
    {
      path: 'personal/personalInfo/edit',
      name: 'personal/personalInfo/edit',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/personalInfoEdit'));
          cb(null, require('./routes/Personal/personalInfoEdit'))
        },'personalInfoEdit')
      }
    },
    {
      path: 'personal/personalAccountList',
      name: 'personal/personalAccountList',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/personalAccountList'));
          cb(null, require('./routes/Personal/personalAccountList'))
        },'personalAccountList')
      }
    },
    {
      path: 'personal/personalAccountListDetail',
      name: 'personal/personalAccountListDetail',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/personalAccountListDetail'));
          cb(null, require('./routes/Personal/personalAccountListDetail'))
        },'personalAccountListDetail')
      }
    },
    {
      path: 'personal/personalResetPassword',
      name: 'personal/personalResetPassword',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/personalResetPassword'));
          cb(null, require('./routes/Personal/personalResetPassword'))
        },'personalResetPassword')
      }
    },{
      path: 'personal/personalServiceCharge',
      name: 'personal/personalServiceCharge',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/personalServiceCharge'));
          cb(null, require('./routes/Personal/personalServiceCharge'))
        },'personalServiceCharge')
      }
    },{
      path: 'personal/commonProblem',
      name: 'personal/commonProblem',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/commonProblem'));
          cb(null, require('./routes/Personal/commonProblem'))
        },'commonProblem')
      }
    },{
      path: 'personal/aboutUs',
      name: 'personal/aboutUs',
      getComponent(nextState, cb) {
        require.ensure([],require => {
          registerModel(app, require('./models/aboutUs'));
          cb(null, require('./routes/Personal/aboutUs'))
        },'aboutUs')
      }
    },{
      path: '*',
      name: 'error',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/error'))
        }, 'error')
      }
    }
  ];

  return <Router history={history} routes={routes}/>
}
