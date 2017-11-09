import request from '../utils/request';

//获取banner图
export async function banners(params) {
  return request('/mobile/banners/',{
    method: 'get',
    data: params
  });
}

//获取面板数据ji
export async function dashboard(params) {
  return request('/mobile/drp/dashboard/',{
    method: 'get',
    data: params
  });
}
