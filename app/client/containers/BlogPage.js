import React from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";

import ArticleBrief from 'components/Blog/ArticleBrief';
import MyGrid from 'components/Layout/MyGrid';
import ChitikaAdd from 'containers/ChitikaAdd';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import { browserHistory } from 'react-router';

import { loadIndex } from 'services/blog-services';

@connect(s => s.blog)
export default class Blog extends React.Component {

  static propTypes = {
    articles: React.PropTypes.object,
    loaded: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
  }

  static defaultProps = {
    articles: {},
    loaded: false,
    dispatch: ()=>{},
  }

  componentWillMount() {
    var { loaded, dispatch } = this.props;
    if(!loaded) {
      dispatch(loadIndex());
    }
  }

  buildPost(article) {
    return <ArticleBrief key={article.id} {...article}/>;
  }

  viewPost(post) {
    browserHistory.push('/blog/'+post);
  }

  render() {
    var { articles } = this.props;
    var articleList = [];
    for(var key in articles) {
      if (articles.hasOwnProperty(key)) {
        var article = articles[key];
        articleList.push(this.buildPost({ id: key, ...article, viewPost: this.viewPost }));
      }
    }
    return (
      <MyGrid>
        <Helmet title="Blog" />
        <Row>
          <Col md={9}>
            <Well>
              <h1>Kortapositioner.se: The blog</h1>
              <p>
                <strong>
                  A blog containing post more or less related to the main content of
                  kortapositioner.se. I will be writing about myself, my investments as well
                  as the descisions I make regarding this site.
                </strong>
              </p>
              {articleList}
            </Well>
          </Col>
          <Col md={3}>
            <ChitikaAdd config={{ width: 160, height: 600, color_button: '#78c578' }}/>
          </Col>
        </Row>
      </MyGrid>);
  }
}
