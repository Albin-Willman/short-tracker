import {
  SET_LOADED,
  SET_LOADING,
  SET_UPDATED,
  SET_COMPANIES,
  SET_MESSAGE,
} from 'actions/data-actions';

export const INITIAL_STATE = {
  title: 'React Client',
  loading: false,
  loaded: false,
  companies: [],
  updated: '',
  message: '',
};

export function appReducer(state = INITIAL_STATE, action) {
  var { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state,
        loading: payload,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: payload,
      };
    case SET_LOADED:
      return { ...state,
        loaded: payload,
      };
    case SET_UPDATED:
      return { ...state,
        updated: payload,
      };
    case SET_COMPANIES:
      var companies = [];
      for(var key in payload) {
        if (payload.hasOwnProperty(key)) {
          companies.push({ ...payload[key], key });
        }
      }

      return { ...state,
        companies,
      };
    default: return state;
  }
}
