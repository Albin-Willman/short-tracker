import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Description from 'components/Meta/Description';
import MyGrid from 'components/Layout/MyGrid';
import RelatedArticles from 'components/Blog/RelatedArticles';
import Disclaimer from 'components/Blog/Disclaimer';
import Introduction from 'components/Blog/Introduction';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import { Link, browserHistory } from 'react-router';
import { loadBlogPost, loadIndex } from 'services/blog-services';
// import OptimalAd from 'containers/Ads/OptimalAd';

@connect(s => s.blog)
export default class Blog extends React.Component {

  static propTypes = {
    articles: React.PropTypes.object,
    params: React.PropTypes.object,
    loaded: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
  }

  static defaultProps = {
    articles: {},
    params: {},
    loaded: false,
    dispatch: ()=>{},
  }

  componentWillMount() {
    var { loaded, articles, dispatch, params } = this.props;
    var id = params.id;
    if(!loaded) {
      dispatch(loadIndex());
    }
    if(!articles || !articles[id] || !articles[id].content) {
      dispatch(loadBlogPost(params.id));
    }
  }

  render() {
    var { articles, params, dispatch } = this.props;
    var article = articles[params.id] || {};
    return (
      <MyGrid>
        <Helmet title={article.title} />
        <Description description={article.abstract} keywords={article.metaTags} />
        <Row>
          <Col md={8}>
            <Well className="blog-post">
              <h1>{article.title}</h1>
              <span className="author">{article.author}</span>
              <span className="published">{article.published}</span>
              <p><strong>
                {article.abstract}
              </strong></p>
              <div dangerouslySetInnerHTML={{ __html: article.content }}/>
              <Link to="/blog" className="btn">Back</Link>
            </Well>
          </Col>
          <Col md={4}>
            <Introduction />
            <RelatedArticles
              articles={articles}
              id={params.id}
              tags={article.tags}
              viewPost={(id) => {
                dispatch(loadBlogPost(id));
                browserHistory.push('/blog/' + id);
              }}/>
              <Disclaimer />
          </Col>
        </Row>
      </MyGrid>);
  }
}
