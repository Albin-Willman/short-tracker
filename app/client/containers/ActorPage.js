import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Actor from 'components/Actor';
import MyGrid from 'components/Layout/MyGrid';
import Description from 'components/Meta/Description';

import { loadActor } from 'services/actor-services';

@connect(s => s.actor.actor)
export default class ActorPage extends React.Component {

  static propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    historyData: React.PropTypes.array,
    positions: React.PropTypes.array,
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  static defaultProps = {
    id: '',
    name: '',
    historyData: [],
    positions: [],
    params: {},
    dispatch: ()=>{},
  }

  componentWillMount() {
    var { id, params, dispatch } = this.props;
    if(id !== params.key) {
      dispatch(loadActor(params.key));
    }
  }

  render() {
    var { historyData, positions, name } = this.props;
    return (
      <MyGrid>
        <Helmet title={name} />
        <Description
          description={`Data describing what ${name} is shorting.`}
          keywords={`${name}, short, shorts, finance, stock, investment`} />
        <Actor name={name} historyData={historyData} positions={positions} />
      </MyGrid>);
  }
}
