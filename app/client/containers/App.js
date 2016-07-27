
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
        <Route path="/" component={CompanyListPage} />
        <Route path="/stock/:name" component={CompanyPage} />
        <Route path="*" component={CompanyListPage} />
      </Router>
      );
  }

  render() {
    var { updated } = this.props;
    var content = this.buildContent();
    return (
      <Grid style={STYLES.grid}>
        {content}
        <p>
          * All positions below 0.5% are considered to be 0%.<br/>
          ** Data updated {updated}
        </p>
      </Grid>
    );
  }
}
