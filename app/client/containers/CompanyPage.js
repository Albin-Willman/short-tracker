import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Company from 'components/Company';
import MyGrid from 'components/Layout/MyGrid';
import Description from 'components/Meta/Description';

import { loadHistory } from 'services/data-services';

@connect(s => {
  return { ...s.company,
    companies: s.app.companies,
  };
})
export default class CompanyPage extends React.Component {

  static propTypes = {
    companies: React.PropTypes.object,
    history: React.PropTypes.object,
    positions: React.PropTypes.object,
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  static defaultProps = {
    companies: {},
    history: {},
    positions: {},
    params: {},
    dispatch: ()=>{},
  }

  componentWillMount() {
    var { companies, params, history, dispatch } = this.props;
    if(history.company !== params.name) {
      dispatch(loadHistory(params.name));
    }
    this.setState({
      company: companies[params.name],
    });
  }

  render() {
    var { company } = this.state;
    var { history, positions } = this.props;

    var title = company ? company.name : '';
    return (
      <MyGrid>
        <Helmet title={title} />
        <Description
          description={`Data describing who is shorting ${title}`}
          keywords={`${title}, short, shorts, finance, stock, investment`} />
        <Company company={company} history={history} positions={positions} />
      </MyGrid>);
  }
}
