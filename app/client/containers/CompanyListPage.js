import React from 'react';
import { connect } from 'react-redux';

import CompanyList from 'components/CompanyList';
import MyGrid from 'components/Layout/MyGrid';
import { loadData } from 'services/data-services';

import { browserHistory } from 'react-router';

@connect(s => s.app)
export default class CompanyListPage extends React.Component {

  componentWillMount() {
    var { dispatch, loaded, loading } = this.props;
    if(!loaded && !loading) {
      dispatch(loadData());
    }
  }

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
        <CompanyList
        companies={companies}
        viewCompany={ id => {
          browserHistory.push(`/stock/${id}`);
        } } />
      </MyGrid>);
  }
}
