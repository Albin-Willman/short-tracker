import React from 'react';
import Well from 'react-bootstrap/lib/Well';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { Link } from 'react-router';

export default class ContentWell extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    title: React.PropTypes.string,
    glyph: React.PropTypes.string,
    type: React.PropTypes.string,
    morePage: React.PropTypes.string,
    moreText: React.PropTypes.string,
  }

  static defaultProps = {
    children: null,
    glyph: '',
    title: '',
    type: '',
    morePage: '',
    moreText: 'Read more',
  }

  buildMoreButton() {
    var { morePage, moreText } = this.props;
    if(!morePage || morePage.length ===0) {
      return false;
    }
    return (<div style={{ textAlign: 'center' }}>
          <Link className="btn btn-primary" to={morePage}>{moreText}</Link>
        </div>);
  }

  buildGlyph() {
    var { glyph } = this.props;
    if(!glyph || glyph.length ===0) {
      return false;
    }
    return <div style={{ textAlign: 'center', fontSize: '40px' }}><Glyphicon glyph={glyph}/></div>;
  }

  render() {
    var { title, children, type } = this.props;
    var glyph = this.buildGlyph();
    var more = this.buildMoreButton();
    return (
      <Well className={type}>
        {glyph}
        <h2>{title}</h2>
        {children}
        {more}
      </Well>
      );
  }
}
