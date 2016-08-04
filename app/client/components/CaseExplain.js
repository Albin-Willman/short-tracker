
import React from 'react';
import Well from 'react-bootstrap/lib/Well';

export default class CaseExplain extends React.Component {

  static propTypes = {
    visible: React.PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
  }

  render() {
    var { visible } = this.props;

    if(!visible) {
      return false;
    }

    return (
      <Well>
      <h2>Explanation of scenarios</h2>
      <p>
        The cases in the table are break even prices for different scenarios.
        Note that non of the scenarios are probable and that they do not
        take interest in to account.
      </p>
      <strong>* Best case</strong>
      <p>
        This case assumes that every share shorted has been sold at the highest
        possible price and repurchaces has been made at the lowest possible price
        of the day.
      </p>
      <strong>* Mid case</strong>
      <p>
        This case assumes that every share shorted has been sold and repurchaces
        at the midpoint of the day.
      </p>
      <strong>* Worst case</strong>
      <p>This case assumes the opposite of the best case.</p>
    </Well>
    );
  }
}
