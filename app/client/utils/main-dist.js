import React from 'react';

import { Provider } from 'react-redux';

export class Main extends React.Component {

  static propTypes = {
    app: React.PropTypes.func,
    routes: React.PropTypes.object,
    store: React.PropTypes.object,
    logPageView: React.PropTypes.func,
    logEvent: React.PropTypes.func,
  }

  static defaultProps = {
    app: null,
    routes: null,
    store: null,
    logPageView: ()=>{},
    logEvent: ()=>{},
  }

  render() {
    var { app, routes, logPageView } = this.props;

    return (
      <Provider store={this.props.store}>
        <div>
          {routes ? routes : React.createElement(app, { logPageView: logPageView })}
        </div>
      </Provider>
    );
  }
}


