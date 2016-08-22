import React from 'react';
import Helmet from "react-helmet";
import { connect } from 'react-redux';

import CompanyList from 'components/CompanyList';
import MyGrid from 'components/Layout/MyGrid';

import { browserHistory } from 'react-router';

@connect(s => s.app)
export default class CompanyListPage extends React.Component {

  static propTypes = {
    companies: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    loading: React.PropTypes.bool,
  }

  render() {
    var { companies } = this.props;

    return (
      <MyGrid>
        <Helmet title="Companies" />
        <CompanyList
          companies={companies}
          viewCompany={ id => {
            browserHistory.push(`/stock/${id}`);
          } } />
      </MyGrid>);
  }
}
