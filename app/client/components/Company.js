
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import { Chart } from 'react-google-charts';
import ActorList from 'components/ActorList';
import AppInfo from 'containers/AppInfo';

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
    detailed: true,
  }

  transformPositionChartData(actors) {
    var rows = [];
    rows.push(this.buildLabels(actors));
    var allDates = this.findAllDates(actors);

    var lastRow = new Array(Object.keys(actors).length + 1);
    lastRow.fill(0);
    for (var i = 0; i < allDates.length; i += 1) {
      var row = this.buildRow(actors, allDates[i], lastRow);
      rows.push(row);
      lastRow = row;
    }
    return rows;
  }

  buildRow(actors, date, lastRow) {
    var row = [];

    for (var actor in actors) {
      if (actors.hasOwnProperty(actor)) {
        var value = actors[actor].positions[date];
        if(typeof value === 'undefined') {
          value = lastRow[row.length + 1];
        }
        row.push(value);
      }
    }
    row.push(this.sumArray(row));
    row.unshift(date);
    return row;
  }

  buildLabels(actors) {
    var labels = ['Date'];
    for (var actor in actors) {
      if (actors.hasOwnProperty(actor)) {
        labels.push(actors[actor].name);
      }
    }
    labels.push('Total');
    return labels;
  }

  sumArray(row) {
    return row.reduce(function (pv, cv) {
      return pv + cv;
    }, 0);
  }

  findAllDates(actors) {
    var res = [];
    for(var actor in actors) {
      if (actors.hasOwnProperty(actor)) {
        res = res.concat(Object.keys(actors[actor].positions));
      }
    }
    return res.filter((value, index, self) => {
      return self.indexOf(value) === index;
    }).sort();
  }

  computeHistoryData() {
    var { history } = this.props;
    if(!history.data || history.data === 'No history') {
      return [];
    }
    var historyData = history.data.history;
    var data = [['Date', 'Day low', 'Day high']];
    for (var date in historyData) {
      if (historyData.hasOwnProperty(date)) {
        var dayData = historyData[date];
        data.push([date, dayData.low, dayData.high]);
      }
    }
    return data;
  }

  buildHistoryChart(data) {
    if(data.length === 0) {
      return 'No historic data available yet';
    }
    var options = {
      hAxis: { title: 'Date' },
      vAxis: { title: 'Stock Price' },
    };
    return (<Chart chartType="LineChart"
                  data={data}
                  options={options}
                  width={"100%"}
                  height={"400px"}
                  legend_toggle={true}/>);
  }

  buildPositionChart(data){
    var options = {
      hAxis: { title: 'Date' },
      vAxis: { title: 'Short position' },
    };

    return <Chart chartType="LineChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
                legend_toggle={true}/>
  }

  toggleDetails(val) {
    this.setState({ detailed: val });
  }

  buildCaseExplanation() {
    if(!this.state.detailed){
      return;
    }
    return (<Well>
          <h2>Explanation of scenarios</h2>
          <p>
            The cases in the table are break even prices for different scenarios.
            Note that non of the scenarios are probable and that they do not
            take interest in to account.
          </p>
          <strong>* Best case</strong>
          <p>
            This case assumes that every share shorted has been sold at the highest
            possible price and repurchaces has been made at the lowest possible price
            of the day.
          </p>
          <strong>* Mid case</strong>
          <p>
            This case assumes that every share shorted has been sold and repurchaces
            at the midpoint of the day.
          </p>
          <strong>* Worst case</strong>
          <p>This case assumes the opposite of the best case.</p>
        </Well>);
  }

  render() {
    var { company } = this.props;
    var { detailed } = this.state;

    var positionChartData = this.transformPositionChartData(company.actors);

    var positionChart = this.buildPositionChart(positionChartData);

    var historyData = this.computeHistoryData();
    var historyChart = this.buildHistoryChart(historyData);

    var listWidth = detailed ? 12 : 5;
    var buttonLabel = detailed ? 'Hide details' : 'Show details';

    var caseExplanation = this.buildCaseExplanation();

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
                    this.toggleDetails(!detailed)
                  } }
                  style={{ float: 'right' }}>
                    {buttonLabel}
                </Button>
              </h3>
              <ActorList positions={positionChartData} history={historyData} detailed={detailed} />
              <Link to="/">Back</Link>
            </Well>
          </Col>
          <Col lg={7}>
            <Well>
              {positionChart}
              {historyChart}
            </Well>
          </Col>
          <Col lg={5}>
            {caseExplanation}
            <AppInfo/>
          </Col>
        </Row>
      </div>
    );
  }
}
