import { setIndex, addContent, setLoaded } from 'actions/blog-actions';

export function loadIndex() {
  return (dispatch) => {
    fetch('/blogposts/index.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(setIndex(data));
        dispatch(setLoaded(true));
      });
  };
}

export function loadBlogPost(id) {
  return (dispatch, getState) => {
    var articles = getState().blog.articles || {};
    var errorMessage = 'No such blog post';
    if(articles[id] && articles[id].content && articles[id].content !== errorMessage) {
      return;
    }
    fetch('/blogposts/' + id + '.html')
      .then(response => {
        return response.text();
      })
      .then(html => {
        dispatch(addContent(id, html));
      })
      .catch(() => {
        dispatch(addContent(id, errorMessage));
      });
  };
}
