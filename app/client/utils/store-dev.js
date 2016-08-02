
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import { reducers } from 'reducers';
const reducer = combineReducers(reducers);

var store;

export function makeStore(initialState = {}, middlewares = [reduxThunk]) {

  store = createStore(reducer, initialState, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}

export function dispatch(action) {
  store.dispatch(action);
}
