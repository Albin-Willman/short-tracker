import {
  SET_INDEX,
  ADD_CONTENT,
  SET_LOADED,
} from 'actions/blog-actions';

export const INITIAL_STATE = {
  articles: {},
  loaded: false,
  updated: 0,
};

export function blogReducer(state = INITIAL_STATE, action) {
  var { type, payload } = action;
  var newState;
  switch (type) {
    case SET_INDEX:
      newState = { ...state,
        articles: payload,
      };
      for(var key in state.articles) {
        if (state.articles.hasOwnProperty(key) && newState.articles.hasOwnProperty(key)) {
          newState.articles[key].content = state.articles[key].content;
        }
      }
      return newState;
    case ADD_CONTENT:
      newState = { ...state,
        updated: state.updated + 1,
      };
      newState.articles[payload.id] = { ...newState.articles[payload.id],
        content: payload.content,
      };
      return newState;
    case SET_LOADED:
      return { ...state,
        loaded: payload,
      };
    default: return state;
  }
}
