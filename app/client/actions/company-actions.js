export const SET_HISTORY = 'setHistory@company';
export const SET_POSITIONS = 'setPositions@company';
export const SET_COMPANY_KEY = 'setCompanyKey@company';

export function setCompanyKey(key) {
  return {
    type: SET_COMPANY_KEY,
    payload: key,
  };
}

export function setHistory(data) {
  return {
    type: SET_HISTORY,
    payload: data,
  };
}

export function setPositions(data) {
  return {
    type: SET_POSITIONS,
    payload: data,
  };
}
