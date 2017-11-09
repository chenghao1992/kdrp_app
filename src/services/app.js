import request from '../utils/request';
// import {lastUrl} from '../utils/config'

//登录
export async function login(params) {
  return request(`/mobile/login/`,{
    method: 'post',
    data: params,
  });
}


//退出登录
export async function logout() {
  return request(`/mobile/logout/`,{
    method: 'post'
  });
}

//重置密码
export async function resetPwd(params) {
  return request(`/mobile/reset_password/`,{
    method: 'post',
    data: params
  });
}


export async function getMobileCaptcha(params) {
  return request(`/mobile/mobile_captcha/password_reset/`,{
    method: 'post',
    data: params
  });
}

export async function confirmMobileCaptcha(params) {
  return request(`/mobile/validate_mobile_captcha_standalone/password_reset/`,{
    method: 'post',
    data: params
  });
}

//检测用户信息
export async function testCode(params) {
  return request(`/mobile/user_info/`,{
    method: 'get',
    data: params
  });
}

