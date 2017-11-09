import request from '../utils/request';

export async function infoDetail(params) {
  return request('/mobile/articles/'+params.article_id+'/', {
  	method: 'get'
  });
}