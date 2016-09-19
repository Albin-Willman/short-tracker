import {
  setCompanies,
  setUpdated,
  setLoading,
  setLoaded,
  setMessage,
} from 'actions/data-actions';

import {
  setHistory,
  setPositions,
  setCompanyKey,
} from 'actions/company-actions'

const requestConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export function loadData() {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch('/api/v2/stocks.json', requestConfig)
    .then(transformToJson)
    .then(data => {
      dispatch(setUpdated(data.updated));
      dispatch(setCompanies(data.companies));
      dispatch(setMessage(data.message));
    })
    .then(() => {
      dispatch(setLoaded(true));
      dispatch(setLoading(false));
    });
  };
}

export function loadHistory(company) {
  return (dispatch) => {
    dispatch(setHistory({}));
    dispatch(setPositions({}));
    dispatch(setCompanyKey(company));
    fetch('/api/v2/stocks/' + company + '.json', requestConfig)
    .then(transformToJson)
    .then(data => {
      dispatch(setHistory(data.history));
      dispatch(setPositions(data.positions));
    });
  };
}

function transformToJson(data) {
  return data.json();
}
