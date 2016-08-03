
import React from 'react';
import { connect } from 'react-redux';

// ReactBoostrap components:
import Grid from 'react-bootstrap/lib/Grid';
import CompanyListPage from 'containers/CompanyListPage';
import CompanyPage from 'containers/CompanyPage';
import AboutPage from 'containers/AboutPage';
import TopBar from 'components/TopBar';
import Footer from 'components/Footer';
import CookiePage from 'components/CookiePage';
import CookieNotice from 'components/CookieNotice';

import { loadData } from 'services/data-services';
import { acceptCookies } from 'services/cookie-services';
import { setAccepted } from 'actions/cookie-actions';

import { Router, Route, browserHistory } from 'react-router';

const STYLES = {
  grid: {
    marginTop: 50,
  },
};

const routes = [
  <Route key={1} path="/" component={CompanyListPage} />,
  <Route key={2} path="/stock/:name" component={CompanyPage} />,
  <Route key={3} path="/about" component={AboutPage} />,
  <Route key={4} path="/cookies" component={CookiePage} />,
  <Route key={5} path="*" component={CompanyListPage} />,
];

@connect(s => {
  return { ...s.app,
    cookies: s.cookies,
  };
})
export default class App extends React.Component {

  static propTypes = {
    loaded: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    logPageView: React.PropTypes.func,
    cookies: React.PropTypes.shape({
      accepted: React.PropTypes.bool,
    }),
  }

  componentWillMount() {
    this.loadInitialState();
    if(document.cookie.indexOf('cookie-accept=true') > -1) {
      this.props.dispatch(setAccepted(true));
    }
  }

  loadInitialState() {
    var { dispatch, loaded, loading } = this.props;
    if(!loaded && !loading) {
      dispatch(loadData());
    }
  }

  buildContent() {
    var { loaded, loading, logPageView } = this.props;

    if (loading || !loaded) {
      return 'loading...';
    }

    return (
      <Router history={browserHistory} onUpdate={logPageView}>
        {routes}
      </Router>
      );
  }

  render() {
    var { dispatch, cookies } = this.props;
    var content = this.buildContent();
    return (
      <div>
        <div className="app-area">
        <CookieNotice
          accept={ ()=>{
            dispatch(acceptCookies());
          }}
          accepted={cookies.accepted}/>
        <TopBar />
        <Grid style={STYLES.grid}>
          {content}
        </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}
