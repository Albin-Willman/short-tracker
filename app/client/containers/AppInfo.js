
import React from 'react';
import { connect } from 'react-redux';

import Well from 'react-bootstrap/lib/Well';

// import GoogleAd from 'react-google-ad';

const twitterLink = 'https://twitter.com/SvenssonAlbin';
const botTwitterLink = 'https://twitter.com/kortapositioner';

@connect(s => s.app)
export default class AppInfo extends React.Component {

  static propTypes = {
    updated: React.PropTypes.string,
  }

  buildAdd() {
    if(window.location.hostname.indexOf('kortapositioner.se') === -1 && false) {
      return (<p>
        The website has moved to <a href="http://kortapositioner.se">kortapositioner.se</a>
      </p>);
    }
    return null;
    /*eslint-disable */
    // return (<p>
    //     If yo like this idea, please <span>contribute</span> to this project by clicking the add below.
    //     <GoogleAd client="xxx" slot="xxx" format="xxx" />
    //   </p>);
    /*eslint-enable */
  }

  render() {
    var { updated } = this.props;

    var add = this.buildAdd();

    /*eslint-disable */
    return (
      <Well>
        <p>
          All positions below 0.5% are considered to be 0%.<br/>
          Data updated {updated}<br/>
          Data from <a target="_blank" href="http://fi.se/Register/Blankning/" >Finans inspektionen</a><br/>
          Feature requests accepted via <a target="_blank" href={twitterLink} >@SvenssonAlbin</a><br/>
          Daily status updates posted via <a target="_blank" href={botTwitterLink} >@Kortapositioner</a><br/>
          Source code available at <a target="_blank" href="https://github.com/Albin-Willman/short-tracker/" >Github</a><br/>
        </p>
        {add}
      </Well>
    );
    /*eslint-enable */
  }
}
