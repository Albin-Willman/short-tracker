import React from 'react';
import Well from 'react-bootstrap/lib/Well';

export default class Disclaimer extends React.Component {

  static propTypes = {
    visible: React.PropTypes.bool,
  }

  static defaultProps = {
    visible: true,
  }

  render() {
    var { visible } = this.props;

    if(!visible) {
      return false;
    }

    return (
      <Well className="highlight">
        <h4>Please note</h4>
        <p>
          This post is a compilation of my personal views and opinions. Do not make any
          investment decisions based on the content.
        </p>
      </Well>
    );
  }
}
