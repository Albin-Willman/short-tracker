import React from 'react';

const optimalScriptContainer = 'ads-optimal-scripts-container';
export default class OptimalAd extends React.Component {

  static propTypes = {
    config: React.PropTypes.object,
  }

  static defaultProps = {
    config: {},
  }

  componentWillMount() {
    if(navigator.userAgent.match(/iPhone|iPod|iPad|Android/i)!==null) {
      return;
    }
    const script1 = document.createElement('script');
    script1.setAttribute('src','//cdn.adsoptimal.com/advertisement/settings/37659.js');
    const script2 = document.createElement('script');
    script2.setAttribute('src','//cdn.adsoptimal.com/advertisement/manual.js');
    var scriptContainer = document.getElementById(optimalScriptContainer);
    scriptContainer.innerHTML = '';

    scriptContainer.appendChild(script1);
    scriptContainer.appendChild(script2);
  }

  render() {
    if(navigator.userAgent.match(/iPhone|iPod|iPad|Android/i)!==null) {
      return false;
    }
    var { config } = this.props;
    return <div className="adsoptimal-slot" style={config}></div>;
  }
}
