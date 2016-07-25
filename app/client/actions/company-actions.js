export const SET_COMPANY = 'setCompany@data';

export function setCompany(company){
  return {
    type: SET_COMPANY,
    payload: company,
  }
}