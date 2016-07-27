import React from 'react';
import { connect } from 'react-redux';

import CompanyList from 'components/CompanyList';

@connect(s => s.app)
export default class CompanyListPage extends React.Component {

  render() {
    var { dispatch, companies } = this.props;

    return <CompanyList companies={companies} />
  }
}