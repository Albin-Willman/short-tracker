import { addError, removeError } from 'actions/app-actions';

var errorCount = 0;
export function setError(message, retry) {
  return (dispatch) => {
    dispatch(addError(errorCount, message, () => {
      dispatch(removeError(errorCount));
      retry();
    }));
    errorCount += 1;
  }
}