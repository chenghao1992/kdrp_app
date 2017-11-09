/**
 * Created by xiaoys on 2017/8/30.
 */
// 日期格式化
Date.prototype.format = function (format) {
  let o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? o[k]
        : (`00${o[k]}`).substr((`${o[k]}`).length))
    }
  }
  return format
}


/* 金额格式化* 1234.456 ＝>1,234.46*/
function formatMoney (value) {
  if (value !== '' && value !== null) {
    let num = `${value}`
    num = num.toString().replace(/\$|,/g, '')
    // 获取符号(正/负数)
    let sign = (Number(num) === (num = Math.abs(num)))
    // 把指定的小数位先转换成整数.多余的小数位四舍五入
    num = Math.floor(num * Math.pow(10, 2) + 0.50000000001)
    // 求出小数位数值
    let cents = num % Math.pow(10, 2)
    // 求出整数位数值
    num = Math.floor(num / Math.pow(10, 2)).toString()
    // 把小数位转换成字符串,以便求小数位长度
    cents = cents.toString()
    // 补足小数位到指定的位数
    while (cents.length < 2) {
      cents = `0${cents}`
    }
    // 对整数部分进行千分位格式化.
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = `${num.substring(0, num.length - (4 * i + 3))},${num.substring(num.length - (4 * i + 3))}`
    }
    return (`${(sign ? '' : '-')}${num}.${cents}`)
  } else if (value === '0') {
    return '0.00'
  }
  return value
}

function iosOrAn() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return 'isAndroid'
  } else if (isiOS) {
    return 'isiOS'
  }
}

export {formatMoney, iosOrAn}
