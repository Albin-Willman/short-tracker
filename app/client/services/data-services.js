import { setCompanies, setUpdated, setLoading, setLoaded, setHistory } from 'actions/data-actions';

export function loadData(){
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    fetch('/api/data.json')
    .then(data => { return data.json(); })
    .then(data => {
      dispatch(setUpdated(data.updated));
      dispatch(setCompanies(data.companies));
    })
    .then(data => {
      dispatch(setLoaded(true));
      dispatch(setLoading(false));
    });
  };
}

export function loadHistory(company){
  return (dispatch, getState) => {
    dispatch(setHistory(company, 'No history'));
    fetch('/api/stocks/' + company + '.json')
    .then(data => { return data.json(); })
    .then(data => {
      dispatch(setHistory(company, data))
    });
  };
}