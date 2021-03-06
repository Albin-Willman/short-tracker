
import React from 'react';

import Table from 'react-bootstrap/lib/Table';
import { Link } from 'react-router';
import { logEvent } from 'utils/ga';

export default class ActorList extends React.Component {

  static propTypes = {
    actorCases: React.PropTypes.array,
    detailed: React.PropTypes.bool,
  }

  static defaultProps = {
    actorCases: [],
    detailed: false,
  }

  state = {
    orderBy: { column: 'lastChanged', direction: 1 },
    showAll: false,
  }

  buildRow = (actorCase) => {
    var { detailed } = this.props;
    var { showAll } = this.state;
    if(actorCase.currentPos === 0 && !showAll && !detailed) {
      return false;
    }

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

    var nameContent = actorCase.name;
    if(actorCase.key) {
      nameContent = <Link to={`/shorter/${actorCase.key}`}>{nameContent}</Link>;
    }

    return (<tr key={actorCase.name}>
        <td>{nameContent}</td>
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

  toggleShowAll = (e) => {
    e.preventDefault();
    var { showAll } = this.state;
    logEvent('Actor list', 'closed positions', showAll ? 'hide' : 'show');
    this.setState({ showAll: !showAll });
  }

  buildShowAllLink() {
    var { detailed } = this.props;
    var { showAll } = this.state;
    if(detailed) {
      return false;
    }

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
    var { actorCases, detailed } = this.props;

    var sortedCases = actorCases.sort(this.buildCompare());
    var rows = sortedCases.map(this.buildRow);
    var showAllLink;
    if(rows.indexOf(false) !== -1 || this.state.showAll) {
      showAllLink = this.buildShowAllLink();
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
          {showAllLink}
        </tbody>
      </Table>
      );
  }
}
