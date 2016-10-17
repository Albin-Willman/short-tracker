import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import AppInfo from 'containers/AppInfo';
import DataTable from 'components/Tables/DataTable';
import OptimalAd from 'containers/Ads/OptimalAd';

export default class CompanyIndex extends React.Component {

  static propTypes = {
    companies: React.PropTypes.array,
    viewCompany: React.PropTypes.func,
  }

  static defaultProps = {
    companies: [],
    viewCompany: () => {},
  }

  render() {
    var { companies, viewCompany } = this.props;

    var columns = [
      { label: 'Company', name: 'name' },
      { label: 'Total short', name: 'total', percent: true },
      { label: 'Change 30 days', name: 'change30Days', percent: true, noMobile: true },
      { label: 'Last change', name: 'lastChange' },
    ];

    return (<Row>
      <Col md={9}>
        <Well className="highlight">
          <DataTable
            eventTitle= "Company index"
            viewItem={viewCompany}
            items={companies}
            columns={columns}
            filterPlaceholder="Start typing to find company"/>

          <OptimalAd config={{ width: 728, height: 90 }} inContent={true}/>
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
        <OptimalAd config={{ width: 160, height: 600 }}/>
        <AppInfo/>
      </Col>
    </Row>);
  }
}
