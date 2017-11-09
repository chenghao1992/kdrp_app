/**
 * Created by xiaoys on 2017/9/20.
 */
import Cookie from './cookie'


const setLoginIn = (userName) => {
  Cookie.set('user_name', userName)
}

const setLoginOut = () => {
  Cookie.remove('user_name')
}

const isLogin = () => {
  return Cookie.get('user_name')
}

export {
  setLoginIn,
  setLoginOut,
  isLogin
}
