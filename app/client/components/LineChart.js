
import React from 'react';
import { Chart } from 'react-google-charts';

export default class LineChart extends React.Component {

  static propTypes = {
    hAxis: React.PropTypes.string,
    vAxis: React.PropTypes.string,
    data: React.PropTypes.array,
  }

  static defaultProps = {
    hAxis: '',
    vAxis: '',
    data: [],
  }

  calculateStepSize = () => {
    if(navigator.userAgent.match(/iPhone|iPod|iPad|Android/i)===null) {
      return 1;
    }
    var { data } = this.props;
    var stepSize = 1;
    var dataPoints = data.length * data[0].length;
    if ( dataPoints > 1000 ) {
      stepSize = 7;
    } else if ( dataPoints > 5000 ) {
      stepSize = 14;
    }
    return stepSize;
  }

  render() {
    var { hAxis, vAxis, data } = this.props;

    if(!data || data.length === 0) {
      return false;
    }

    var options = {
      hAxis: { title: hAxis, format: 'yyyy-MM' },
      vAxis: { title: vAxis },
      explorer: {
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 4.0,
      },
    };

    var transformedData = [data[0]];
    var stepSize = this.calculateStepSize();

    for(var i = 1; i < data.length; i += stepSize) {
      transformedData.push(this.transformRow(data[i]));
    }
    var lastRow = this.transformRow(data[data.length - 1]);

    if(stepSize > 1 && transformedData[transformedData.length - 1][0] !== lastRow[0]) {
      transformedData.push(lastRow);
    }

    return (<Chart chartType="LineChart"
                data={transformedData}
                options={options}
                width={"100%"}
                height={"400px"}
                legend_toggle={true}/>);
  }

  transformRow(rowData) {
    var row = [];
    row.push(new Date(Date.parse(rowData[0])));
    for(var j = 1; j < rowData.length; j += 1) {
      row.push(rowData[j]);
    }
    return row;
  }
}
