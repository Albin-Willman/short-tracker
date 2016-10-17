import {
  SET_HISTORY,
  SET_COMPANY_KEY,
  SET_POSITIONS,
  SET_ACTOR_CASES,
  SET_LOADING,
} from 'actions/company-actions';

export const INITIAL_STATE = {
  history: [],
  key: '',
  positions: [],
  actorCases: [],
  loading: true,
};

export function companyReducer(state = INITIAL_STATE, action) {
  var { type, payload } = action;
  switch (type) {
    case SET_HISTORY:
      return { ...state,
        history: payload,
      };
    case SET_COMPANY_KEY:
      return { ...state,
        key: payload,
      };
    case SET_POSITIONS:
      return { ...state,
        positions: payload,
      };
    case SET_ACTOR_CASES:
      return { ...state,
        actorCases: payload,
      };
    case SET_LOADING:
      return { ...state,
        loading: payload,
      };
    default: return state;
  }
}
