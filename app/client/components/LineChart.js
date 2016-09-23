
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

  render() {
    var { hAxis, vAxis, data } = this.props;

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

    if(!data || data.length === 0) {
      return false;
    }

    var transformedData = [[]];

    for(var j = 0; j < data[0].length; j += 1) {
      transformedData[0].push(data[0][j]);
    }

    for(var i = 1; i < data.length; i += 1) {
      var row = [];
      row.push(new Date(Date.parse(data[i][0])));
      for(j = 1; j < data[i].length; j += 1) {
        row.push(data[i][j])
      }
      transformedData.push(row);
    }

    return (<Chart chartType="LineChart"
                data={transformedData}
                options={options}
                width={"100%"}
                height={"400px"}
                legend_toggle={true}/>);
    }
  }
