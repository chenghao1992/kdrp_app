'use strict';

const qs = require('qs')

module.exports = {

  'GET /api/example': function (req, res) {
    setTimeout(function () {
      res.json({
        success: true,
        data: ['foo', 'bar'],
      });
    }, 500);
  },
  'POST /api/login': function (req, res) {
    //const list = qs.parse(req.query);get请求时  获取参数
    const list = JSON.parse(req.body); //post 请求时  获取参数
    setTimeout(function () {
      res.json({
        success: true,
        data: list,
      });
    }, 500);
  },
  'GET /api/infoList': function (req, res) {
    setTimeout(function () {
      res.json({
        success: true,
        data: [
          {
            tab: '头条',
            list: {
              data: [
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行1',
                  content: '佳兆业金服合规再进一步1',
                  articleId: 1
                },
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行2',
                  content: '佳兆业金服合规再进一步2',
                  articleId: 2
                },
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行3',
                  content: '佳兆业金服合规再进一步3',
                  articleId: 3
                }
              ]
            }
          },
          {
            tab: '产品',
            list: {
              data: [
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行4',
                  content: '佳兆业金服合规再进一步4',
                  articleId: 4
                },
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行5',
                  content: '佳兆业金服合规再进一步5',
                  articleId: 5
                },
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行6',
                  content: '佳兆业金服合规再进一步6',
                  articleId: 6
                }
              ]
            }
          },
          {
            tab: '学院',
            list: {
              data: [
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行7',
                  content: '佳兆业金服合规再进一步7',
                  articleId: 7
                },
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行8',
                  content: '佳兆业金服合规再进一步8',
                  articleId: 8
                },
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行9',
                  content: '佳兆业金服合规再进一步9',
                  articleId: 9
                }
              ]
            }
          },
          {
            tab: '访谈',
            list: {
              data: [
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行10',
                  content: '佳兆业金服合规再进一步10',
                  articleId: 10
                },
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行11',
                  content: '佳兆业金服合规再进一步11',
                  articleId: 11
                },
                {
                  imgSrc: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                  title: '签约中信银行12',
                  content: '佳兆业金服合规再进一步12',
                  articleId: 12
                }
              ]
            }
          }
        ],
      });
    }, 500);
  },
  'POST /api/infoDetail': function (req, res) {
    setTimeout(function () {
      res.json({
        success: true,
        data: {
          column: '头条',
          articleId: 1,
          title: '深圳佳兆业金融集团与广金中心签订战略合作协议',
          subTitle: '佳兆业金服合规再进一步',
          author: '贾文雷',
          dateTime: '2017-07-31 17:29:03',
          content: '你好吗'
        }
      });
    }, 500);
  }
};
