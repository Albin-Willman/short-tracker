export const SET_ACCEPTED = 'setAccepted@cookies';

export function setAccepted(accepted) {
  return {
    type: SET_ACCEPTED,
    payload: accepted,
  };
}
