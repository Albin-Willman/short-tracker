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
  setActorCases,
  setLoadingCompany,
} from 'actions/company-actions';

import computeHistoryData from 'utils/formaters/history-chart-formater';
import computeActorData from 'utils/formaters/actor-chart-formater';
import buildActorData from 'utils/formaters/actor-data-formater';

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
    dispatch(setLoadingCompany(true));
    dispatch(setHistory([]));
    dispatch(setPositions([]));
    dispatch(setActorCases([]));
    dispatch(setCompanyKey(company));
    fetch('/api/v2/stocks/' + company + '.json', requestConfig)
    .then(transformToJson)
    .then(data => {
      var history = computeHistoryData(data.history);
      dispatch(setHistory(history));
      var positions = computeActorData(data.positions);
      dispatch(setPositions(positions));
      var cases = buildActorData(history, positions, data.positions);
      dispatch(setActorCases(cases));
      dispatch(setLoadingCompany(false));
    });
  };
}

function transformToJson(data) {
  return data.json();
}
