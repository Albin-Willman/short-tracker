import {
  SET_ACCEPTED,
} from 'actions/cookie-actions';

export const INITIAL_STATE = {
  accepted: false,
};

export function cookieReducer(state = INITIAL_STATE, action) {
  var { type, payload } = action;
  switch (type) {
    case SET_ACCEPTED:
      return { ...state,
        accepted: payload,
      };
    default: return state;
  }
}
