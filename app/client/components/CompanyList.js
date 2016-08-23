import React from 'react';

import FormControl from 'react-bootstrap/lib/FormControl';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Table from 'react-bootstrap/lib/Table';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import AppInfo from 'containers/AppInfo';
import Pagination from 'components/Tables/Pagination';
import ChitikaAd from 'containers/Ads/ChitikaAd';
import OptimalAd from 'containers/Ads/OptimalAd';

import { logEvent } from 'utils/ga';

export default class CompanyList extends React.Component {

  static propTypes = {
    companies: React.PropTypes.object,
    setActive: React.PropTypes.func,
    viewCompany: React.PropTypes.func,
  }

  static defaultProps = {
    companies: {},
    setActive: () => {},
    viewCompany: React.PropTypes.func,
  }

  state = {
    filter: '',
    page: 1,
    sortBy: {
      column: 'lastChange',
      direction: 'asc',
    },
  }

  setFilter(filter) {
    logEvent('Company list', 'filter', filter);
    this.setState({ filter, page: 1 });
  }

  setSorting(sortBy) {
    logEvent('Company list', 'sorting', sortBy.column);
    this.setState({ sortBy, page: 1 });
  }

  buildGoToPage() {
    return (page) => {
      this.setState({ page });
    };
  }

  buildCompare() {
    var { column, direction } = this.state.sortBy;
    var ret = direction === 'desc' ? 1 : -1;
    return (a, b) => {
      if(a.company[column] < b.company[column]) {
        return -ret;
      }
      if(a.company[column] > b.company[column]) {
        return ret;
      }
      return 0;
    };
  }

  buildCompanyRow(key, company, viewCompany) {
    return (<tr
      key={key}
      onClick={()=>{
        viewCompany(key);
      }}
      style={{ cursor: 'pointer' }}>
        <td>{company.name}</td>
        <td>{company.lastChange}</td>
      </tr>);
  }

  render() {
    var { companies, viewCompany } = this.props;
    var filteredCompanies = [];

    var { filter, page } = this.state;
    for(var key in companies) {
      if (companies.hasOwnProperty(key)) {
        var company = companies[key];
        if(
          filter.length === 0 || company.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
          filteredCompanies.push({
            key: key,
            company: company,
          });
        }
      }
    }
    var compare = this.buildCompare();
    var sortedCompanies = filteredCompanies.sort(compare);

    var rows = [];

    var pageLength = 20;
    var first = (page-1) * pageLength;
    var last = Math.min(page * pageLength, sortedCompanies.length);

    for(var i = first; i < last; i += 1) {
      var sortedCompany = sortedCompanies[i];
      rows.push(this.buildCompanyRow(sortedCompany.key, sortedCompany.company, viewCompany));
    }

    return (<Row>
      <Col md={9}>
        <Well className="highlight">
          <FormControl
            placeholder="Start typing to find company"
            onChange={(e)=>{
              this.setFilter(e.target.value);
            }}
            value={filter} />
          <div className="add-well in-content">
            <OptimalAd config={{ width: 728, height: 90 }}/>
          </div>
          <Table>
            <thead><tr>
              {this.buildHeader('Company', 'name')}
              {this.buildHeader('Last change', 'lastChange')}
            </tr></thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
          <Pagination
            page={page}
            pageLength={pageLength}
            totalCount={sortedCompanies.length}
            goToPage={this.buildGoToPage()} />
            <div className="add-well in-content">
              <OptimalAd config={{ width: 728, height: 90 }}/>
            </div>
        </Well>
      </Col>
      <Col md={3}>
        <Well className="accent">
          <p>
            This is a list of all stocks where any one reported having a
            short position above 0.5% since november 1th 2012.
          </p>
          <p>
            This is the date when the current rules where adopted.
          </p>
          <p>
            Click on a row to see more details.
          </p>
        </Well>
        <Well className="add-well">
          <ChitikaAd config={{ width: 160, height: 600 }}/>
        </Well>
        <AppInfo/>
      </Col>
    </Row>);
  }

  buildHeader(label, name) {
    var { column, direction } = this.state.sortBy;

    var glyph, newDirection = 'desc';
    if(name === column) {
      if(direction === newDirection) {
        newDirection = 'asc';
        glyph = <Glyphicon glyph="chevron-up" />;
      } else {
        glyph = <Glyphicon glyph="chevron-down" />;
      }
    }

    return (<th style={ { cursor: 'pointer' } }
      onClick={ ()=> {
        this.setSorting({ column: name, direction: newDirection });
      } }>
      {label}
      <span className="order-indicator">{glyph}</span>
    </th>);
  }
}
