
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
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

  buildHistoryChart() {
    var { history } = this.props;
    if(!history.data || history.data === 'No history') {
      return 'No historic data available yet';
    }
    var historyData = history.data.history;
    var data = [['Date', 'Day low', 'Day high']];
    for (var date in historyData) {
      if (historyData.hasOwnProperty(date)) {
        var dayData = historyData[date];
        data.push([date, dayData.low, dayData.high]);
      }
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


  render() {
    var { company } = this.props;

    var positionChartData = this.transformPositionChartData(company.actors);

    var actors = positionChartData[0];
    var lastRow = positionChartData[positionChartData.length - 1];

    var options = {
      hAxis: { title: 'Date' },
      vAxis: { title: 'Short position' },
    };

    var historyChart = this.buildHistoryChart();

    return (
      <Row>
        <Col lg={5}>
          <Well>
            <h1>{company.name}</h1>
            <h3>Current positions</h3>
            <ActorList labels={actors} positions={lastRow} />
            <Link to="/">Back</Link>
          </Well>
          <AppInfo/>
        </Col>
        <Col lg={7}>
          <Well>
            <Chart chartType="LineChart"
              data={positionChartData}
              options={options}
              width={"100%"}
              height={"400px"}
              legend_toggle={true}/>
            {historyChart}
          </Well>
        </Col>
      </Row>
    );
  }
}
