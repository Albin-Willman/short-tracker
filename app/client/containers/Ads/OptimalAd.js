import React from 'react';

import Well from 'react-bootstrap/lib/Well';

const optimalScriptContainer = 'ads-optimal-scripts-container';
export default class OptimalAd extends React.Component {

  static propTypes = {
    config: React.PropTypes.object,
    inContent: React.PropTypes.bool,
  }

  static defaultProps = {
    config: {},
    inContent: false,
  }

  componentWillMount() {
    if(navigator.userAgent.match(/iPhone|iPod|iPad|Android/i)!==null) {
      return;
    }
    var scriptContainer = document.getElementById(optimalScriptContainer);
    if(!scriptContainer) {
      return;
    }
    const script1 = document.createElement('script');
    script1.setAttribute('src', '//cdn.adsoptimal.com/advertisement/settings/37659.js');
    const script2 = document.createElement('script');
    script2.setAttribute('src', '//cdn.adsoptimal.com/advertisement/manual.js');

    scriptContainer.innerHTML = '';

    scriptContainer.appendChild(script1);
    scriptContainer.appendChild(script2);
  }

  render() {
    if(navigator.userAgent.match(/iPhone|iPod|iPad|Android/i)!==null) {
      return false;
    }
    var className = 'add-well';
    var { config, inContent } = this.props;
    if(inContent) {
      className += ' in-content';
    }

    return (<Well className={className}>
              <div className="adsoptimal-slot" style={config}></div>
            </Well>);
  }
}
