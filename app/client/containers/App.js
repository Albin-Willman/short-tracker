
import React from 'react';
import { connect } from 'react-redux';

// ReactBoostrap components:
import Grid from 'react-bootstrap/lib/Grid';
import CompanyList from 'components/CompanyList';
import Company from 'components/Company';

import { loadData }  from 'services/data-services';
import { setCompany }  from 'actions/company-actions';

const STYLES = {
    grid: {
        marginTop: 50,
    }
};

@connect(s => s)
export default class App extends React.Component {

  static propTypes = {
    app: React.PropTypes.object,
    company: React.PropTypes.object,
  }

  componentWillMount(){
    this.loadInitialState();
  }

  loadInitialState(){
    var { dispatch, app } = this.props;
    if(!app.loaded && !app.loading){
      dispatch(loadData());
    }
  }

  buildContent() {
    var { app, company, dispatch } = this.props;

    if (app.loading || !app.loaded){
      return "loading...";
    }

    if(company.company){
      return <Company company={company.company} back={() => {dispatch(setCompany(null))}}/>
    }

    return <CompanyList companies={app.companies} setActive={comp => {dispatch(setCompany(comp))}}/>;
  }

  render() {
    var { app } = this.props;
    var content = this.buildContent();
    return (
      <Grid style={STYLES.grid}>
        {content}
        <p>
          * All positions below 0.5% are considered to be 0%.<br/>
          ** Data updated {app.updated}
        </p>
      </Grid>
    );
  }
}
