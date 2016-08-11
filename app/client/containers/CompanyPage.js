import React from 'react';
import { connect } from 'react-redux';

import Company from 'components/Company';
import MyGrid from 'components/Layout/MyGrid';

import { loadHistory } from 'services/data-services';

@connect(s => s.app)
export default class CompanyPage extends React.Component {

  static propTypes = {
    companies: React.PropTypes.object,
    history: React.PropTypes.object,
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  static defaultProps = {
    companies: {},
    history: {},
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
    var { history } = this.props;
    return (
      <MyGrid>
        <Company company={company} history={history}/>
      </MyGrid>);
  }
}
