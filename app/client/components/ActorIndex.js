import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import AppInfo from 'containers/AppInfo';
import DataTable from 'components/Tables/DataTable';
import OptimalAd from 'containers/Ads/OptimalAd';

import { logEvent } from 'utils/ga';

export default class CompanyList extends React.Component {

  static propTypes = {
    actors: React.PropTypes.array,
    viewActor: React.PropTypes.func,
  }

  static defaultProps = {
    actors: [],
    viewActor: () => {},
  }

  render() {
    var { actors, viewActor } = this.props;

    var columns = [
      { label: 'Shorter', name: 'name' },
      { label: 'Active positions', name: 'noOfActivePositions' },
      { label: 'Last change', name: 'lastChange' },
    ];

    return (<Row>
      <Col md={9}>
        <Well className="highlight">
          <DataTable
            eventTitle= "Actor index"
            viewItem={viewActor}
            items={actors}
            columns={columns}
            filterPlaceholder="Start typing to find shorters"/>
          <OptimalAd config={{ width: 728, height: 90 }} inContent={true}/>
        </Well>
      </Col>
      <Col md={3}>
        <Well className="accent">
          <p>
            This is a list of all enteties who has reported having a
            short position above 0.5% since november 1th 2012.
          </p>
          <p>
            This is the date when the current rules where adopted.
          </p>
          <p>
            Click on a row to see more details.
          </p>
        </Well>
        <OptimalAd config={{ width: 160, height: 600 }}/>
        <AppInfo/>
      </Col>
    </Row>);
  }
}
