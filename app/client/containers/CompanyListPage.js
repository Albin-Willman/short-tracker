import React from 'react';
import { connect } from 'react-redux';

import CompanyList from 'components/CompanyList';

import { browserHistory } from 'react-router';

@connect(s => s.app)
export default class CompanyListPage extends React.Component {

  static propTypes = {
    companies: React.PropTypes.object,
  }

  render() {
    var { companies } = this.props;

    return (<CompanyList
      companies={companies}
      viewCompany={ id => {
        browserHistory.push(`/stock/${id}`);
      } } />);
  }
}
