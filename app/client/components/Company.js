
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import ActorList from 'components/ActorList';
import LineChart from 'components/LineChart';
import CaseExplain from 'components/CaseExplain';
import AppInfo from 'containers/AppInfo';
import OptimalAd from 'containers/Ads/OptimalAd';

import { logEvent } from 'utils/ga';

export default class Company extends React.Component {

  static propTypes = {
    company: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
    positions: React.PropTypes.array,
    history: React.PropTypes.array,
    actorCases: React.PropTypes.array,
  }

  static defaultProps = {
    company: {},
    positions: [],
    history: [],
    actorCases: [],
  }

  state = {
    detailed: false,
  }

  buildHistoryChart(data) {
    if(data.length === 0) {
      return 'No historic data available yet';
    }
    return <LineChart hAxis="Date" vAxis="Stock Price" data={data} />;
  }

  toggleDetails(val) {
    logEvent('Company page', 'details', (val ? 'show' : 'hide'));
    this.setState({ detailed: val });
  }

  render() {
    var { company, history, positions, actorCases } = this.props;
    var { detailed } = this.state;

    var historyChart = this.buildHistoryChart(history);

    var listWidth = detailed ? 12 : 6;
    var buttonLabel = detailed ? 'Hide details' : 'Show details';

    var changeSign = company.change30Days > 0 ? '+' : '';

    return (
      <div>
        <Row>
          <Col lg={listWidth}>
            <Well className="highlight">
              <h1>{company.name}</h1>
              <div>
                Change last 30 days: <strong>
                  {changeSign}{(company.change30Days || 0).toFixed(2)} %
                </strong>
              </div>

              <h3>
                Current positions
                <Button
                  bsStyle="primary"
                  bsSize="small"
                  onClick={ ()=>{
                    this.toggleDetails(!detailed);
                  } }
                  style={{ float: 'right', marginTop: '-2px' }}>
                    {buttonLabel}
                </Button>
              </h3>
              <ActorList actorCases={actorCases} detailed={detailed}/>
              <OptimalAd config={{ width: 300, height: 250 }} inContent={true}/>
              <Link to="/stocks">Back</Link>
            </Well>
            <AppInfo/>
          </Col>
          <Col lg={6}>
            <Well className="accent">
              <LineChart hAxis="Date" vAxis="Short position" data={positions} />
              {historyChart}
            </Well>
          </Col>
          <Col lg={6}>
            <CaseExplain visible={detailed}/>
            <OptimalAd config={{ width: 300, height: 250 }}/>
          </Col>
        </Row>
      </div>
    );
  }
}
