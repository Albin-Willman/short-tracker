import React from 'react';

import FormControl from 'react-bootstrap/lib/FormControl';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Table from 'react-bootstrap/lib/Table';
import Pagination from 'components/Tables/Pagination';
// import OptimalAd from 'containers/Ads/OptimalAd';

import { logEvent } from 'utils/ga';

const pageLength = 20;

export default class DataTable extends React.Component {

  static propTypes = {
    items: React.PropTypes.array,
    filterPlaceholder: React.PropTypes.string,
    eventTitle: React.PropTypes.string,
    columns: React.PropTypes.array,
    viewItem: React.PropTypes.func,
    sortBy: React.PropTypes.object,
  }

  static defaultProps = {
    items: [],
    filterPlaceholder: '',
    eventTitle: '',
    columns: [],
    viewItem: () => {},
    sortBy: {
      column: 'lastChange',
      direction: 'asc',
    },
  }

  state = {
    filter: '',
    page: 1,
    sortBy: {},
  }

  componentWillMount() {
    var { sortBy } = this.props;
    this.setState({ sortBy, page: 1 });
  }

  buildRows() {
    var { items } = this.props;
    var { page } = this.state;
    var sortedItems = items.filter(this.checkFilter).sort(this.compareItems);
    var pageItems = sortedItems.slice((page - 1)*pageLength, page*pageLength);

    return pageItems.map(this.buildRow);
  }

  buildRow = (item, i) => {
    var { columns, viewItem } = this.props;
    var cells = columns.map((column) => {
      var className = column.noMobile ? 'hidden-xs' : '';
      if(column.percent) {
        return <td key={column.name} className={className}>{item[column.name].toFixed(2)} %</td>;
      }
      if(column.currency) {
        var value = item[column.name];
        value = value ? value.toFixed(2) : '-'
        return <td key={column.name} className={className}>{value} kr</td>;
      }
      return <td key={column.name}>{item[column.name]}</td>;
    });
    return (<tr
          key={item.key || i}
          onClick={()=>{
            viewItem(item.key);
          }}
          style={{ cursor: 'pointer' }}>
            {cells}
          </tr>);
  }

  checkFilter = (item) => {
    var { filter } = this.state;
    return filter.length === 0 || item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
  }

  compareItems = (a, b) => {
    var { column, direction } = this.state.sortBy;
    var ret = direction === 'desc' ? 1 : -1;
    if(a[column] < b[column]) {
      return -ret;
    }
    if(a[column] > b[column]) {
      return ret;
    }
    return 0;
  }

  buildHeaders = () => {
    var { columns } = this.props;

    return columns.map(this.buildHeader);
  }

  buildHeader = (columnInfo) => {
    var { column, direction } = this.state.sortBy;
    var className = columnInfo.noMobile ? 'hidden-xs' : '';

    var glyph, newDirection = 'desc';
    if(columnInfo.name === column) {
      if(direction === newDirection) {
        newDirection = 'asc';
        glyph = <Glyphicon glyph="chevron-up" />;
      } else {
        glyph = <Glyphicon glyph="chevron-down" />;
      }
    }

    return (<th key={columnInfo.name} style={ { cursor: 'pointer' } } className={className}
      onClick={ ()=> {
          this.setSorting({ column: columnInfo.name, direction: newDirection });
        } }
      >
      {columnInfo.label}
      <span className="order-indicator">{glyph}</span>
    </th>);
  }

  setFilter = (filter) => {
    var { eventTitle } = this.props;
    logEvent(eventTitle, 'filter', filter);
    this.setState({ filter, page: 1 });
  }

  setSorting = (sortBy) => {
    var { eventTitle } = this.props;
    logEvent(eventTitle, 'sorting', sortBy.column);
    this.setState({ sortBy, page: 1 });
  }

  goToPage = (page) => {
    this.setState({ page });
  }

  buildPagination = () => {
    var { items } = this.props;
    var { page } = this.state;
    return (<Pagination
            page={page}
            pageLength={pageLength}
            totalCount={items.filter(this.checkFilter).length}
            goToPage={this.goToPage} />
          );
  }

  render() {
    var { filterPlaceholder } = this.props;
    var { filter } = this.state;
    var headers = this.buildHeaders();
    var rows = this.buildRows();

    var pagination = this.buildPagination();

    return (
      <div>
        <FormControl
            placeholder={filterPlaceholder}
            onChange={(e)=>{
              this.setFilter(e.target.value);
            }}
            value={filter} />
        <Table>
          <thead><tr>
            {headers}
          </tr></thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
        {pagination}
      </div>);
  }
}
