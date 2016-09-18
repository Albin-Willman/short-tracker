import buildCompanyData from 'utils/formaters/company-data-builder';
import {
  SET_LOADED,
  SET_LOADING,
  SET_UPDATED,
  SET_COMPANIES,
  SET_HISTORY,
  SET_MESSAGE,
} from 'actions/data-actions';

export const INITIAL_STATE = {
  title: 'React Client',
  loading: false,
  loaded: false,
  companies: {},
  history: {},
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
      var companies = {};
      for(var name in payload) {
        if (payload.hasOwnProperty(name)) {
          companies[name] = buildCompanyData(payload[name]);
        }
      }
      return { ...state,
        companies,
      };
    case SET_HISTORY:
      return { ...state,
        history: {
          company: payload.company,
          data: payload.history,
        },
      };
    default: return state;
  }
}
