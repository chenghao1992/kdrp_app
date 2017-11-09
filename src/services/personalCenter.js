import request from '../utils/request';

//个人信息查询
export async function getUserInfo() {
  return request('/mobile/drp/employee/detail/',{
      method: 'get'
    }
  );
}


export async function reviseUserInfo(params) {
  console.log(params)
  return request(`/mobile/drp/employees/${params.id}/personal_info/`,{
    method: 'post',
    data: params.data
  });
}


export async function contactAccount(params) {
  return request(`/mobile/drp/employees/${params}/personal_kaisa_account/`,{
      method: 'post',
    });
}

export async function getIsContact() {
  return request('/mobile/drp/refresh_employee_account_status/',{
      method: 'get'
    });
}

export async function getIsOpenAccount() {
  return request('/mobile/drp/refresh_employee_open_status/',{
      method: 'get'
    });
}


export async function getServiceCharge(params) {
 return request('/mobile/drp/person_report/',{
  	method: 'get',
  	data: params
  });
}

export async function changePwd(params) {
 return request('/mobile/change_password/',{
    method: 'post',
    data: params
  });
}


export async function getCommonProblem(params) {
 return request('/mobile/special_custom/',{
    method: 'get',
  });
}



