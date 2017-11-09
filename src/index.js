import './index.html';
import './index.css';
import dva from 'dva';
import {browserHistory, hashHistory} from 'dva/router'
import {Toast} from 'antd-mobile'
import moment from 'moment';

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 1. Initialize
let models = [],
  initialState = {};

models.push(require('./models/app'));

models.forEach((m) => initialState[m.namespace] = m.state);

const app = dva({
  history: hashHistory,
  onError (error) {
    const {message} = error;
    Toast.info(`错误：${message}`,0.8)
    console.error('app onError -- ', message)
  },
})
// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
