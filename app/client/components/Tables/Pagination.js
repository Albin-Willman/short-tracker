
import React from 'react';

import Table from 'react-bootstrap/lib/Table';
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

  pageButtons(){
    var { page, totalCount, pageLength, goToPage } = this.props;

    var noOfPages = Math.ceil(totalCount/pageLength);
    var pages = [];

    pages.push(this.buildButton('<', page === 1, page - 1));

    for(var i = 1; i <= noOfPages; i++){
      var active = i==page;
      pages.push(this.buildButton(i, active, i));
    }
    pages.push(this.buildButton('>', page === noOfPages, page + 1));
    return pages;
  }

  buildButton(label, active, page) {
    var onclick = active ? (_=>{}) : this.buildGoToPage(page);
    return <Button key={label} onClick={onclick} className={ active ? 'disabled' : '' }>{label}</Button>;
  }

  buildGoToPage(page){
    var { goToPage } = this.props;
    return _=> {
      goToPage(page)
    };
  }
  render(){
    var buttons = this.pageButtons();
    return <ButtonGroup>{buttons}</ButtonGroup>
  }
}