import React from 'react';
import { connect } from 'react-redux';

import Company from 'components/Company';

import { loadHistory }  from 'services/data-services';

@connect(s => s.app)
export default class CompanyPage extends React.Component {

  componentWillMount() {
    var { companies, params, history, dispatch } = this.props;
    console.log(history.company , params.name)
    if(history.company != params.name){
      dispatch(loadHistory(params.name));
    }
    this.setState({
      company: companies[params.name]
    })
  }

  render() {
    var { company } = this.state;
    var { history } = this.props;
    return <Company company={company} history={history}/>
  }
}