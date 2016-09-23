
import React from 'react';

import Alert from 'react-bootstrap/lib/Alert';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class VacationNotice extends React.Component {

  static propTypes = {
    message: React.PropTypes.string,
  }

  static defaultProps = {
    message: '',
  }

  render() {
    var { message } = this.props;

    if(!message || message.length === 0) {
      return false;
    }

    return (
      <Alert bsStyle="warning" style={{ marginBottom: '0px', borderRadius: '0px' }}>
        <Grid><Row><Col md={12}>
        {message}
        </Col></Row></Grid>
      </Alert>
    );
  }
}
