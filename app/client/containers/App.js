
import React from 'react';
import { connect } from 'react-redux';

// ReactBoostrap components:
import Grid from 'react-bootstrap/lib/Grid';
import CompanyListPage from 'containers/CompanyListPage';
import CompanyPage from 'containers/CompanyPage';

import { loadData }  from 'services/data-services';

import { Router, Route, browserHistory } from 'react-router'

const STYLES = {
    grid: {
        marginTop: 50,
    }
};

const routes = [
  <Route key={1} path="/" component={CompanyListPage} />,
  <Route key={2} path="/stock/:name" component={CompanyPage} />,
  <Route key={3} path="*" component={CompanyListPage} />
];

@connect(s => s.app)
export default class App extends React.Component {

  componentWillMount(){
    this.loadInitialState();
  }

  loadInitialState(){
    var { dispatch, loaded, loading } = this.props;
    if(!loaded && !loading){
      dispatch(loadData());
    }
  }

  buildContent() {
    var { loaded, loading, logPageView } = this.props;

    if (loading || !loaded){
      return "loading...";
    }

    return (
      <Router history={browserHistory} onUpdate={logPageView}>
        {routes}
      </Router>
      );
  }

  render() {
    var { updated } = this.props;
    var content = this.buildContent();
    return (
      <Grid style={STYLES.grid}>
        {content}
      </Grid>
    );
  }
}
