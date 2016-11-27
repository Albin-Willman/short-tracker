import React from 'react';
import DataTable from 'components/Tables/DataTable.jsx';

const columns = [
  { label: 'Date', name: 'date' },
  { label: 'Shorter', name: 'name' },
  { label: 'Change', name: 'change', percent: true },
  { label: 'Shorter Total', name: 'position', percent: true },
  { label: 'Total', name: 'total', percent: true, noMobile: true },
  { label: 'Stock price*', name: 'price', noMobile: true, currency: true },
];

export default class ChangeLog extends React.Component {

  static propTypes = {
    changeLog: React.PropTypes.array,
  }

  render() {
    var { changeLog } = this.props;
    return <div className="change-log">
      <DataTable
            eventTitle= "change log"
            items={changeLog}
            columns={columns}
            sortBy={{
              column: 'date',
              direction: 'asc',
            }}
            filterPlaceholder="Start typing to filter"/>
      <p style={{ textAlign: 'right' }}>* This is the price at the end of the date in question.</p>
    </div>;
  }
}
