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
    moreExternal: React.PropTypes.bool,
  }

  static defaultProps = {
    children: null,
    glyph: '',
    title: '',
    type: '',
    morePage: '',
    moreText: 'Read more',
    moreExternal: false,
  }

  buildMoreButton() {
    var { morePage, moreText, moreExternal } = this.props;
    if(!morePage || morePage.length ===0) {
      return false;
    }
    var link;
    if(moreExternal) {
      link = <a className="btn" href={morePage} target="_blank">{moreText}</a>;
    } else {
      link = <Link className="btn" to={morePage}>{moreText}</Link>;
    }

    return <div className="button-box" >{link}</div>;
  }

  buildGlyph() {
    var { glyph } = this.props;
    if(!glyph || glyph.length ===0) {
      return false;
    }
    return <div style={{ textAlign: 'center', fontSize: '40px' }}><Glyphicon className="head-icon" glyph={glyph}/></div>;
  }

  render() {
    var { title, children, type } = this.props;
    var glyph = this.buildGlyph();
    var more = this.buildMoreButton();
    type = type ? type + ' ' : '';
    type += 'content-well';
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
