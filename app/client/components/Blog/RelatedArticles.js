import React from 'react';

import Well from 'react-bootstrap/lib/Well';

export default class RelatedArticles extends React.Component {

  static propTypes = {
    tags: React.PropTypes.array,
    articles: React.PropTypes.object,
    id: React.PropTypes.string,
    viewPost: React.PropTypes.func,
  }

  static defaultProps = {
    id: '',
    tags: [],
    articles: {},
    viewPost: ()=>{},
  }

  findRelated() {
    var { id, tags, articles } =this.props;
    var related = [];
    var filterFunc = n => {
      return tags.indexOf(n) !== -1;
    };
    for(var key in articles) {
      if(articles.hasOwnProperty(key)) {
        if(key === id) {
          continue;
        }
        var article = articles[key];
        var score = article.tags.filter(filterFunc).length;
        if(score > 0) {
          related.push({ ...article, score, key });
        }
      }
    }
    return related.sort((a, b) => {
      return b.score - a.score;
    });
  }

  buildLink() {
    var { viewPost } = this.props;
    return (article) => {
      return (<a
        className="related-link"
        href={'/blog/' + article.key}
        key={article.key}
        onClick={(e) => {
          e.preventDefault();
          viewPost(article.key);
        }}>{article.title}</a>
      );
    };
  }

  render() {
    var related = this.findRelated();
    var links = related.map(this.buildLink());
    if(links.length === 0) {
      return false;
    }
    return (<Well className="accent">
        <h3>Related posts</h3>
        {links}
      </Well>
      );
  }
}
