var ReactGA = require('react-ga');

export function logEvent(category, action, label) {
  var event = {
    category, action, label
  };
  if(process.env.NODE_ENV === 'development'){
    console.log('Ga event: ', event);
  } else {
    ReactGA.event(event);
  }
}