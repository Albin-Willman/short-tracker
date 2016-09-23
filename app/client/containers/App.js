
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import CompanyListPage from 'containers/CompanyListPage';
import ActorListPage from 'containers/ActorListPage';
import ActorPage from 'containers/ActorPage';
import BlogPage from 'containers/BlogPage';
import BlogPostPage from 'containers/BlogPostPage';
import CompanyPage from 'containers/CompanyPage';
import AboutPage from 'components/Pages/AboutPage';
import TopBar from 'components/Layout/TopBar';
import Footer from 'components/Layout/Footer';
import CookiePage from 'components/Pages/CookiePage';
import CookieNotice from 'components/Layout/CookieNotice';
import VacationNotice from 'components/Layout/VacationNotice';
import WelcomePage from 'components/Pages/WelcomePage';
import NoPage from 'components/Pages/NoPage';

import { acceptCookies } from 'services/cookie-services';
import { setAccepted } from 'actions/cookie-actions';
import { loadData } from 'services/data-services';

import { Router, Route, browserHistory } from 'react-router';

const routes = [
  <Route key={0} path="/" component={WelcomePage} />,
  <Route key={1} path="/stocks" component={CompanyListPage} />,
  <Route key={2} path="/stock/:name" component={CompanyPage} />,
  <Route key={3} path="/about" component={AboutPage} />,
  <Route key={4} path="/cookies" component={CookiePage} />,
  <Route key={5} path="/blog" component={BlogPage} />,
  <Route key={6} path="/blog/:id" component={BlogPostPage} />,
  <Route key={7} path="/shorters" component={ActorListPage} />,
  <Route key={8} path="/shorter/:key" component={ActorPage} />,
  <Route key={10} path="/*" component={NoPage} />,
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
    message: React.PropTypes.string,
    cookies: React.PropTypes.shape({
      accepted: React.PropTypes.bool,
    }),
  }

  componentWillMount() {
    if(document.cookie.indexOf('cookie-accept=true') > -1) {
      this.props.dispatch(setAccepted(true));
    }
    var { dispatch, loaded } = this.props;
    if(!loaded) {
      dispatch(loadData());
    }
  }

  buildContent() {
    var { loading, logPageView } = this.props;

    if (loading) {
      return 'loading...';
    }

    return (
      <Router history={browserHistory} onUpdate={logPageView}>
        {routes}
      </Router>
      );
  }

  render() {
    var { dispatch, cookies, message } = this.props;
    var content = this.buildContent();
    return (
      <div>
        <Helmet titleTemplate="%s - Kortapositioner" />
        <div className="app-area">
        <CookieNotice
          accept={ ()=>{
            dispatch(acceptCookies());
          }}
          accepted={cookies.accepted}/>
        <VacationNotice message={message}/>
        <TopBar />
        {content}
        </div>
        <Footer />
      </div>
    );
  }
}
