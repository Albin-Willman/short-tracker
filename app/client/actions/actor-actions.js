export const SET_LOADING = 'setLoading@actors';
export const SET_LOADED = 'setPositions@actors';
export const SET_ACTORS = 'setActors@actors';
export const SET_ACTOR = 'setActor@actors';

export function setLoaded(data) {
  return {
    type: SET_LOADED,
    payload: data,
  };
}

export function setLoading(data) {
  return {
    type: SET_LOADING,
    payload: data,
  };
}

export function setActors(data) {
  return {
    type: SET_ACTORS,
    payload: data,
  };
}

export function setActor(data) {
  return {
    type: SET_ACTOR,
    payload: data,
  };
}
