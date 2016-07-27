import React from 'react';
import { connect } from 'react-redux';

import Company from 'components/Company';

@connect(s => s.app)
export default class CompanyPage extends React.Component {

  componentWillMount() {
    var { companies, params } = this.props;
    this.setState({
      company: companies[params.name]
    })
  }

  render() {
    var { dispatch } = this.props;
    var { company } = this.state;

    return <Company company={company} />
  }
}