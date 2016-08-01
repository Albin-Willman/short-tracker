
import React from 'react';
import { connect } from 'react-redux';

import Well from 'react-bootstrap/lib/Well';

@connect(s => s.app)
export default class AppInfo extends React.Component {

    render() {
        var { updated } = this.props;

        return (
            <Well>
                <p>
                  All positions below 0.5% are considered to be 0%.<br/>
                  Data updated {updated}<br/>
                  Data from <a target="_blank" href="http://fi.se/Register/Blankning/" >Finans inspektionen</a><br/>
                  Feature requests accepted via <a target="_blank" href="https://twitter.com/SvenssonAlbin" >@SvenssonAlbin</a><br/>
                  Source code available at <a target="_blank" href="https://github.com/Albin-Willman/short-tracker/" >Github</a><br/>
                  If yo like this idea, please <span>contribute</span> to this project by clicking the add below.
                </p>
            </Well>
        );
    }
}
