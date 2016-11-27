import buildChangeLog from 'utils/formaters/change-log-formater.jsx';
import {
  SET_HISTORY,
  SET_COMPANY_KEY,
  SET_POSITIONS,
  SET_ACTOR_CASES,
  SET_LOADING,
  SET_CHANGE_LOG,
} from 'actions/company-actions';

export const INITIAL_STATE = {
  history: [],
  key: '',
  positions: [],
  actorCases: [],
  changeLog: [],
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
    case SET_CHANGE_LOG:
      var changeLog = buildChangeLog(payload.history, payload.positions);
      return { ...state,
        changeLog,
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
