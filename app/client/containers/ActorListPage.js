import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Description from 'components/Meta/Description';
import ActorIndex from 'components/ActorIndex';
import MyGrid from 'components/Layout/MyGrid';

import { loadActorList } from 'services/actor-services';

import { browserHistory } from 'react-router';

@connect(s => s.actor)
export default class ActorListPage extends React.Component {

  static propTypes = {
    actors: React.PropTypes.array,
    dispatch: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    loading: React.PropTypes.bool,
  }

  componentWillMount() {
    var { loaded, loading, dispatch } = this.props;
    if(!loaded && !loading) {
      dispatch(loadActorList());
    }
  }

  render() {
    var { actors } = this.props;

    return (
      <MyGrid>
        <Helmet title="Shorters" />
        <Description
          description="Data on entities with major short positions on stockholm stock exchange."
          keywords="finance, investments, shorting, investment-data" />
        <ActorIndex
          actors={actors}
          viewActor={ id => {
            browserHistory.push(`/shorter/${id}`);
          } } />
      </MyGrid>);
  }
}
