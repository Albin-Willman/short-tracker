
import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';

const STYLES = {
  grid: {
    marginTop: 50,
  },
};

export default class MyGrid extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  }

  static defaultProps = {
    children: {},
  }

  render() {
    var { children } = this.props;

    return (
      <Grid style={STYLES.grid}>
        {children}
      </Grid>
      );
  }
}
