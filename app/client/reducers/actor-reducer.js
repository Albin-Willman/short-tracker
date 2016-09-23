import {
  SET_LOADING,
  SET_LOADED,
  SET_ACTORS,
  SET_ACTOR,
} from 'actions/actor-actions';

export const INITIAL_STATE = {
  actors: [],
  loaded: false,
  loading: false,
  actor: {},
};

import computeActorData from 'utils/formaters/actor-chart-formater';

export function actorReducer(state = INITIAL_STATE, action) {
  var { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state,
        loading: payload,
      };
    case SET_LOADED:
      return { ...state,
        loaded: payload,
      };
    case SET_ACTORS:
      return { ...state,
        actors: payload,
      };
    case SET_ACTOR:
      var historyData = computeActorData(payload.positions, false);
      var positions = buildPositions(payload.positions, historyData);
      var actor = {
          name: payload.name,
          id: payload.key,
          positions,
          historyData,
        };
      return { ...state,
        actor,
      };
    default: return state;
  }
}

function buildPositions(positions, history) {
  var res = [];
  var lastRow = history[history.length - 1];
  var labels = history[0];
  for(var key in positions) {
    if (positions.hasOwnProperty(key)) {
      var position = positions[key];
      res.push({
        name: position.name,
        key: position.key,
        current: findCurrent(position.name, labels, lastRow),
      });
    }
  }
  return res;
}

function findCurrent(name, names, values) {
  for(var i = 0; i < names.length; i += 1) {
    if(name === names[i]) {
      return values[i];
    }
  }
  return 0.0;
}


