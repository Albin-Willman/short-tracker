import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Description from 'components/Meta/Description';
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
        <Description
        description="Data on all companies with major short positions on stockholm stock exchange."
        keywords="finance, investments, shorting, investment-data" />
        <CompanyList
          companies={companies}
          viewCompany={ id => {
            browserHistory.push(`/stock/${id}`);
          } } />
      </MyGrid>);
  }
}
