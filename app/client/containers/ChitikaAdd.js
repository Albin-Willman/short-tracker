
import React from 'react';
import { connect } from 'react-redux';

import Well from 'react-bootstrap/lib/Well';

const scriptContainerId = 'ad-scripts';
const unitBase = {
  'calltype':'async[2]',
  'publisher':'Littlefinger',
  'sid':'Chitika Default',
  'width': 550,
  'height': 250,
  'color_button': '#b385d0',
  'color_button_text': 'ffffff',
};

@connect(s => s.app)
export default class ChitikaAdd extends React.Component {

  static propTypes = {
    config: React.PropTypes.object,
  }

  static defaultProps = {
    config: {},
  }

  componentWillMount() {
    var { config } = this.props;
    const script = document.createElement('script');
    var scriptContainer = document.getElementById(scriptContainerId);

    script.src = '//cdn.chitika.net/getads.js';
    script.async = true;

    window.CHITIKA = { 'units' : [] };
    var unit = { ...unitBase, ...config };
    window.CHITIKA.units.push(unit);
    scriptContainer.appendChild(script);
  }

  componentWillUnmount() {
    try{
      document.getElementById(scriptContainerId).innerHTML = '';
    } catch (e) {};
  }

  render() {
    return <Well className="add-well"><div id="chitikaAdBlock-0"></div></Well>;
  }
}
