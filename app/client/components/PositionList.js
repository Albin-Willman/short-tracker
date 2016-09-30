
import React from 'react';

import Table from 'react-bootstrap/lib/Table';
import { Link } from 'react-router';

export default class ActorList extends React.Component {

  static propTypes = {
    positions: React.PropTypes.array,
  }

  static defaultProps = {
    positions: [],
  }

  state = {
    orderBy: { column: 'lastChanged', direction: 1 },
  }

  buildRow(position) {
    var nameContent = position.name;
    if(position.key) {
      nameContent = <Link to={`/stock/${position.key}`}>{nameContent}</Link>;
    }

    return (<tr key={position.name}>
        <td>{nameContent}</td>
        <td>{position.current.toFixed(2)} %</td>
      </tr>);
  }

  render() {
    var { positions } = this.props;
    var rows = positions.map(this.buildRow);

    return (
      <Table>
        <tbody>
          {rows}
        </tbody>
      </Table>
      );
  }
}