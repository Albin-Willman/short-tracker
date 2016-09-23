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
    companies: React.PropTypes.array,
    history: React.PropTypes.array,
    positions: React.PropTypes.array,
    actorCases: React.PropTypes.array,
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  static defaultProps = {
    companies: [],
    history: [],
    positions: [],
    actorCases: [],
    params: {},
    dispatch: ()=>{},
  }

  componentWillMount() {
    var { companies, params, history, dispatch } = this.props;
    if(history.company !== params.name) {
      dispatch(loadHistory(params.name));
    }
    this.setState({
      company: this.findCompany(companies, params.name),
    });
  }

  findCompany(companies, key) {
    for(var i = 0; i < companies.length; i += 1) {
      var company = companies[i];
      if(company.key === key) {
        return company;
      }
    }
    return {};
  }

  render() {
    var { company } = this.state;
    var { history, positions, actorCases } = this.props;

    var title = company ? company.name : '';
    return (
      <MyGrid>
        <Helmet title={title} />
        <Description
          description={`Data describing who is shorting ${title}`}
          keywords={`${title}, short, shorts, finance, stock, investment`} />
        <Company
          company={company}
          history={history}
          positions={positions}
          actorCases={actorCases} />
      </MyGrid>);
  }
}
