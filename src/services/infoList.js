import request from '../utils/request';

export async function infoTab() {
  return request('/mobile/catalogs/', {
  	method: 'get'
  });
}

export async function infoList(params) {
  return request('/mobile/articles/', {
  	method: 'get',
    data: params
  });
}
