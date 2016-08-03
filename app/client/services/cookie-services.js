import { setAccepted } from 'actions/cookie-actions';

export function acceptCookies() {
  return (dispatch) => {
    document.cookie = 'cookie-accept=true';
    dispatch(setAccepted(true));
  };
}
