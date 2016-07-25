import { setCompanies, setUpdated, setLoading, setLoaded } from 'actions/data-actions';

export function loadData(){
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    fetch('api/data.json')
    .then(data => {
      return data.json();
    })
    .then(data => {
      dispatch(setUpdated(data.updated));
      dispatch(setCompanies(data.companies));
    })
    .then(data => {
      dispatch(setLoaded(true));
      dispatch(setLoading(false));
    });
  }
}