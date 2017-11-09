import request from '../utils/request';

export async function getAccountList(params) {
  return request(`/mobile/drp/employee_fee_details/?bill_month=${params}`,{
  	method: 'get'
  });
}

export async function getAccountListDetail(params) {
  return request(`/mobile/drp/employee_fee_details/${params}/`,{
  	method: 'get'
  });
}