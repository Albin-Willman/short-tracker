
import { SET_COMPANY } from 'actions/company-actions';

export const INITIAL_STATE = {
  company: null,
};

export function companyReducer(state = INITIAL_STATE, action) {
  var { type, payload } = action;
  switch (type) {
    case SET_COMPANY:
      return { ...state,
        company: payload
      }
    default: return state;
  }
}
