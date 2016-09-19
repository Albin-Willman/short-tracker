export const SET_LOADED = 'setLoaded@data';
export const SET_LOADING = 'setLoading@data';
export const SET_UPDATED = 'setUpdated@data';
export const SET_COMPANIES = 'setCompanies@data';
export const SET_MESSAGE = 'setMessage@data';
export const SET_ACTOR_DATA = 'setActorData@data';

export function setActorData(company, data) {
  return {
    type: SET_HISTORY,
    payload: {
      company,
      data,
    },
  };
}

export function setLoaded(loaded) {
  return {
    type: SET_LOADED,
    payload: loaded,
  };
}

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    payload: loading,
  };
}

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
}

export function setUpdated(updated) {
  return {
    type: SET_UPDATED,
    payload: updated,
  };
}

export function setCompanies(companies) {
  return {
    type: SET_COMPANIES,
    payload: companies,
  };
}
