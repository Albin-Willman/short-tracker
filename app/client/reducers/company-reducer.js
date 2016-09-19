import {
  SET_HISTORY,
  SET_COMPANY_KEY,
  SET_POSITIONS,
} from 'actions/company-actions';

export const INITIAL_STATE = {
  history: {},
  key: '',
  positions: {},
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
    default: return state;
  }
}
