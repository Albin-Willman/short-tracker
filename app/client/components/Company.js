
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import { Link } from 'react-router'
import { Chart } from 'react-google-charts'
import ActorList from 'components/ActorList';

export default class Company extends React.Component {

  static propTypes = {
    company: React.PropTypes.object,
  }

  static defaultProps = {
    company: {},
  }

  transformChartData(actors){
    var rows = [];
    rows.push(this.buildLabels(actors));
    var allDates = this.findAllDates(actors);

    var lastRow = new Array(Object.keys(actors).length + 1);
    lastRow.fill(0);
    for (var i in allDates) {
      var row = this.buildRow(actors, allDates[i], lastRow);
      rows.push(row);
      lastRow = row;
    }
    return rows;
  }

  buildRow(actors, date, lastRow){
    var row = [];

    for (var actor in actors){
      var value = actors[actor]['positions'][date];
      if(typeof value === 'undefined'){
        value = lastRow[row.length + 1];
      }
      row.push(value);
    }
    row.push(this.sumArray(row));
    row.unshift(date);
    return row;
  }

  buildLabels(actors){
    var labels = [];
    var labels = ['Date'];
    for (var actor in actors){
      labels.push(actors[actor]['name']);
    }
    labels.push('Total');
    return labels;
  }

  sumArray(row){
    return row.reduce(function(pv, cv) { return pv + cv; }, 0);
  }

  findAllDates(actors){
    var res = [];
    for( var i in actors){
      res =  res.concat(Object.keys(actors[i].positions));
    }
    return res.filter((value, index, self) => { return self.indexOf(value) === index; }).sort();
  }


  render() {
    var { company } = this.props;

    var chartData = this.transformChartData(company.actors);

    var actors = chartData[0];
    var lastRow = chartData[chartData.length - 1];

    var options = {
      hAxis: {title: 'Date'},
      vAxis: {title: 'Short position'}
    }

    return (
      <Row>
        <Col lg={5}>
          <Well>
            <h1>{company.name}</h1>
            <h3>Current positions</h3>
            <ActorList labels={actors} positions={lastRow} />
            <Link to="/">Back</Link>
          </Well>
        </Col>
        <Col lg={7}>
          <Well>
            <Chart chartType="LineChart"
              data={chartData}
              options={options}
              width={"100%"}
              height={"400px"}
              legend_toggle={true}/>
          </Well>
        </Col>
      </Row>
    );
  }
}
