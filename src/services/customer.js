/**
 * Created by xiaoys on 2017/9/13.
 */
import request from '../utils/request';

//客户列表
export async function customerList(params) {
  return request(`/mobile/drp/service_customer/list/`,{
    method: 'get',
    data: params,
  });
}
//客户详情
export async function customerDetail(params) {
  return request(`/mobile/drp/customer/${params}/`,{
    method: 'get',
  });
}

//上交客户
export async function giveCustomer(params) {
  return request(`/mobile/drp/customer/commit/`,{
    method: 'post',
    data: params
  });
}

//关注客户
export async function followCustomer(params) {
  return request(`/mobile/drp/customer/${params.querySaves.id}/customer_follow_status/`,{
    method: 'post',
    data: params.isFollow
  });
}
