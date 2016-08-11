import { setAccepted } from 'actions/cookie-actions';

export function acceptCookies() {
  return (dispatch) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 365);
    document.cookie = 'cookie-accept=true; expires=' + exdate.toUTCString();
    dispatch(setAccepted(true));
  };
}
