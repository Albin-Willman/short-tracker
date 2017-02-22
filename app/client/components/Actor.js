import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import { Link } from 'react-router';
import PositionList from 'components/PositionList.jsx';
import LineChart from 'components/LineChart';
import AppInfo from 'containers/AppInfo';
// import OptimalAd from 'containers/Ads/OptimalAd';

export default class Actor extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
    positions: React.PropTypes.array,
    historyData: React.PropTypes.array,
  }

  static defaultProps = {
    name: '',
    positions: [],
    historyData: [],
  }

  render() {
    var { name, positions, historyData } = this.props;
    return (
      <div>
        <Row>
          <Col lg={6}>
            <Well className="highlight">
              <h1>{name}</h1>
              <h3>
                Current positions
              </h3>
              <PositionList positions={positions} />
              <Link to="/shorters">Back</Link>
            </Well>
            <AppInfo/>
          </Col>
          <Col lg={6}>
            <Well className="accent">
              <LineChart hAxis="Date" vAxis="Short position" data={historyData} />
            </Well>
          </Col>
        </Row>
      </div>
    );
  }
}
