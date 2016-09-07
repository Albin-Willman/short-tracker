
import React from 'react';

import Table from 'react-bootstrap/lib/Table';
import buildActorData from 'utils/formaters/actor-data-formater';
import { logEvent } from 'utils/ga';

export default class ActorList extends React.Component {

  static propTypes = {
    positions: React.PropTypes.array,
    history: React.PropTypes.array,
    detailed: React.PropTypes.bool,
  }

  static defaultProps = {
    labels: [],
    positions: [],
    history: [],
    detailed: false,
  }

  state = {
    orderBy: { column: 'lastChanged', direction: 1 },
  }

  buildRow(actorCase, detailed) {
    var cases, lastChanged, lastChange;
    if(detailed) {
      cases = [
        <td key="best">{actorCase.bestMean.toFixed(2)}</td>,
        <td key="mid">{actorCase.midMean.toFixed(2)}</td>,
        <td key="worst">{actorCase.worstMean.toFixed(2)}</td>,
      ];
      lastChange = <td>{actorCase.lastChange.toFixed(2)} %</td>;
      lastChanged = <td>{actorCase.lastChanged}</td>;
    }

    return (<tr key={actorCase.name}>
        <td>{actorCase.name}</td>
        {cases}
        <td>{actorCase.currentPos.toFixed(2)} %</td>
        {lastChange}
        {lastChanged}
      </tr>);
  }

  setOrderBy = (newColumn) => {
    var { column, direction } = this.state.orderBy;
    var newDirection = 1;
    if(column === newColumn) {
      newDirection = -direction;
    }
    logEvent('Company page', 'sort', newColumn);
    this.setState({ orderBy: { column: newColumn, direction: newDirection } });
  }

  buildHeaders() {
    if(!this.props.detailed) {
      return false;
    }
    return (<thead><tr>
        <th onClick={() => {
          this.setOrderBy('name');
        }}>Company</th>
        <th onClick={() => {
          this.setOrderBy('bestMean');
        }}>Best case*</th>
        <th onClick={() => {
          this.setOrderBy('midMean');
        }}>Mid case*</th>
        <th onClick={() => {
          this.setOrderBy('worstMean');
        }}>Worst case*</th>
        <th onClick={() => {
          this.setOrderBy('currentPos');
        }}>Current</th>
        <th onClick={() => {
          this.setOrderBy('lastChange');
        }}>Last change</th>
        <th onClick={() => {
          this.setOrderBy('lastChanged');
        }}>Last changed</th>
      </tr></thead>);
  }

  buildCompare = () => {
    var { column, direction } = this.state.orderBy;
    return (a, b) => {
      if(a.name === 'Total') {
        return 1;
      }
      if(b.name === 'Total') {
        return -1;
      }
      if(a[column] < b[column]) {
        return direction;
      }
      if(a[column] > b[column]) {
        return -direction;
      }
      return 0;
    };
  }

  render() {
    var { positions, detailed, history } = this.props;
    var rows = [];
    var cases = buildActorData(history, positions, detailed);

    var sortedCases = cases.sort(this.buildCompare());

    for(var i = 0; i < sortedCases.length; i += 1) {
      var caseData = sortedCases[i];
      if(caseData.name !== 'Date') {
        rows.push(this.buildRow(sortedCases[i], detailed));
      }
    }

    var headers = this.buildHeaders();

    var className = 'actor-list';
    if(detailed) {
      className += ' responsive detailed';
    }

    return (
      <Table className={className}>
        {headers}
        <tbody>
          {rows}
        </tbody>
      </Table>
      );
  }
}
