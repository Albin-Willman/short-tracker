import React from 'react';
import DataTable from 'components/Tables/DataTable.jsx';

const columns = [
  { label: 'Date', name: 'date' },
  { label: 'Shorter', name: 'name' },
  { label: 'Change', name: 'change', percent: true },
  { label: 'Total', name: 'position', percent: true },
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
    </div>;
  }
}
