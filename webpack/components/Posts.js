import React, { Component } from 'react';
import Card from './Card';
import MasonryLayout from './MasonryLayout';

const POST_BATCH_LIMIT = 2;

class Posts extends Component {
  state = {
    elements: [],
    hasMore: true,
    overlap: false,
    loading: false,
    imageLoaded: false,
    count: 0,
    initialCount: 0
  };

  componentWillMount() {
    this.setState({
      count: this.props.count,
      initialCount: this.props.count
    });
  }

  imageLoaded = () => {
    this.setState({ imageLoaded: !this.state.imageLoaded });
  };

  getCards = () => {
    if (this.state.loading || this.state.initialCount === 0) {
      return;
    }

    this.setState({ loading: true });

    if (this.state.count <= 0) {
      this.setState({ hasMore: false, loading: false });
      return;
    }

    this.props.firebase.ref('posts')
      .orderByKey()
      .limitToLast(POST_BATCH_LIMIT)
      .endAt(this.state.count.toString()).on('value', snapshot => {
        if (this.state.count <= 0) {
          return;
        }

        let posts = [];
        if (snapshot.numChildren() > 0) {
          snapshot.forEach(post => {
            posts.unshift({
              key: post.key,
              author: post.val().author,
              message: post.val().message,
              upvote: post.val().upvote,
              image: post.val().image
            });
          });

          this.setState({
            elements: this.state.elements.concat(posts),
            count: this.state.count - POST_BATCH_LIMIT,
            loading: false
          });
        } else {
          this.setState({ hasMore: false, loading: false });
        }
    });
  };

  render() {
    return (
      <MasonryLayout
        id="masonry"
        className="masonry"
        infiniteScroll={this.getCards}
        infiniteScrollLoading={this.state.loading}
        infiniteScrollEnd={!this.state.hasMore}
        infiniteScrollEndIndicator={null}
        infiniteScrollSpinner={null}
      >
        {this.state.elements.map(post => {
          return (
            <div className="card" key={post.key} >
              <Card
                post={post}
                firebase={this.props.firebase}
                onImageLoaded={this.imageLoaded}
              />
            </div>
          );
        })}
      </MasonryLayout>
    );
  }
}

export default Posts;
