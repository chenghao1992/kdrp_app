'use strict';

// const mock = {};

// require('fs').readdirSync(require('path').join(__dirname + '/mock'))
//   .forEach(function (file) {
//     Object.assign(mock, require('./mock/' + file));
//   });

//这部分是设置代理，在package.json中启动时使用
module.exports = {
  'POST /mobile/*': 'http://test-drp.shenxin99.com/',
  'GET /mobile/*': 'http://test-drp.shenxin99.com/',
};
