
import React from 'react';

import Alert from 'react-bootstrap/lib/Alert';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { browserHistory } from 'react-router';

export default class CookieNotice extends React.Component {

  static propTypes = {
    accepted: React.PropTypes.bool,
    accept: React.PropTypes.func,
  }

  static defaultProps = {
    accepted: false,
    accept: () => {},
  }

  goToCookies(e) {
    e.preventDefault();
    browserHistory.push('/cookies');
  }

  render() {
    var { accept, accepted } = this.props;

    if(accepted) {
      return false;
    }

    return (
      <Alert bsStyle="info" style={{ marginBottom: '0px', borderRadius: '0px' }}>
        <Grid><Row><Col md={12}>
        By continuing to browse the site you agree to our use of
        cookies.. <a href="/cookies" onClick={this.goToCookies}>Read more</a>
        <button
          type="button"
          onClick={accept}
          className="btn btn-info btn-xs"
          aria-label="Accept"
          style={{ float: 'right' }}>
          Accept
        </button>
        </Col></Row></Grid>
      </Alert>
    );
  }
}
