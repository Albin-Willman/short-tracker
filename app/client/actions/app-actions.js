export const ADD_ERROR = 'addError@app';
export const REMOVE_ERROR = 'removeError@app';

export function addError(id, message, retry) {
  return {
    type: ADD_ERROR,
    payload: id,
  }
}

export function removeError(id) {
  return {
    type: REMOVE_ERROR,
    payload: id,
  }
}