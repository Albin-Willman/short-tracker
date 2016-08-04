
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
      hAxis: { title: hAxis },
      vAxis: { title: vAxis },
    };

    return (<Chart chartType="LineChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
                legend_toggle={true}/>);
    }
  }
