import {
  SET_HISTORY,
  SET_COMPANY_KEY,
  SET_POSITIONS,
  SET_ACTOR_CASES,
} from 'actions/company-actions';

export const INITIAL_STATE = {
  history: [],
  key: '',
  positions: [],
  actorCases: [],
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
    default: return state;
  }
}
