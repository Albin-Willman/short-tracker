
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

import computeHistoryData from 'utils/formaters/history-chart-formater';
import computeActorData from 'utils/formaters/actor-chart-formater';

export default class Company extends React.Component {

  static propTypes = {
    company: React.PropTypes.shape({
      name: React.PropTypes.string,
      actors: React.PropTypes.object,

    }),
    history: React.PropTypes.object,
  }

  static defaultProps = {
    company: {},
    history: {},
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
    this.setState({ detailed: val });
  }

  render() {
    var { company, history } = this.props;
    var { detailed } = this.state;

    var historyData = computeHistoryData(history);
    var historyChart = this.buildHistoryChart(historyData);
    var positionChartData = computeActorData(company.actors);

    var listWidth = detailed ? 12 : 5;
    var buttonLabel = detailed ? 'Hide details' : 'Show details';

    return (
      <div>
        <Row>
          <Col lg={listWidth}>
            <Well>
              <h1>{company.name}</h1>
              <h3>
                Current positions
                <Button
                  onClick={ ()=>{
                    this.toggleDetails(!detailed);
                  } }
                  style={{ float: 'right' }}>
                    {buttonLabel}
                </Button>
              </h3>
              <ActorList positions={positionChartData} history={historyData} detailed={detailed} />
              <Link to="/">Back</Link>
            </Well>
            <AppInfo/>
          </Col>
          <Col lg={7}>
            <Well>
              <LineChart hAxis="Date" vAxis="Short position" data={positionChartData} />
              {historyChart}
            </Well>
          </Col>
          <Col lg={5}>
            <CaseExplain visible={detailed}/>
          </Col>
        </Row>
      </div>
    );
  }
}
