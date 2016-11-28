
import React from 'react';

import Table from 'react-bootstrap/lib/Table';
import { Link } from 'react-router';
import { logEvent } from 'utils/ga';

export default class ActorList extends React.Component {

  static propTypes = {
    positions: React.PropTypes.array,
  }

  static defaultProps = {
    positions: [],
  }

  state = {
    orderBy: { column: 'lastChanged', direction: 1 },
    showAll: false,
  }

  buildRow = (position) => {
    var nameContent = position.name;
    var { showAll } = this.state;
    if(position.current === 0 && !showAll) {
      return false;
    }

    if(position.key) {
      nameContent = <Link to={`/stock/${position.key}`}>{nameContent}</Link>;
    }

    return (<tr key={position.name}>
        <td>{nameContent}</td>
        <td>{position.current.toFixed(2)} %</td>
      </tr>);
  }

  toggleShowAll = (e) => {
    e.preventDefault();
    var { showAll } = this.state;
    logEvent('Position list', 'closed positions', showAll ? 'hide' : 'show');
    this.setState({ showAll: !showAll });
  }

  buildShowAllLink() {
    var { showAll } = this.state;

    var text = showAll ? 'Hide closed positions' : 'Show closed positions';
    return (
      <tr>
        <td colSpan="2">
          <a href="#" onClick={this.toggleShowAll}>{text}</a>
        </td>
      </tr>
      )
  }

  render() {
    var { positions } = this.props;
    var rows = positions.map(this.buildRow);
    var showAllLink;
    if(rows.indexOf(false) !== -1 || this.state.showAll) {
      showAllLink = this.buildShowAllLink();
    }

    return (
      <Table>
        <tbody>
          {rows}
          {showAllLink}
        </tbody>
      </Table>
      );
  }
}
