import { setLoading, setLoaded, setActors, setActor } from "actions/actor-actions";

const requestConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export function loadActorList() {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch('/api/v2/actors.json', requestConfig)
    .then(transformToJson)
    .then(data => {
      dispatch(setActors(data.actors));
    })
    .then(() => {
      dispatch(setLoaded(true));
      dispatch(setLoading(false));
    });
  };
}

export function loadActor(actor) {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setActor({}));
    fetch('/api/v2/actors/' + actor + '.json', requestConfig)
      .then(transformToJson)
      .then(data => {
        dispatch(setActor(data));
      })
      .then(() => {
        dispatch(setLoading(false));
      });
  };
}

function transformToJson(data) {
  return data.json();
}
