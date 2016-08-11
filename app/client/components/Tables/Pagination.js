
import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

export default class Pagination extends React.Component {
  static propTypes = {
    page: React.PropTypes.number,
    totalCount: React.PropTypes.number,
    pageLength: React.PropTypes.number,
    goToPage: React.PropTypes.func,
  }

  static defaultProps = {
    page: 1,
    totalCount: 0,
    pageLength: 10,
    goToPage: ()=>{},
  }

  pageButtons() {
    var { page, totalCount, pageLength } = this.props;

    var noOfPages = Math.ceil(totalCount/pageLength);
    var pages = [];

    pages.push(this.buildButton('<', page === 1, page - 1));

    for(var i = 1; i <= noOfPages; i += 1) {
      pages.push(this.buildButton(i, i === page, i));
    }
    pages.push(this.buildButton('>', page === noOfPages, page + 1));
    return pages;
  }

  buildButton(label, active, page) {
    var onclick = active ? ()=>{} : this.buildGoToPage(page);
    return (
      <Button
        key={label}
        onClick={onclick}
        className={ active ? 'disabled' : '' }>
          {label}
      </Button>
    );
  }

  buildGoToPage(page) {
    var { goToPage } = this.props;
    return () => {
      goToPage(page);
    };
  }
  render() {
    var buttons = this.pageButtons();
    return <ButtonGroup>{buttons}</ButtonGroup>;
  }
}
