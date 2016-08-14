
import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class ArticleBrief extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    id: React.PropTypes.string,
    abstract: React.PropTypes.string,
    published: React.PropTypes.string,
    author: React.PropTypes.string,
    viewPost: React.PropTypes.func,
  }

  static defaultProps = {
    title: '',
    id: '',
    abstract: '',
    published: '',
    author: '',
    viewPost: ()=>{},
  }

  render() {
    var { title, id, abstract, published, author, viewPost } = this.props;

    return (
      <div className="brief" onClick={()=>{
          viewPost(id);
        }}>
        <h2>{title}</h2>
        <span className="author">{author}</span>
        <span className="published">{published}</span>
        <p>{abstract}</p>
        <Button>Read</Button>
      </div>
    );
  }
}
