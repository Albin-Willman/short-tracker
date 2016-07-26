
import React from 'react';

import Table from 'react-bootstrap/lib/Table';

export default class ActorList extends React.Component {

  static propTypes = {
    labels: React.PropTypes.array,
    positions: React.PropTypes.array,
  }

  static defaultProps = {
    labels: [],
    positions: [],
  }

  buildRow(label, position) {
    return <tr key={label}>
      <td>{label}</td>
      <td>{position.toFixed(2)}</td>
    </tr>
  }

  render() {
    var { labels, positions } = this.props;

    var rows = [];

    for( var i in labels ){
      if(i > 0){
        rows.push(this.buildRow(labels[i], positions[i]));
      }
    }

    return (
      <Table >
        <tbody>
          {rows}
        </tbody>
      </Table>
      );
  }
}
