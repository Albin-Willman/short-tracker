import React from 'react';

const keywordsId = 'meta-keywords';
const descriptionId = 'meta-desc';

export default class Disclaimer extends React.Component {

  static propTypes = {
    description: React.PropTypes.string,
    keywords: React.PropTypes.string,
  }

  componentWillMount() {
    this.setDescription(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setDescription(nextProps);
  }

  setDescription = (props) => {
    var descTag = document.getElementById(descriptionId);
    descTag.setAttribute("content", props.description);
    var keywordsTag = document.getElementById(keywordsId);
    keywordsTag.setAttribute("content", props.keywords);
  }

  render() {
    return false;
  }
}
