export const SET_INDEX = 'setIndex@blog';
export const ADD_CONTENT = 'addContent@blog';
export const SET_LOADED = 'setLoaded@blog';

export function setIndex(data) {
  return {
    type: SET_INDEX,
    payload: data,
  };
}

export function setLoaded(val) {
  return {
    type: SET_LOADED,
    payload: val,
  };
}

export function addContent(id, content) {
  return {
    type: ADD_CONTENT,
    payload: { id, content },
  };
}
