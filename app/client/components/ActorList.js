
import React from 'react';

import Table from 'react-bootstrap/lib/Table';
import buildActorData from 'utils/formaters/actor-data-formater';

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

  buildRow(actorCase, detailed) {
    var cases, lastChanged;
    if(detailed) {
      cases = [
        <td key="best">{actorCase.bestMean.toFixed(2)}</td>,
        <td key="mid">{actorCase.midMean.toFixed(2)}</td>,
        <td key="worst">{actorCase.worstMean.toFixed(2)}</td>,
      ];
      lastChanged = <td>{actorCase.lastChange}</td>;
    }

    return (<tr key={actorCase.name}>
        <td>{actorCase.name}</td>
        {cases}
        <td>{actorCase.currentPos.toFixed(2)} %</td>
        {lastChanged}
      </tr>);
  }

  buildHeaders() {
    if(!this.props.detailed) {
      return false;
    }
    return (<thead><tr>
        <th>Company</th>
        <th>Best case*</th>
        <th>Mid case*</th>
        <th>Worst case*</th>
        <th>Current</th>
        <th>Last change</th>
      </tr></thead>);
  }

  render() {
    var { positions, detailed, history } = this.props;
    var rows = [];

    var cases = buildActorData(history, positions, detailed);

    for(var i = 1; i < cases.length; i += 1) {
      rows.push(this.buildRow(cases[i], detailed));
    }

    var headers = this.buildHeaders();

    return (
      <Table >
        {headers}
        <tbody>
          {rows}
        </tbody>
      </Table>
      );
  }
}
