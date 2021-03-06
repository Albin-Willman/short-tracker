/**
* ReactClient
* app startup script for production purpose
*/

/* eslint no-process-env:0 */
console.log('NODE_ENV:', process.env.NODE_ENV);

require('./index.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { Main } from 'utils/main';
import { makeStore } from 'utils/store';

import initialState from 'fixtures/initial-state-prod.fixture';
import App from 'containers/App';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-81365517-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

import { polyfill } from 'es6-promise';
polyfill();
import 'whatwg-fetch';

export function start(targetEl, payload) {

  // apply the host's page payload
  if (payload.title) {
    initialState.app = {
      title: payload.title,
    };
  }

  // create the application Redux store
  let appStore = makeStore(initialState);

  ReactDOM.render((
    <Main
    app={App}
    store={appStore}
    logPageView={logPageView} />
    ), targetEl);
}
