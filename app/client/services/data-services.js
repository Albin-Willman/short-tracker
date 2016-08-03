import { setCompanies, setUpdated, setLoading, setLoaded, setHistory } from 'actions/data-actions';

const requestConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
}

export function loadData() {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch('/api/data.json', requestConfig)
    .then(transformToJson)
    .then(data => {
      dispatch(setUpdated(data.updated));
      dispatch(setCompanies(data.companies));
    })
    .then(() => {
      dispatch(setLoaded(true));
      dispatch(setLoading(false));
    });
  };
}

export function loadHistory(company) {
  return (dispatch) => {
    dispatch(setHistory(company, 'No history'));
    fetch('/api/stocks/' + company + '.json', requestConfig)
    .then(transformToJson)
    .then(data => {
      dispatch(setHistory(company, data));
    });
  };
}

function transformToJson(data) {
  return data.json();
}
