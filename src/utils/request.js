import Ajax from 'robe-ajax'
import { hashHistory } from 'dva/router'
import { Toast } from 'antd-mobile'


export default function request (url, options, routesCallback) {
  function redirect (path) {
    if (routesCallback && routesCallback.redirect) {
      routesCallback.redirect(path)
    } else {
      hashHistory.push(path)
    }
  }

  if (options.cross) {
    return Ajax.getJSON('http://query.yahooapis.com/v1/public/yql', {
      q: `select * from json where url='${url}?${Ajax.param(options.data)}'`,
      format: 'json',
    })
  }
  return Ajax.ajax({
    url,
    method: options.method || 'get',
    data: options.data || {},
    // processData: options.method === 'get',
    dataType: 'JSON',
    // xhrFields: { withCredentials: true }
  })
    .then((data) => {
      if (data.status && data.status === 'needRedirect') {
        if (data.data.reason === 'NOAUTH') {
          Toast.info(`${data.data.message}`,0.8)
          //redirect('/403')
        } else if (data.data.reason === 'NEEDLOGIN') {
          redirect('/login')
          window.location.reload()
        } else if (data.data.reason === 'NOTFOUND') {
          Toast.info(`404`,1)
        } else if (data.data.reason === 'JUSTNEED') {
          redirect(`${data.data.redirectTo}`);
          // notification.warning({
          //   message: data.data.message,
          //   description: data.data.message,
          // })
          Toast.info(`${data.data.message}`,2)
        }
      }

      // 异步操作失败 不抛错出去，否则data返回不了
      if (data.status && data.status === 'error') {
        /* throw new Error(data.message)*/
        // notification.error({
        //   message: '出错啦',
        //   description: data.message,
        // })
        Toast.info(`${data.message}`,1)
      }


      if (routesCallback && routesCallback.next) {
        routesCallback.next()
      }
      return data
    })
    .done((data) => {
      return data
    })
    .fail((data) => {
      // notification.error({
      //   message: '出错啦',
      //   description: data && data.message || '通信错误或后台故障，请联系管理员',
      // })
      Toast.info(`出错啦!通信错误或后台故障，请联系管理员`,0.8)
    })
}
